import MapWidget from '@/components/MapWidget';
import HelpBar from '@/components/HelpBar';
import ActionPanel from '@/components/ActionPanel';

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-black overflow-hidden font-sans selection:bg-red-500/30">
      
      {/* 1. Background Map Layer */}
      <div className="absolute inset-0 z-0">
        <MapWidget />
      </div>

      {/* 2. Floating UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* --- TOP LEFT: Header & Logo --- */}
        <div className="absolute top-6 left-6 pointer-events-auto">
          {/* 🛑 Box, Background ar Border puro uriye dewa holo! Sudhu floating thakbe */}
          <header className="flex items-center gap-4">
            
            {/* 🛡️ Logo Image Block */}
            <div className="w-20 h-20 flex items-center justify-center overflow-hidden drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] hover:scale-105 transition-transform">
              <img src="/logo.png" alt="ChayRa AI" className="w-full h-full object-contain" />
            </div>
            
            {/* 🔠 Typography Block (Same as your Image) */}
            <div>
              <h1 className="text-5xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] flex items-center gap-2">
                {/* ChayRa font-light (patla), AI font-black (mota) */}
                <span className="text-white font-bold">ChayRa</span> 
                <span className="text-red-600 font-bold">AI</span>
              </h1>
              <p className="text-white-300 text-[12px] tracking-[0.1em] mt-3 drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
                When the World Breaks, ChayRa Responds
              </p>
            </div>

          </header>
        </div>

        {/* --- RIGHT SIDE: Action Widgets --- */}
        {/* Fix 1: bottom-32 changed to bottom-6 to remove squish/scrollbar */}
        <div className="absolute top-6 right-6 bottom-6 overflow-y-auto scrollbar-hide pointer-events-auto z-40">
          <ActionPanel />
        </div>

        {/* --- BOTTOM: Command Center (SHIFTED LEFT & CONSTRAINED) --- */}
        {/* Fix: Right side-e 420px gap rakha holo jate ActionPanel-er opor na uthe jay ar bam dike chepe thake */}
        <div className="absolute bottom-14 left-18 right-[450px] pointer-events-none z-50">
          <div className="w-full pointer-events-auto">
            <HelpBar />
          </div>
        </div>

      </div>
    </main>
  );
}