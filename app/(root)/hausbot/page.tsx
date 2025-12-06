"use client";

import { useState, useRef } from 'react';
// import { CheckIcon, GlobeIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useChat } from '@ai-sdk/react';
import { PromptInputMessage, PromptInputProvider } from "@/components/ai-elements/prompt-input";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageAvatar } from "@/components/ai-elements/message";
import { Loader } from "@/components/ai-elements/loader";
// import { ModelSelector, ModelSelectorContent, ModelSelectorEmpty, ModelSelectorGroup, ModelSelectorInput, ModelSelectorItem, ModelSelectorList, ModelSelectorLogo, ModelSelectorLogoGroup, ModelSelectorName, ModelSelectorTrigger } from '@/components/ai-elements/model-selector';
import TextConversation from '@/components/chat/text-conversation';
import HistoricalEvolution from '@/components/chat/historical-evolution';
import PostsList from '@/components/chat/posts-list';
// import { MicIcon, Square } from 'lucide-react';
import { useUser } from "@clerk/nextjs";
import { generateObjectId } from '@/lib/utils';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { HausbotPromptInput } from '@/components/chat/multimodal-prompt-input';
import { DefaultChatTransport, FileUIPart } from 'ai';

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
    const [conversationId, setConversationId] = useState<string>(() => generateObjectId());
    const { messages, status, sendMessage } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat"
        }),
        id: conversationId
    });
    const [model, setModel] = useState<string>(models[0].id);
    // const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const selectedModelData = models.find((m) => m.id === model);
    const { recording, startRecording, stopRecordingAndGetBlob, setUploading } = useAudioRecorder();

    const handleMicClick = async () => {
        if (!recording) {
            await startRecording();
        } else {
            const audioBlob = await stopRecordingAndGetBlob();

            // send to transcription API
            setUploading(true);
            try {
                const formData = new FormData();
                formData.append("audio", audioBlob, "recording.webm");
                const res = await fetch("/api/transcription", { method: "POST", body: formData });
                const data = await res.json();
                const text = data.text || "";
                if (text) {
                    sendMessage({ text }, { body: { model, collection: "", conversationId } });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setUploading(false);
            }
        }
    };
    const handleSubmit = (message: PromptInputMessage) => {
        const orgId = '';
        if (!message.text && (!message.files || message.files.length === 0)) { return; }

        sendMessage(
            {
                text: message.text || '',
                files: message.files
            },
            { body: { model, collection: orgId, conversationId } }
        );
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

                                        const renderParts = () => {
                                            const parts: any[] = [];
                                            let currentFiles: FileUIPart[] = [];
                                            let currentText = "";

                                            message.parts.forEach((part, i) => {
                                                if (part.type === 'file') {
                                                    currentFiles.push(part);
                                                } else if (part.type === 'text') {
                                                    if (!hasBlockingTool) {
                                                        currentText += part.text;
                                                    }
                                                } else {
                                                    // Flush text/files if any
                                                    if (currentFiles.length > 0 || currentText) {
                                                        parts.push(
                                                            <TextConversation
                                                                key={`text-${i}`}
                                                                id={i}
                                                                data={{ role: message.role, text: currentText, files: currentFiles }}
                                                            />
                                                        );
                                                        currentFiles = [];
                                                        currentText = "";
                                                    }

                                                    if (part.type === 'tool-getEvolution') {
                                                        const output = part.output as HistoricalEvolutionProps;
                                                        if (part.state !== 'output-available') parts.push(<Loader key={i} />);
                                                        else parts.push(<HistoricalEvolution key={i} id={i} data={output} />);
                                                    } else if (part.type === 'tool-getTopPosts') {
                                                        const top_posts_output = [(part.output as PostsListProps)];
                                                        if (part.state !== 'output-available') parts.push(<Loader key={i} />);
                                                        else parts.push(<PostsList key={i} id={i} data={top_posts_output} />);
                                                    }
                                                }
                                            });

                                            // Flush remaining
                                            if (currentFiles.length > 0 || currentText) {
                                                parts.push(
                                                    <TextConversation
                                                        key={`text-end`}
                                                        id={message.parts.length}
                                                        data={{ role: message.role, text: currentText, files: currentFiles }}
                                                    />
                                                );
                                            }

                                            return parts;
                                        };

                                        return (
                                            <Message from={message.role} key={message.id} className="flex items-start">
                                                <MessageAvatar
                                                    src={message.role === "user" && user ? user.imageUrl : "https://github.com/haydenbleasel.png"}
                                                    name={message.role === "user" && user ? user.firstName || "User" : "Hausbot"}
                                                    className="mt-2 border border-border rounded-full"
                                                />
                                                <div className={`flex flex-col gap-2 flex-1 min-w-0 ${message.role === 'user' ? 'items-start' : 'items-end'}`}>
                                                    {
                                                        message.parts.length > 0 ? renderParts()
                                                            : message.role === 'assistant' && (
                                                                <div className="flex items-center justify-center w-16 h-6">
                                                                    <Loader />
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </Message>
                                        )
                                    })
                                }
                            </ConversationContent>
                            <ConversationScrollButton className='cursor-pointer' />
                        </Conversation>
                    </div>
                </div>
                <footer className="fixed bottom-0 left-0 right-0 z-50 py-4">
                    <div className="w-[90%] md:w-1/2 mx-auto">
                        <PromptInputProvider>
                            <HausbotPromptInput
                                onSubmit={handleSubmit}
                                status={status}
                                recording={recording}
                                onMicClick={handleMicClick}
                                textareaRef={textareaRef}
                            />
                        </PromptInputProvider>
                    </div>
                </footer>
            </div>
        </Fragment>
    )
}