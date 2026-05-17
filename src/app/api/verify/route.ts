// src/app/api/verify/route.ts
import { NextResponse } from 'next/server';
import { verifierAgent } from '@/core/agents/verifier'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { claim, radarIntel } = body;

    if (!claim) {
      return NextResponse.json({ error: "No claim provided to verify." }, { status: 400 });
    }

    console.log("⚖️ [VERIFY API]: Received standalone rumor check request...");

    // 🛑 Shudhumatro Verifier Agent ke call kora hocche (Puro Swarm ke noy!)
    const verificationData = await verifierAgent.execute(claim, { radarIntel: radarIntel || "No radar intel available." });

    // Result UI te pathiye dicche
    return NextResponse.json(verificationData);

  } catch (error) {
    console.error("Verification API Error:", error);
    return NextResponse.json({ error: "Fact-checking system offline." }, { status: 500 });
  }
}