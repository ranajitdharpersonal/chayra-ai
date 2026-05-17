// src/core/agents/scavenger.ts
import { BaseAgent } from './base';

export class ScavengerAgent extends BaseAgent {
  constructor() {
    super("Scavenger", "Data Extraction & Triage Specialist");
  }

  public async execute(input: string, context?: any): Promise<any> {
    console.log(`🕵️‍♂️ [${this.name}]: Scavenging raw emergency data...`);

    // 100% REAL AI PROMPT
    const prompt = `
      You are the Scavenger Agent in a crisis rescue system.
      Analyze the following raw emergency text from a victim and extract critical data.
      Reply STRICTLY in valid JSON format with the following keys, no markdown, no extra text:
      - threatLevel: (CRITICAL, HIGH, MEDIUM, LOW)
      - emergencyCategory: (Medical, Structural, Combat, Natural Disaster, etc.)
      - mentionedLocation: (Extract location if mentioned, otherwise null)
      - requiredAgents: (Array of required agents to handle this. Choose from: ["Medical", "Navigator", "Vault"])
      
      Raw Emergency Text: "${input}"
    `;

    try {
      // Connecting to the 3-Brain Swarm via base.ts
      const rawResponse = await this.think(prompt, context);
      
      // Clean up Markdown backticks safely to avoid VS Code syntax errors
      const cleanJsonStr = rawResponse.replace(new RegExp('```json', 'gi'), '').replace(new RegExp('```', 'gi'), '').trim();
      const extractedData = JSON.parse(cleanJsonStr);
      
      console.log(`🕵️‍♂️ [${this.name}]: Extraction complete. Threat Level: ${extractedData.threatLevel}`);
      return extractedData;

    } catch (error) {
      console.error(`❌ [${this.name}]: AI Extraction failed.`, error);
      // Failsafe mechanism
      return {
        threatLevel: "CRITICAL",
        emergencyCategory: "Unknown",
        mentionedLocation: null,
        requiredAgents: ["Medical", "Navigator"]
      };
    }
  }
}

export const scavengerAgent = new ScavengerAgent();