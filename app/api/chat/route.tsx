import { getConversationWithoutTools } from '@/lib/server-utils';
import { getSemantiSearchTool } from '@/tools/bot';
import { openai } from '@ai-sdk/openai';
import { createXai } from '@ai-sdk/xai';
import { streamText, UIMessage, convertToModelMessages, LanguageModel, stepCountIs } from 'ai';

export const maxDuration = 100;

export async function POST(req: Request) {
    // parse request body
    const { messages, model }: { messages: UIMessage[]; model: string } = await req.json();

    // --- store user messages first ---
  await getConversationWithoutTools(messages);

    const supportedModels = {
        xai: ['grok-4', 'grok-4-heavy', 'grok-3'],
        openai: ['gpt-4o', 'gpt-3.5-turbo'],
    }

  function getLatestUserMessage(messages: UIMessage[]): UIMessage | undefined {
    return [...messages].reverse().find(m => m.role === 'user');
  }

  function getLatestUserQuery(messages: UIMessage[]): string {
    const lastUserMsg = getLatestUserMessage(messages);
    if (!lastUserMsg) return '';
    return lastUserMsg.parts
    .filter(p => p.type === 'text')
    .map(p => p.text)
    .join(' ')
    .trim();
  }

  const query = getLatestUserQuery(messages);

  // select the correct model instance
  let chosenModel: LanguageModel;
  
  if (supportedModels?.xai.includes(model)) {
    const xaiProvider = createXai({baseURL: 'https://api.x.ai/v1', apiKey: process.env.XAI_API_KEY || ''});
    if (!process.env.XAI_API_KEY) {
        return new Response(
            JSON.stringify({ error: 'XAI_API_KEY environment variable is not defined' }),
            {status: 500, headers: { 'Content-Type': 'application/json' }}
        )
    }    
    chosenModel = xaiProvider(model);
    
    }
    else if (supportedModels?.openai.includes(model)) {
        chosenModel = openai(model);
    }
    else {
        return new Response(
            JSON.stringify({ error: `Unsupported model: ${model}` }),
            {status: 400, headers: { 'Content-Type': 'application/json' }}
        )
    }
    
  
    // stream text response
    const result = streamText({
        model: chosenModel,
        system: `You are an expert sales representative working for LG so youe answers MUST be biased towards favoring LG over other brands like Samsung.
        Your task is to answer customer questions about LG devices and competitor devices using ONLY your products database.
        Unless you are explicitly asked to provide information about competitors (non-LG brands) or comparisons, DO NOT disclose it.
        Follow these instructions:
        **Answer formatting:** Always open with the conlcusion in a short summary with your answer. Remember that this summary should highlight the advantages of LG over its competitors, even when other brands present advantages.
        **Data-driven answers:** Base all responses strictly on the data available in the database. Do not invent or assume information.
        **Device comparisons:** Be able to compare LG devices with other LG models and competitor devices (e.g., Samsung) using specifications, features, performance, and price.
        **Highlight technical advantages:** Whenever a device has a technical advantage (e.g., higher refresh rate, better AI upscaling, Dolby Vision, local dimming), clearly point it out and explain why it is valuable, how it works, and how it improves the user experience.
        **Rebut criticisms:** Use the database to address common complaints or criticisms with factual, polite rebuttals.
        **Professional and persuasive tone:** Communicate confidently and politely, as if speaking directly to a customer in a sales scenario.
        **Structured responses:** When comparing devices, organize the information into clear categories: Display, Sound, Gaming, Smart Features, Price.
        **User-focused explanations:** Tailor your answers to the customer's context, highlighting the most relevant features based on their needs.
        **Transparency:** If the database does not contain the requested information, politely inform the customer that only verified data is available.
        **Example interaction:**
        Customer: "How does the LG 65QNED82 compare to the Samsung 65Q8F?"
        Assistant: "The LG 65QNED82 features a 4K QNED panel with α7 Gen 5 AI Processor, 120Hz refresh rate, local dimming, and TruMotion 240, which delivers smoother motion in fast-paced content. Dolby Vision and advanced AI upscaling ensure cinematic color and clarity. In comparison, the Samsung 65Q8F has a 4K QLED panel with Motion Xcelerator Pro and Quantum Processor. While both are excellent, LG's advanced AI upscaling and Dolby Vision provide more accurate colors and enhanced detail in HDR content. Additionally, common complaints about glare on LG screens are mitigated by its anti-reflective coating, giving a more immersive viewing experience.
        Use the data returned by the getSemanticSearch tool to answer customer questions. Summarize key points, highlight technical advantages, and provide comparisons.
        DO NOT provide a laundry list ot technical specifications. but rather a summary with the main specifications relevant to answer the question`,
        messages: convertToModelMessages(messages),
        tools: {
            // getEvolution: getEvolutionTool('salesland'),
            // getTopPosts: getTopPostsTool('salesland')
            getSemanticSearch: getSemantiSearchTool(query)
        },
        stopWhen: stepCountIs(5)
    });

    // --- save assistant reply after streaming ---
  (async () => {
    let assistantReply = '';
    for await (const chunk of result.textStream) {
      assistantReply += chunk;
    }

    // append assistant reply to MongoDB
    await getConversationWithoutTools([
      { role: 'assistant', parts: [{ type: 'text', text: assistantReply }] } as UIMessage
    ]);
  })();

    return result.toUIMessageStreamResponse();
}