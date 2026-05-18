// src/core/agents/mindguard.ts
import { BaseAgent } from './base';

export class MindGuardAgent extends BaseAgent {
  constructor() {
    super("MindGuard", "Cyber-Security & Intent Verification Specialist");
  }

  /**
   * 🧠 REAL-WORLD SPAM & PRANK FILTER
   */
  public async execute(input: string, context?: any): Promise<{isEmergency: boolean, reason: string}> {
    console.log(`🛡️ [${this.name}]: Scanning input for pranks, spam, or non-emergencies...`);

    // 🛑 1. FAST-PASS CIRCUIT BREAKER (Omni-Disaster Protocol) 🛑
    // Ei word gulor kono ekta thaklei MindGuard kono AI check charai allow kore debe!
    const criticalKeywords = ['bomb', 'war', 'strike', 'fire', 'rocket', 'shoot', 'explosion', 'earthquake', 'tsunami', 'flood', 'cyclone', 'wildfire', 'hurricane', 'terrorist', 'attack', 'blood'];
    
    const inputLower = input.toLowerCase();
    const hasCriticalThreat = criticalKeywords.some(keyword => inputLower.includes(keyword));
    
    if (hasCriticalThreat) {
       console.log(`⚡ [${this.name}]: FAST-PASS TRIGGERED! Critical keyword detected. Bypassing AI verification.`);
       return { isEmergency: true, reason: "Valid - Omni-Disaster Keyword Match" };
    }

    // 🛑 2. 100% REAL AI PROMPT FOR SECURITY (High-Tolerance Override) 🛑
    const prompt = `
      You are MindGuard, the first-line triage firewall for a critical emergency rescue Swarm AI.
      Your job is to filter out explicit spam while letting ALL potential cries for help pass through.
      
      CRITICAL RULES:
      1. VAGUE CRIES FOR HELP ARE REAL: Inputs like "I need help", "help me", "save us", "emergency", or "please come" MUST be marked as isEmergency: true. People in crisis often cannot type long details. Do NOT block them for being vague.
      2. PHYSICAL THREATS: Any mention of pain, disaster, attacks, or fear MUST be marked as true.
      3. ONLY BLOCK CLEAR SPAM/PRANKS: You must ONLY return false if the input is explicitly a casual greeting (e.g., "hi", "how are you"), a joke, a coding request, or totally irrelevant to safety.
      
      Reply STRICTLY in valid JSON format:
      - isEmergency: boolean (true if it could be a valid crisis, false ONLY if it's clear spam/chat)
      - reason: string (If false, provide a short, stern military-style warning. If true, just output "Valid".)
      
      User Input: "${input}"
    `;

    try {
      const rawResponse = await this.think(prompt, context);
      const cleanJsonStr = rawResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const decision = JSON.parse(cleanJsonStr);

      if (!decision.isEmergency) {
         console.warn(`🛑 [${this.name}]: BLOCKED! Detected non-emergency: ${decision.reason}`);
      }

      return decision;

    } catch (error) {
      console.error(`❌ [${this.name}]: Scan failed. Defaulting to ALLOW to prevent blocking real emergencies.`, error);
      // 🛑 The Ultimate Fail-Safe: Jodi MindGuard crash kore, tahole by default ALLOW kore debe, jate real manush block na hoy.
      return { isEmergency: true, reason: "Fallback: Allowed" };
    }
  }
}

export const mindguardAgent = new MindGuardAgent();