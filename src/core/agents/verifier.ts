// src/core/agents/verifier.ts
import { BaseAgent } from './base';

export class VerifierAgent extends BaseAgent {
  constructor() {
    super("Verifier", "Intelligence Cross-Referencing & Fact Checker");
  }

  /**
   * 🧠 REAL-WORLD FACT CHECKING
   * Compares User's Claim with Radar's Intel
   */
  public async execute(input: string, context?: any): Promise<any> {
    console.log(`⚖️ [${this.name}]: Cross-referencing user claim with Radar Intel...`);

    const radarIntel = context?.radarIntel || "No active radar intel.";

    // 100% REAL AI FACT-CHECK PROMPT
    const prompt = `
      You are the Verifier Agent in a critical rescue system.
      Your job is to cross-check the user's emergency claim against the real-time Radar Intelligence.
      Determine if the user's claim matches or is supported by the radar data. 
      Reply STRICTLY in valid JSON format:
      - isVerified: boolean (true if radar supports it, or if radar is inconclusive but claim is plausible. false ONLY if radar directly contradicts it).
      - confidenceScore: number (0 to 100)
      - verificationNote: string (Short military-style note explaining the correlation. E.g., "Claim corroborated by live seismic data.")

      User Claim: "${input}"
      Radar Intel: "${radarIntel}"
    `;

    try {
      const rawResponse = await this.think(prompt, context);
      const cleanJsonStr = rawResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const verificationData = JSON.parse(cleanJsonStr);

      console.log(`⚖️ [${this.name}]: Fact-check complete. Confidence: ${verificationData.confidenceScore}%`);
      return verificationData;

    } catch (error) {
      console.error(`❌ [${this.name}]: Verification failed. Defaulting to Trust-User protocol.`, error);
      // 🛑 The Ultimate Fail-Safe: Jodi Fact-checker API crash kore, tahole by default manush ke bishwas korbe (Trust User), jate kono ashol bipod ignore na hoy!
      return {
        isVerified: true,
        confidenceScore: 80,
        verificationNote: "System offline. Defaulting to user trust protocol."
      };
    }
  }
}

export const verifierAgent = new VerifierAgent();