// src/core/agents/medical.ts
import { BaseAgent } from './base';

export class MedicalAgent extends BaseAgent {
  // Apnar purono protocol gulo rekhe dilam OFFLINE FALLBACK hisabe
  private fallbackProtocols = {
    bleeding: [
      "Apply firm, direct pressure to the wound with a clean cloth.",
      "Keep the injured area elevated above the heart if possible.",
      "If the bleeding doesn't stop, apply a tourniquet 2-3 inches above the wound."
    ],
    burns: [
      "Cool the burn immediately with cool running water for at least 10 minutes.",
      "Remove constricting items (rings, belts) before swelling starts.",
      "Cover the burn loosely with a clean, dry dressing or plastic wrap. Do NOT pop blisters."
    ],
    fracture: [
      "Do NOT try to realign the bone.",
      "Immobilize the area using a splint (can use straight sticks and cloth).",
      "Apply an ice pack wrapped in a cloth to reduce swelling."
    ],
    breathing: [
      "Ensure the airway is clear.",
      "If the person is unresponsive and not breathing, begin CPR immediately.",
      "If choking, perform abdominal thrusts (Heimlich maneuver)."
    ],
    default: [
      "Stay calm and assess the situation.",
      "Check for responsiveness and breathing.",
      "Move to a safe location if your current position is immediately dangerous."
    ]
  };

  constructor() {
    // 🛑 Connect to BaseAgent
    super("Medical", "Emergency First-Aid & Triage Specialist");
  }

  /**
   * 🧠 REAL AI TRIAGE GENERATION
   */
  public async execute(input: string, context?: any): Promise<string[]> {
    console.log(`⚕️ [${this.name}]: Analyzing trauma context with 3-Brain Swarm...`);

    // 100% REAL AI PROMPT
    const prompt = `
      You are the Medical Agent in a crisis rescue system.
      Provide life-saving, concise first-aid steps based on the user's emergency.
      Keep it short, actionable, and under stress-friendly conditions.
      Reply STRICTLY in a valid JSON array of strings. No markdown, no extra text.
      Maximum 3 or 4 steps.
      Example format: ["Apply firm pressure to the wound", "Elevate the injured area", "Do not remove the embedded object"]

      Emergency Context: "${input}"
    `;

    try {
      // Sending data to Master 3-Brain
      const rawResponse = await this.think(prompt, context);
      
      // Safe JSON parsing (cleaning up markdown if AI adds it)
      const cleanJsonStr = rawResponse.replace(new RegExp('```json', 'gi'), '').replace(new RegExp('```', 'gi'), '').trim();
      const triageSteps: string[] = JSON.parse(cleanJsonStr);
      
      console.log(`⚕️ [${this.name}]: Successfully generated ${triageSteps.length} live triage steps.`);
      return triageSteps;

    } catch (error) {
      console.error(`❌ [${this.name}]: AI Medical analysis failed. Activating Offline Lifeline Protocols!`, error);
      // 🛑 The Ultimate Fail-Safe: Jodi AI down hoye jay, purono logic e kaj korbe
      return this.getOfflineProtocol(input);
    }
  }

  // Eita apnar purono function, jeta ekhon backup hisabe kaj korbe
  private getOfflineProtocol(context: string): string[] {
    const lowerContext = context.toLowerCase();
    if (lowerContext.includes("blood") || lowerContext.includes("bleeding") || lowerContext.includes("cut")) return this.fallbackProtocols.bleeding;
    if (lowerContext.includes("burn") || lowerContext.includes("fire") || lowerContext.includes("scald")) return this.fallbackProtocols.burns;
    if (lowerContext.includes("broken") || lowerContext.includes("bone") || lowerContext.includes("fracture")) return this.fallbackProtocols.fracture;
    if (lowerContext.includes("breath") || lowerContext.includes("choke") || lowerContext.includes("unconscious")) return this.fallbackProtocols.breathing;
    return this.fallbackProtocols.default;
  }
}

export const medicalAgent = new MedicalAgent();