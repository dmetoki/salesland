import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("audio") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No audio file received" },
                { status: 400 }
            );
        }
        const transcription = await openai.audio.transcriptions.create({file, model: "whisper-1"});
        return NextResponse.json({ text: transcription.text });
    } catch (err: unknown) {
        console.error("Transcription error:", err);
        return NextResponse.json(
            { error: "Failed to process audio" },
            { status: 500 }
        );
    }
}