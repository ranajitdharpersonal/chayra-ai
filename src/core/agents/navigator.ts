// src/core/agents/navigator.ts
import { BaseAgent } from './base';

export class NavigatorAgent extends BaseAgent {
  constructor() {
    super("Navigator", "Tactical Evacuation & Routing Specialist");
  }

  /**
   * 🧠 DUAL-SCAN REAL-WORLD HONEST ROUTING (Searches both Hospital & Bunker)
   */
  public async execute(input: string, context?: any): Promise<any> {
    console.log(`🗺️ [${this.name}]: Executing DUAL-SCAN for real-world safe zones...`);
    
    const userCoords = context?.userCoords;
    if (!userCoords) {
       throw new Error("User coordinates missing. Cannot calculate real-world route.");
    }

    // 1. Swarm Brain decides the PRIMARY priority for the Map Pin
    const prompt = `
      You are the Navigator Agent in a crisis rescue system.
      We will automatically search for BOTH "hospital" and "bunker" in the background.
      You need to decide which one is the HIGHEST PRIORITY based on the emergency to draw the primary map route.
      Reply STRICTLY in valid JSON format:
      - primaryNeed: ("hospital" or "bunker")
      - instruction: (A short tactical instruction to follow)
      
      User Emergency: "${input}"
    `;

    try {
      const rawResponse = await this.think(prompt, context);
      const cleanJsonStr = rawResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const decision = JSON.parse(cleanJsonStr);

      console.log(`📡 [${this.name}]: Parallel searching for BOTH Hospital & Bunker near [${userCoords.lat}, ${userCoords.lng}]`);
      
      // 🛑 2. THE MASTERSTROKE: PARALLEL SEARCH (Khujbe dutoi eksathe!)
      const [hospitalCoords, bunkerCoords] = await Promise.all([
        this.fetchNearestFacility(userCoords.lat, userCoords.lng, 'hospital'),
        this.fetchNearestFacility(userCoords.lat, userCoords.lng, 'bunker')
      ]);

      let responseText = "";
      let finalDestCoords = null;

      // 🛑 3. SMART DECISION TREE (Based on what is actually found)
      if (hospitalCoords && bunkerCoords) {
        responseText = `Verified Hospital AND Bunker BOTH detected within 10km! ${decision.instruction}`;
        // Map e pin porbe AI er priority onujayi
        finalDestCoords = decision.primaryNeed === 'hospital' ? hospitalCoords : bunkerCoords; 
      } 
      else if (hospitalCoords && !bunkerCoords) {
        responseText = `Verified Hospital detected, but NO BUNKERS found within 10km radius. ${decision.instruction}`;
        finalDestCoords = hospitalCoords;
      } 
      else if (!hospitalCoords && bunkerCoords) {
        responseText = `Verified Bunker detected, but NO HOSPITALS found within 10km radius. ${decision.instruction}`;
        finalDestCoords = bunkerCoords;
      } 
      else {
        responseText = `CRITICAL ALERT: Neither Hospital nor Bunker found within a 25km radius! DO NOT move blindly. Seek immediate hard cover and stay out of sight.`;
        finalDestCoords = null; // Kono fake pin porbe na!
      }

      return {
        text: responseText,
        destCoords: finalDestCoords, 
        isRealData: !!finalDestCoords
      };

    } catch (error) {
      console.error(`❌ [${this.name}]: API or AI completely failed.`, error);
      return {
        text: "SYSTEM WARNING: Satellite map link disrupted. Cannot verify any safe zones. Stay hidden, conserve battery, and await rescue.",
        destCoords: null 
      };
    }
  }

  /**
   * 📡 Overpass API Call to find REAL Hospitals/Bunkers/Shelters
   */
  private async fetchNearestFacility(lat: number, lng: number, type: string) {
    let query = "";
    
    // FIX: Removed the '1' from 'out center 1' which causes parsing errors in some nodes
    if (type === 'hospital') {
      query = `[out:json];(nwr["amenity"="hospital"](around:25000,${lat},${lng});nwr["amenity"="clinic"](around:25000,${lat},${lng}););out center;`;
    } else {
      query = `[out:json];(nwr["military"="bunker"](around:25000,${lat},${lng});nwr["amenity"="shelter"](around:25000,${lat},${lng}););out center;`;
    }

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      console.log(`📡 Fetching OSM Data for ${type} (Radius: 25km)...`);
      
      // FIX: Added required Headers so Overpass doesn't block us with 406
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'ChayRa-AI-Rescue-System/1.0 (Hackathon)'
        }
      });
      
      if (!response.ok) {
         console.warn(`⚠️ Overpass API Network Error: ${response.status}`);
         return null;
      }

      const data = await response.json();

      if (data.elements && data.elements.length > 0) {
        const nearest = data.elements[0];
        const foundLat = nearest.lat || nearest.center?.lat;
        const foundLng = nearest.lon || nearest.center?.lon;
        
        if (foundLat && foundLng) {
          console.log(`✅ [${type.toUpperCase()}] FOUND! Lat: ${foundLat}, Lng: ${foundLng}`);
          return { lat: foundLat, lng: foundLng };
        }
      }
      return null; 
    } catch (e) {
      console.error("Overpass API Complete Failure:", e);
      return null;
    }
  }
}

export const navigatorAgent = new NavigatorAgent();