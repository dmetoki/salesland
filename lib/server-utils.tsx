import { UIMessage } from "ai";
import { MongoClient, ObjectId } from 'mongodb';
import OpenAI from "openai";

let client: MongoClient | null = null;

export async function getClient() {
  const uri = `${process.env.MONGODB_URI || ''}`;
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export function getVectorSearch(embedding: number[], minScore = 0) {
  return [
    {
      $vectorSearch: {
        index: "vector_index",
        path: "summary_embedding",
        queryVector: embedding,
        numCandidates: 500,
        limit: 20
      }
    },
    {
      $project: {
        published: 1,
        model: 1,
        brand: 1,
        year: 1,
        resolution: 1,
        panel_type: 1,
        processor: 1,
        refresh_rate_hz: 1,
        HDR: 1,
        dolby_vision: 1,
        upscaling_ai_4k: 1,
        local_dimming: 1,
        motion_technology: 1,
        cinema_mode: 1,
        ai_sound_pro: 1,
        dolby_atmos: 1,
        q_symphony_version: 1,
        audio_power_rms: 1,
        speaker_configuration: 1,
        operating_system: 1,
        voice_assistants: 1,
        apple_airplay: 1,
        matter_compatibility: 1,
        home_hub_platform: 1,
        mobile_app_control: 1,
        voice_control: 1,
        multi_view: 1,
        gaming_allm: 1,
        gaming_vrr: 1,
        game_motion_plus: 1,
        freesync_gsync: 1,
        game_optimizer: 1,
        generative_wallpaper: 1,
        camera_karaoke_support: 1,
        max_power_w: 1,
        eco_sensor: 1,
        voltage_frequency: 1,
        voice_guide_cc: 1,
        see_colors_contrast: 1,
        motoric_accessibility_mode: 1,
        weight_kg: 1,
        vesa_mm: 1,
        price_pen: 1,
        source: 1,
        frequent_complaints: 1,
        comparisons: 1,
        combined_text: 1,
        score: { $meta: "vectorSearchScore" }
      }
    },
    {
      $match: { score: { $gte: minScore } } // <-- only keep scores >= 0.85
    },
    { $sort: { score: -1 } }
  ];
}

export default async function convertToSearchPhrase(openai: OpenAI, question: string) {
  try {
    const chat = await openai.chat.completions.create({ 
      model: 'gpt-4', 
      messages: [
        {
          role: 'system',
          content: `Convert the following user query into a concise search phrase suitable for semantic search.
                   Exclude any date references or temporal terms. Do not change proper names, key nouns, or important terms.
                   Output a short, literal phrase suitable for vector search.`
        },
        { role: 'user', content: question }
      ],
      temperature: 0,
      max_tokens: 50
    });

    return chat?.choices?.[0]?.message?.content?.trim() || '';
  } catch (err) {
    console.error('Error converting to search phrase with GPT-4.', err);
    return '';
  }
}

function isToolMessage(msg: UIMessage) {
  return msg.parts.some(
    p => p.type === "tool-call" || p.type === "tool-result"
  );
}

interface ConversationMessage {
  role: string;
  text: string;
  createdAt: Date;
}

interface Conversation {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  messages: ConversationMessage[];
}

export async function getConversationWithoutTools(messages: UIMessage[]) {
  const conversationId = '650c8d4f2f1b2c001234abcd';
  const client = await getClient();
  const db = client.db('hausboard');
  const collection = db.collection<Conversation>("conversations");
  
  // --- Step 1: Filter out tool messages and map to simple objects ---
  const incomingMessages: ConversationMessage[] = messages
    .filter(msg => !isToolMessage(msg))
    .map(msg => ({
      role: msg.role,
      text: msg.parts
        .filter(p => p.type === "text")
        .map(p => p.text)
        .join(" ")
        .trim(),
      createdAt: new Date()
    }))
    .filter(msg => msg.text.length > 0);

    if (incomingMessages.length === 0) return;

    // --- Step 2: Ensure conversation document exists ---
    const conversation = await collection.findOne(
      { _id: new ObjectId(conversationId) }
    );
  
    if (!conversation) {
      // Create new conversation
      await collection.insertOne({
        _id: new ObjectId(conversationId),
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: incomingMessages
      });
      return;
    }
    
    // --- Step 3: Filter out messages that already exist ---
    const existingSet = new Set(conversation.messages.map(m => m.role + "|" + m.text));
    const newMessages = incomingMessages.filter(
      msg => !existingSet.has(msg.role + "|" + msg.text)
    );
    if (newMessages.length === 0) return; // nothing new to append
    
    // --- Step 4: Append new messages ---
    await collection.updateOne(
    { _id: new ObjectId(conversationId) },
    {
      $push: { messages: { $each: newMessages } },
      $set: { updatedAt: new Date() }
    }
  );
}