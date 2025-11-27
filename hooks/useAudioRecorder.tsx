// hooks/useAudioRecorder.ts
import { useState, useRef } from "react";

export function useAudioRecorder() {
    const [recording, setRecording] = useState(false);
    const [uploading, setUploading] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    
    function stopRecordingAndGetBlob(): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const recorder = mediaRecorderRef.current;
            if (!recorder) return reject("No active recorder");

            recorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                audioChunksRef.current = [];
                resolve(blob);
            };
            recorder.stop();
            setRecording(false);
        });
    }

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];
            recorder.ondataavailable = (e) => {
                audioChunksRef.current.push(e.data);
            };
            recorder.start();
            setRecording(true);
        } catch (err) {
            console.error("Microphone access denied or error:", err);
        }
    }

    return {
        recording,
        uploading,
        startRecording,
        stopRecordingAndGetBlob,
        setUploading,
    };
}