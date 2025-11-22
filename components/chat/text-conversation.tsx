import { cn } from "@/lib/utils";
import { MessageContent } from "@/components/ai-elements/message";
import { Response } from '@/components/ai-elements/response';

type TextConversationProps = {
    text: string;
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
            <Response>{data.text}</Response>
        </MessageContent>
  )
}