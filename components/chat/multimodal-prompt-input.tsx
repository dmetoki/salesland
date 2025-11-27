"use client";

import { RefObject } from "react";
import { MicIcon, Image, Square } from "lucide-react";
import {
    PromptInput,
    PromptInputActionMenu,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    PromptInputFooter,
    PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputTools,
    usePromptInputAttachments
} from "@/components/ai-elements/prompt-input";

type ChatStatus = "streaming" | "submitted" | "ready" | "error";

type HausbotPromptInputProps = {
    onSubmit: (message: PromptInputMessage) => void;

    status: ChatStatus;
    recording: boolean;
    onMicClick: () => void;
    textareaRef: RefObject<HTMLTextAreaElement | null>;
};

export function PromptInputActionAddAttachmentsButton() {
    const attachments = usePromptInputAttachments();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        attachments.openFileDialog();
    };
    return (
        <PromptInputButton
            variant="outline"
            className="cursor-pointer"
            onClick={handleClick}
        >
            <Image className="size-4" />
        </PromptInputButton>
    );
}

export function HausbotPromptInput({
    onSubmit,

    status,
    recording,
    onMicClick,
    textareaRef
}: HausbotPromptInputProps) {

    return (
        <PromptInput globalDrop multiple onSubmit={onSubmit}>
            <PromptInputBody>
                <PromptInputTextarea ref={textareaRef} />
            </PromptInputBody>
            <PromptInputFooter>
                <PromptInputTools>
                    <PromptInputActionMenu>
                        <PromptInputActionAddAttachmentsButton />
                    </PromptInputActionMenu>
                    <PromptInputButton
                        variant="outline"
                        onClick={onMicClick}
                        className='cursor-pointer ml-2'
                    >
                        {
                            recording ? (
                                <Square className="size-4" />
                            ) : (
                                <MicIcon className="size-4" />
                            )
                        }
                    </PromptInputButton>
                    <PromptInputAttachments>
                        {(attachment) => <PromptInputAttachment data={attachment} />}
                    </PromptInputAttachments>
                </PromptInputTools>
                <PromptInputSubmit
                    status={status}
                    variant="outline"
                    className='cursor-pointer'
                />
            </PromptInputFooter>
        </PromptInput>
    );
}
