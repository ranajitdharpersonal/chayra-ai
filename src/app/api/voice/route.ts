// src/app/api/voice/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('file') as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: "Audio signal lost. No file received." }, { status: 400 });
    }

    console.log("🎙️ [Polyglot Agent]: Received encrypted audio stream. Sending to Whisper AI...");

    // Groq API expect kore ekta proper form-data
    const groqData = new FormData();
    groqData.append('file', audioFile, 'voice.webm');
    groqData.append('model', 'whisper-large-v3');
    
    // Strict accuracy-r jonno temperature 0
    groqData.append('temperature', '0.0'); 
    
    // Polyglot Prompt: AI ke direction dewa jate universal vabe kaj kore
    groqData.append('prompt', 'Emergency voice transmission. Please transcribe accurately. Language could be any local language or English. Ignore background noise, explosions, and silence. Do not invent words.');
    
    // API Call to Groq
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: groqData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Transcription completely failed");
    }

    console.log("✅ [Polyglot Agent]: Audio Decoded ->", data.text);
    return NextResponse.json({ success: true, text: data.text });

  } catch (error: any) {
    console.error("❌ [Polyglot Agent] Audio processing crashed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}