// src/app/api/swarm/route.ts
import { NextResponse } from 'next/server';
import { scavengerAgent } from '@/core/agents/scavenger';
import { medicalAgent } from '@/core/agents/medical'; 
import { navigatorAgent } from '@/core/agents/navigator'; 
import { radarAgent } from '@/core/agents/radar'; 
import { vaultAgent } from '@/core/agents/vault'; 
import { mindguardAgent } from '@/core/agents/mindguard'; 
import { verifierAgent } from '@/core/agents/verifier'; // 🛑 NEW IMPORT: VERIFIER
import { askBrain } from '@/core/brain/brain'; // 🛑 NEW IMPORT: For Live Circuit Status

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.message;
    const userLocation = body.location; // HelpBar theke exact Map Pin asche

    if (!userMessage) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    console.log("👁️ WATCHMAN (API): User emergency received. Initiating Swarm...");

    // 🛑 SECURITY CHECK: MINDGUARD (The Bouncer)
    const securityCheck = await mindguardAgent.execute(userMessage);
    if (!securityCheck.isEmergency) {
      console.warn("👁️ WATCHMAN (API): Prank detected. Stopping Swarm execution.");
      return NextResponse.json({ 
        success: true, 
        brain_used: "MINDGUARD FIREWALL", 
        circuit_tripped: "NON-EMERGENCY DENIED", 
        message: `SYSTEM DENIED: ${securityCheck.reason}`,
        actionData: {
          intel: "SCAN ABORTED. Secure line reserved for active crises only.",
          route: "No tactical routing for non-emergencies.",
          destCoords: null,
          medical: ["No triage required."],
          vault: "Identity standby."
        }
      });
    }

    // 🛑 STEP 1: SCAVENGER AGENT (Extracts Data First)
    const triageData = await scavengerAgent.execute(userMessage);
    
    // 🛑 STEP 2: DYNAMIC ORCHESTRATION 
    
    // 2A. Radar always environment scan korbe
    const radarInfo = await radarAgent.execute(userMessage);
    
    // 🛑 2B. NEW: VERIFIER AGENT (Cross-checks user claim with Radar Intel)
    const verificationData = await verifierAgent.execute(userMessage, { radarIntel: radarInfo });
    
    // UI te dekhanor jonno Radar info tar sathe Verification stamp lagiye dicchi!
    const finalRadarIntel = verificationData.isVerified 
        ? `[VERIFIED: ${verificationData.confidenceScore}%] ${radarInfo} - ${verificationData.verificationNote}`
        : `[UNVERIFIED: ${verificationData.confidenceScore}% WARNING] ${radarInfo} - ${verificationData.verificationNote}`;

    // 2C. Medical Agent
    let medicalTips: string[] = ["Standby for medical triage."];
    if (triageData.requiredAgents.includes("Medical") || triageData.emergencyCategory.includes("Medical")) {
        medicalTips = await medicalAgent.execute(userMessage);
    }

    // 2D. Navigator route toiri korbe
    let routeData: any = { text: "Standby for routing protocols.", destCoords: null };
    if (userLocation) {
        routeData = await navigatorAgent.execute(userMessage, { userCoords: userLocation });
    }

    // 2E. Vault Agent execution
    const vaultInfo = await vaultAgent.execute(userMessage);

    // 🛑 STEP 3: SYSTEM CONVERSATIONAL MESSAGE
    const systemMessage = `THREAT LEVEL: ${triageData.threatLevel}. Rescue protocols activated. Follow tactical intel on the panels.`;

    // 🛑 NEW: FAST PING TO GET ACTIVE BRAIN & CIRCUIT STATUS
    const sysPing = await askBrain("ping", "ping");

    // 🛑 STEP 4: SENDING DATA TO FRONTEND (Perfect JSON for HelpBar)
    return NextResponse.json({ 
      success: true, 
      brain_used: sysPing.modelUsed, 
      circuit_tripped: sysPing.circuitTripped, 
      message: systemMessage,
      actionData: {
        intel: finalRadarIntel, 
        route: routeData.text,
        destCoords: routeData.destCoords, 
        medical: medicalTips,
        vault: vaultInfo 
      }
    });

  } catch (error) {
    console.error("Swarm API Error:", error);
    return NextResponse.json({ error: "Complete System Failure. All brains down." }, { status: 500 });
  }
}