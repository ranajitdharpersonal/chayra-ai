import { NextResponse } from 'next/server';
import { radarAgent } from '@/core/agents/radar';

// 🛑 24-HOUR CACHE MAGIC (86400 Seconds)
// Eita lagale din-e matro ekbar live API call hobe (1 hit/day). 
// Baki puro 24 ghonta Next.js nijer super-fast memory theke map load korabe! Quota 100% saved!
export const revalidate = 86400;

export async function GET() {
  try {
    const realTimeZones = await radarAgent.scanGlobalThreats();
    
    // Jodi API kono karone khali data dey, tahole fake point na diye empty array pathabo
    if (!realTimeZones || realTimeZones.length === 0) {
       return NextResponse.json([]);
    }
    
    return NextResponse.json(realTimeZones);
    
  } catch (error) {
    // 🛑 FIX 1: Error ta console-e print kora jate apni terminal-e ashol bug ta dekhte paren!
    console.error("📡 Radar Agent Critical Error:", error);
    
    // 🛑 FIX 2: Fake "Null Island (0,0)" point na pathiye, ekta proper 500 System Error pathachi.
    // Ete apnar map-e fake red dot asbe na, ar frontend bujhte parbe je backend connect hoyni.
    return NextResponse.json(
      { error: "Failed to sync with global radar satellites." }, 
      { status: 500 }
    );
  }
}