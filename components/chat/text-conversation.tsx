import { cn } from "@/lib/utils";
import { MessageContent } from "@/components/ai-elements/message";
import { Response } from '@/components/ai-elements/response';
import { FileUIPart } from "ai";
import Image from "next/image";

type TextConversationProps = {
    text: string;
    files?: FileUIPart[];
    role: "system" | "user" | "assistant"
}

export default function TextConversation({ id, data }: { id: number, data: TextConversationProps }) {
    return (
        <MessageContent
            variant="contained"
            className={cn(
                "border border-border max-w-[80%]",
                data.role === "user"
                    ? "bg-secondary dark:bg-secondary/80"
                    : "bg-primary/10 dark:bg-secondary/30"
            )}
            key={id}
        >
            {
                data.files && data.files.length > 0 && (
                    <div className="flex flex-col gap-2 mb-2">
                        {data.files.map((file, i) => {
                            if (file.mediaType?.startsWith('image/')) {
                                return (
                                    <Image
                                        key={i}
                                        src={file.url}
                                        alt={file.filename || `attachment-${i}`}
                                        width={500}
                                        height={500}
                                        className="rounded-md max-w-full h-auto"
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                )
            }
            <Response>{data.text}</Response>
        </MessageContent>
    )
}