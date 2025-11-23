"use client";

import { useState, useRef } from 'react';
// import { CheckIcon, GlobeIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useChat } from '@ai-sdk/react';
import { PromptInput, PromptInputAttachment, PromptInputAttachments, PromptInputBody, PromptInputButton, PromptInputFooter, PromptInputMessage, PromptInputProvider, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageAvatar } from "@/components/ai-elements/message";
import { Loader } from "@/components/ai-elements/loader";
// import { ModelSelector, ModelSelectorContent, ModelSelectorEmpty, ModelSelectorGroup, ModelSelectorInput, ModelSelectorItem, ModelSelectorList, ModelSelectorLogo, ModelSelectorLogoGroup, ModelSelectorName, ModelSelectorTrigger } from '@/components/ai-elements/model-selector';
import TextConversation from '@/components/chat/text-conversation';
import HistoricalEvolution from '@/components/chat/historical-evolution';
import PostsList from '@/components/chat/posts-list';
import { MicIcon, Square } from 'lucide-react';
import { useUser } from "@clerk/nextjs";

type HistoricalEvolutionProps = {
  title: string,
  description: string,
  data: {
      date: string;
      volume: {
        positive: number;
        neutral: number;
        negative: number;
      };
      reach: {
        positive: number;
        neutral: number;
        negative: number;
      };
    }[];
  totals?: {
    volume: number;
    reach: number;
    engagement: number;
  }
};

type PostsListProps = {
  _id: string;
  url: string;
  published: string; // e.g. "20250723"
  title: string;
  content: string;
  reach: number;
  sentiment: number;
  source_type: string;
  dimension: string;
  stakeholder: string;
  speaker: string | null;
  is_owned: boolean;
  author: {
    id: string;
    name: string;
    short_name: string;
    image_url?: string;
  };
  engagement: {
    total: number;
    num_comments: number;
    page_views: number;
    unique_visitors: number;
  }
};

const models = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    chef: "OpenAI",
    chefSlug: "openai",
    providers: ["openai", "azure"],
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    chef: "OpenAI",
    chefSlug: "openai",
    providers: ["openai", "azure"],
  },
  {
    id: "claude-opus-4-20250514",
    name: "Claude 4 Opus",
    chef: "Anthropic",
    chefSlug: "anthropic",
    providers: ["anthropic", "azure", "google", "amazon-bedrock"],
  },
  {
    id: "claude-sonnet-4-20250514",
    name: "Claude 4 Sonnet",
    chef: "Anthropic",
    chefSlug: "anthropic",
    providers: ["anthropic", "azure", "google", "amazon-bedrock"],
  },
  {
    id: "gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash",
    chef: "Google",
    chefSlug: "google",
    providers: ["google"],
  },
];

export default function Hausbot() {
    const { user } = useUser();
    
    const stopRecordingAndGetBlob = (): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            if (!mediaRecorderRef.current) return reject("No active recorder");
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                audioChunksRef.current = []; // reset for next recording
                resolve(blob);
            };
            mediaRecorderRef.current.stop();
            setRecording(false);
        });
    };
    
    const [recording, setRecording] = useState(false);
    const [, setUploading] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // start recording
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (e) => {
                audioChunksRef.current.push(e.data);
            };
            mediaRecorderRef.current.onstop = async () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                // send to API
                setUploading(true);
                try {
                    const formData = new FormData();
                    formData.append('audio', blob, 'recording.webm');
                    const res = await fetch(`http://localhost:3000/api/transcription`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (!res.ok) throw new Error('Upload failed');
                } catch (err) {
                    console.error('Upload error:', err);
                } finally {
                    setUploading(false);
                }
            };
            mediaRecorderRef.current.start();
            setRecording(true);
        } catch (err) {
            console.error('Microphone access denied or error:', err);
        }
    };
    const { messages, status, sendMessage } = useChat();
    const [model, setModel] = useState<string>(models[0].id);
    // const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const selectedModelData = models.find((m) => m.id === model);
    const handleSubmit = (message: PromptInputMessage) => {
        const hasText = Boolean(message.text);
        const hasAttachments = Boolean(message.files?.length);
        const orgId = '';
        if (!(hasText || hasAttachments)) {
            return;
        }
        if (message.text) {
            sendMessage({text: message.text, files: message.files}, {body: {model, collection: orgId}});
        }
    };
    return (
        <Fragment>
            <div className="relative min-h-screen">
                <div className="absolute left-0 right-0 top-20 bottom-28 flex justify-center pointer-events-none pb-8">
                    <div className="w-[90%] md:w-1/2 mx-auto h-full flex flex-col pointer-events-auto">
                        <Conversation className="flex-1 flex flex-col">
                            <ConversationContent className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                                {
                                    messages.map((message) => {
                                        const hasBlockingTool = message.parts.some(
                                            (p) => p.type.startsWith('tool-') && p.type !== 'tool-getSemanticSearch'
                                        );
                                        return (
                                            <Message from={message.role} key={message.id} className="flex items-start">
                                                <MessageAvatar
                                                    src={message.role === "user" && user ? user.imageUrl : "https://github.com/haydenbleasel.png"}
                                                    name={message.role === "user" && user ? user.firstName || "User" : "Hausbot"}
                                                    className="mt-2 border border-border rounded-full"
                                                />
                                                {
                                                    message.parts.length > 0 ? (
                                                        message.parts.map((part, i) => {
                                                            switch (part.type) {
                                                                case 'text':
                                                                    return !hasBlockingTool && (
                                                                        <TextConversation key={i} id={i} data={{role: message.role, text: part.text}} />
                                                                    )
                                                                case 'tool-getEvolution':
                                                                    const output = part.output as HistoricalEvolutionProps;
                                                                    if (part.state !== 'output-available') return <Loader key={i} />;
                                                                    return <HistoricalEvolution key={i} id={i} data={output} />;
                                                                case 'tool-getTopPosts':
                                                                    const top_posts_output = [(part.output as PostsListProps)];
                                                                    if (part.state !== 'output-available') return <Loader key={i} />;
                                                                    return <PostsList key={i} id={i} data={top_posts_output} />;
                                                                default: return null;
                                                            }
                                                        })
                                                    )
                                                    : message.role === 'assistant' && (
                                                        <div className="flex items-center justify-center w-16 h-6">
                                                            <Loader />
                                                        </div>
                                                    )
                                                }
                                            </Message>
                                        )
                                    })
                                }
                            </ConversationContent>
                            <ConversationScrollButton className='cursor-pointer' />
                        </Conversation>
                    </div>
                </div>
                <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-50 py-4">
                    <div className="w-[90%] md:w-1/2 mx-auto">
                        <PromptInputProvider>
                            <PromptInput globalDrop multiple onSubmit={handleSubmit}>
                                <PromptInputAttachments>
                                    {(attachment) => <PromptInputAttachment data={attachment} />}
                                </PromptInputAttachments>
                                <PromptInputBody>
                                    <PromptInputTextarea ref={textareaRef} />
                                </PromptInputBody>
                                <PromptInputFooter>
                                    <PromptInputTools>
                                        {/* <PromptInputActionMenu>
                                            <PromptInputActionMenuTrigger />
                                            <PromptInputActionMenuContent>
                                                <PromptInputActionAddAttachments />
                                            </PromptInputActionMenuContent>
                                        </PromptInputActionMenu> */}
                                        <PromptInputButton
                                            variant="outline"
                                            onClick={async () => {
                                                if (!recording) {
                                                    await startRecording();
                                                } else {
                                                    const audioBlob = await stopRecordingAndGetBlob();
                                                    // send audio to Whisper transcription API
                                                    const formData = new FormData();
                                                    formData.append('audio', audioBlob, 'recording.webm');
                                                    const res = await fetch('/api/transcription', { method: 'POST', body: formData });
                                                    const data = await res.json();
                                                    const text = data.text || '';
                                                    // directly send the transcribed text as a message
                                                    if (text) {
                                                        sendMessage({ text }, { body: { model, collection: "" } });
                                                    }
                                                }
                                            }}
                                            className='cursor-pointer'
                                        >
                                            {
                                                recording ? (
                                                    <Square className="size-4" />
                                                    ) : (
                                                    <MicIcon className="size-4" />
                                                )
                                            }
                                        </PromptInputButton>
                                        {/* <PromptInputButton>
                                            <GlobeIcon size={16} /> <span>Search</span>
                                        </PromptInputButton> */}
                                        {/* <ModelSelector
                                            onOpenChange={setModelSelectorOpen}
                                            open={modelSelectorOpen}
                                        >
                                            <ModelSelectorTrigger asChild>
                                                <PromptInputButton>
                                                    {
                                                        selectedModelData?.chefSlug && (
                                                            <ModelSelectorLogo provider={selectedModelData.chefSlug} />
                                                        )
                                                    }
                                                    {
                                                        selectedModelData?.name && (
                                                            <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
                                                        )
                                                    }
                                                </PromptInputButton>
                                            </ModelSelectorTrigger>
                                            <ModelSelectorContent>
                                                <ModelSelectorInput placeholder="Search models..." />
                                                <ModelSelectorList>
                                                    <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                                                    {["OpenAI", "Anthropic", "Google"].map((chef) => (
                                                        <ModelSelectorGroup heading={chef} key={chef}>
                                                            {
                                                                models
                                                                .filter((m) => m.chef === chef)
                                                                .map((m) => (
                                                                    <ModelSelectorItem
                                                                        key={m.id}
                                                                        onSelect={() => {
                                                                            setModel(m.id);
                                                                            setModelSelectorOpen(false);
                                                                        }}
                                                                        value={m.id}
                                                                    >
                                                                        <ModelSelectorLogo provider={m.chefSlug} />
                                                                        <ModelSelectorName>{m.name}</ModelSelectorName>
                                                                        <ModelSelectorLogoGroup>
                                                                            {
                                                                                m.providers.map((provider) => (
                                                                                    <ModelSelectorLogo
                                                                                        key={provider}
                                                                                        provider={provider}
                                                                                    />
                                                                                ))
                                                                            }
                                                                        </ModelSelectorLogoGroup>
                                                                        {
                                                                            model === m.id ? (
                                                                                <CheckIcon className="ml-auto size-4" />
                                                                            )
                                                                            : (<div className="ml-auto size-4" />)
                                                                        }
                                                                    </ModelSelectorItem>
                                                                ))
                                                            }
                                                        </ModelSelectorGroup>
                                                    ))}
                                                </ModelSelectorList>
                                            </ModelSelectorContent>
                                        </ModelSelector> */}
                                    </PromptInputTools>
                                    <PromptInputSubmit
                                        status={status}
                                        variant="outline"
                                        className='cursor-pointer'
                                    />
                                </PromptInputFooter>
                            </PromptInput>
                        </PromptInputProvider>
                    </div>
                </footer>
            </div>
        </Fragment>
    )
}