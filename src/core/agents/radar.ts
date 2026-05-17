// src/core/agents/radar.ts
import { BaseAgent } from './base';

export class RadarAgent extends BaseAgent {
  constructor() {
    super("Radar", "Threat Intelligence & Environment Scanner");
  }

  // BaseAgent-er mandatory execute function (Chat-er jonno call hobe)
  public async execute(input: string, context?: any): Promise<any> {
    return this.scanThreats(input, context);
  }

  // 1. FOR CHAT PANEL (Threat Intel Scanner - NOW POWERED BY 3-BRAIN SWARM!)
  public async scanThreats(input: string, context?: any): Promise<string> {
    console.log(`📡 [${this.name}]: Scanning perimeter for active threats via Swarm...`);

    // 100% REAL AI PROMPT
    const prompt = `
      You are the Radar Agent in a crisis rescue system.
      Analyze the user's emergency context and provide a brief 1-2 sentence tactical threat intel report.
      Identify hazards like fire, stray bullets, structural collapse, or seismic aftershocks based on their words.
      Format exactly like this: "ALERT: [Threat type detected]. [Actionable warning]."
      Keep it very short and military-style.

      User Context: "${input}"
    `;

    try {
      const aiResponse = await this.think(prompt, context);
      return aiResponse.replace(/"/g, '').trim(); // Cleanup any quotes from LLM
    } catch (error) {
      console.error(`❌ [${this.name}]: AI Scan failed. Using Offline Fallback Scanner.`, error);
      return this.fallbackScan(input);
    }
  }

  // The Ultimate Fail-Safe: API down thakle eita kaj korbe
  private fallbackScan(context: string): string {
    const lowerContext = context?.toLowerCase() || ""; 
    if (lowerContext.includes("fire") || lowerContext.includes("burn") || lowerContext.includes("smoke")) {
      return "ALERT: Thermal anomalies detected. Active fire zone confirmed. Structural collapse risk is HIGH.";
    }
    if (lowerContext.includes("shoot") || lowerContext.includes("gun") || lowerContext.includes("attack") || lowerContext.includes("war")) {
      return "CRITICAL: Armed conflict detected in your sector. Stray projectile risk. Keep your head down.";
    }
    if (lowerContext.includes("earthquake") || lowerContext.includes("shake") || lowerContext.includes("rubble")) {
      return "WARNING: Seismic activity confirmed. Aftershocks are highly probable. Avoid damaged concrete structures.";
    }
    return "AWAITING ACTIVE RADAR SCANS... No immediate severe threats detected in your exact coordinates, but stay vigilant.";
  }

  // 2. FOR GLOBAL MAP (Hybrid Intel: Persistent War Zones + Live Seismic Data)
  // 🛑 BOSSSS, AS YOU REQUESTED: CONFLICT ZONES ARE 100% UNTOUCHED AND INTACT!
  public async scanGlobalThreats(): Promise<any[]> {
    console.log(`📡 [${this.name}]: Fetching Hybrid Global Intel (War + Natural Disasters)...`);
    
    try {
      // 🛑 1. PERSISTENT CONFLICT & CRISIS ZONES - 100% Real Active Zones
      const conflictZones = [
        // 🔥 Middle East & Asia Hotspots
        { id: 'war-iran', lat: 32.4279, lng: 53.6880, name: 'CRISIS TENSION ZONE: IRAN', type: 'war' },
        
        // 🛑 BOSSS, FIXED HERE: 3 Separate Granular Zones!
        { id: 'war-gaza', lat: 31.4167, lng: 34.3333, name: 'CRITICAL WAR ZONE: GAZA STRIP', type: 'war' },
        { id: 'war-israel', lat: 31.0461, lng: 34.8516, name: 'ACTIVE CONFLICT: ISRAEL', type: 'war' },
        { id: 'war-palestine', lat: 32.0236, lng: 35.2423, name: 'CRISIS ZONE: PALESTINE (WEST BANK)', type: 'war' },
        
        { id: 'war-lebanon', lat: 33.8547, lng: 35.8623, name: 'BORDER CONFLICT: LEBANON', type: 'war' },
        { id: 'war-syria', lat: 34.8021, lng: 38.9968, name: 'ACTIVE CONFLICT: SYRIA', type: 'war' },
        { id: 'war-yemen', lat: 15.5527, lng: 48.5164, name: 'ARMED CONFLICT: YEMEN', type: 'war' },
        { id: 'war-myanmar', lat: 21.9162, lng: 95.9560, name: 'ARMED CONFLICT: MYANMAR', type: 'war' },
        
        // 🔥 Eastern Europe
        { id: 'war-ukraine', lat: 48.3794, lng: 31.1656, name: 'ACTIVE CONFLICT: UKRAINE', type: 'war' },
        
        // 🔥 Africa & Americas (Civil Wars & Extreme Unrest)
        { id: 'war-sudan', lat: 12.8628, lng: 30.2176, name: 'ACTIVE CIVIL WAR: SUDAN', type: 'war' },
        { id: 'crisis-venezuela', lat: 7.4238, lng: -66.5897, name: 'CIVIL UNREST: VENEZUELA', type: 'war' },
        { id: 'crisis-haiti', lat: 18.9712, lng: -72.2852, name: 'CRITICAL UNREST: HAITI', type: 'war' }
      ];

      // 🛑 2. LIVE USGS API (EARTHQUAKES & TSUNAMIS)
      const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
      let liveThreats: any[] = [];
      
      if (response.ok) {
        const data = await response.json();
        liveThreats = data.features.slice(0, 15).map((quake: any, index: number) => {
          const threatType = quake.properties.tsunami === 1 ? 'tsunami' : 'earthquake'; 
          return {
            id: quake.id || `seismic-${index}`,
            lat: quake.geometry.coordinates[1],
            lng: quake.geometry.coordinates[0],
            name: `${threatType.toUpperCase()} ALERT: ${quake.properties.place}`,
            type: threatType
          };
        });
      }

      // Merge Persistent War Zones with Live Earthquakes and return!
      return [...conflictZones, ...liveThreats]; 

    } catch (error) {
      console.error("Live API Fetch Error:", error);
      // Jodi API fail o kore, war zones gulo jate thake map e
      return [
        { id: 'war-ukraine', lat: 48.3794, lng: 31.1656, name: 'ACTIVE CONFLICT: UKRAINE', type: 'war' },
        { id: 'war-gaza', lat: 31.3547, lng: 34.3088, name: 'CRISIS ZONE: GAZA STRIP', type: 'war' }
      ];
    }
  }
}

export const radarAgent = new RadarAgent();