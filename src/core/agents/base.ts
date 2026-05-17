// src/core/agents/base.ts

// 🛑 APNAR ASHOL FUNCTION IMPORT KORA HOLO
import { askBrain } from '../brain/brain'; 

export abstract class BaseAgent {
  public name: string;
  public role: string;

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }

  /**
   * 🧠 THE SWARM CONNECTION (Now 100% connected to 3-Brain Failover)
   */
  protected async think(prompt: string, context: any = {}): Promise<string> {
    console.log(`[${this.name}] Initiating 3-Brain Swarm Process...`);
    
    // Agent-er nam ar role ta system instruction e pathacchi jate AI bujhte pare se ke
    const systemInstruction = `You are the ${this.name} agent. Your role is: ${this.role}. Context: ${JSON.stringify(context)}`;
    
    try {
      // 🛑 Apnar ashol askBrain function call hocche ekhane
      const response = await askBrain(prompt, systemInstruction);
      
      // Jodi main brain fail kore Llama ba Qwen e jay, seta console e dekhabe
      if (response.circuitTripped) {
         console.warn(`⚠️ [${this.name}] Circuit Tripped: ${response.circuitTripped}`);
      }
      
      return response.text; // Scavenger agent ei text tai extract korbe
    } catch (error) {
      console.error(`❌ [${this.name}] Connection to 3-Brain Swarm FAILED:`, error);
      throw new Error(`Agent ${this.name} completely failed to process.`);
    }
  }

  /**
   * 🛑 Protita Agent ke obossoi ei execute function ta thakte hobe
   */
  public abstract execute(input: any, context?: any): Promise<any>;
}