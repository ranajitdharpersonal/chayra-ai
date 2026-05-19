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
        
        {/* --- TOP LEFT: Header & Logo (Responsive resizing!) --- */}
        <div className="absolute top-3 left-3 md:top-6 md:left-6 pointer-events-auto z-50">
          <header className="flex items-center gap-2 md:gap-4">
            
            {/* 🛡️ Logo Image Block */}
            <div className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center overflow-hidden drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] hover:scale-105 transition-transform">
              <img src="/logo.png" alt="ChayRa AI" className="w-full h-full object-contain" />
            </div>
            
            {/* 🔠 Typography Block */}
            <div>
              <h1 className="text-3xl md:text-5xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] flex items-center gap-1 md:gap-2">
                <span className="text-white font-bold">ChayRa</span> 
                <span className="text-red-600 font-bold">AI</span>
              </h1>
              <p className="text-white/90 text-[9px] md:text-[12px] tracking-[0.05em] md:tracking-[0.1em] mt-1 md:mt-3 drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
                When the World Breaks, ChayRa Responds
              </p>
            </div>

          </header>
        </div>

        {/* --- RIGHT SIDE / MOBILE MIDDLE: Action Widgets --- */}
        {/* Mobile: Logo er niche scroll korbe. Desktop: Dan dike bosbe */}
        <div className="absolute top-20 left-2 right-2 bottom-[240px] md:top-6 md:left-auto md:right-6 md:bottom-6 overflow-y-auto scrollbar-hide pointer-events-auto z-40 flex md:block justify-center">
          <ActionPanel />
        </div>

        {/* --- BOTTOM: Command Center --- */}
        {/* left-3 right-3 kora holo button take bhitore anar jonno, ar md:bottom-20 kora holo jate Mobile-er Desktop Site-eo na lukiye jay */}
        <div className="absolute bottom-[85px] md:bottom-20 left-3 right-3 md:left-18 md:right-[400px] lg:right-[450px] pointer-events-none z-50">
          <div className="w-full pointer-events-auto">
            <HelpBar />
          </div>
        </div>

      </div>
    </main>
  );
}