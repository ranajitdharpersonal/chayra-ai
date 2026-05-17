'use client';
import { useState, useEffect } from 'react';
import { ShieldAlert, Route, HeartPulse, ShieldCheck, Search, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function ActionPanel() {
  // Default Idle State
  const [panelData, setPanelData] = useState({
    intel: "AWAITING ACTIVE RADAR SCANS... No immediate threats in your perimeter.",
    route: "Standby for routing protocols. No active evacuation order.",
    medical: ["Standby for medical triage.", "Ensure water supply.", "Keep emergency comms on."],
    vault: "Identity standby. Waiting for emergency trigger to generate secure beacon."
  });

  // 🛑 NEW: RUMOR CHECKER / VERIFIER STATE & LOGIC (Ebar ekdom thik jaigay ache!) 🛑
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyNews = async () => {
    if (!verifyInput.trim()) return;
    setIsVerifying(true);
    setVerifyResult(null);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: verifyInput, radarIntel: panelData.intel }) 
      });
      const data = await res.json();
      setVerifyResult(data);
    } catch (error) {
      setVerifyResult({ error: "System offline. Cannot verify right now." });
    } finally {
      setIsVerifying(false);
    }
  };

  // Listen for the custom event from the Mastermind Brain
  useEffect(() => {
    const handleIntelUpdate = (event: any) => {
      if (event.detail) {
        setPanelData(event.detail);
      }
    };
    
    window.addEventListener('SWARM_INTEL_UPDATE', handleIntelUpdate);
    return () => window.removeEventListener('SWARM_INTEL_UPDATE', handleIntelUpdate);
  }, []);

  return (
    // Gap 4 theke komiye 2.5 kora holo, ar max-w 320 theke bariye 360 kora holo
    <div className="flex flex-col gap-2.5 w-full max-w-[360px] pointer-events-auto transition-all duration-500">
      
      {/* Widget 1: Threat Intel (Radar + Verifier) */}
      <div className="bg-black/60 backdrop-blur-xl border border-red-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.15)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500 animate-pulse"></div>
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <h3 className="text-xs font-bold text-red-500 tracking-widest">LIVE INTEL</h3>
        </div>
        <p className="text-[11px] text-gray-300 font-mono leading-relaxed">
          {panelData.intel}
        </p>
      </div>

      {/* Widget 2: Safe Route (Navigator) */}
      <div className="bg-black/60 backdrop-blur-xl border border-blue-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <div className="flex items-center gap-2 mb-3">
          <Route className="w-5 h-5 text-blue-500" />
          <h3 className="text-xs font-bold text-blue-500 tracking-widest">EVACUATION ROUTE</h3>
        </div>
        <div className="bg-blue-950/30 p-2 rounded border border-blue-500/20 text-[10px] text-blue-200 font-mono">
          {panelData.route}
        </div>
      </div>

      {/* Widget 3: Medical Triage (Medical Agent) */}
      <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.1)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
        <div className="flex items-center gap-2 mb-3">
          <HeartPulse className="w-5 h-5 text-green-500" />
          <h3 className="text-xs font-bold text-green-500 tracking-widest">MEDICAL TRIAGE</h3>
        </div>
        <ul className="text-[10px] text-gray-300 font-mono space-y-2">
          {panelData.medical.map((tip, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-green-500">[{index + 1}]</span> {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Widget 4: Blockchain ID / Survival (ID Vault) */}
      <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.1)] relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-purple-500" />
          <h3 className="text-xs font-bold text-purple-500 tracking-widest">SECURE VAULT</h3>
        </div>
        <p className="text-[10px] text-gray-400 font-mono">
          {panelData.vault}
        </p>
      </div>

      {/* Widget 5: Standalone Rumor Checker (Verify News) */}
      <div className="bg-black/60 backdrop-blur-xl border border-yellow-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.1)] relative overflow-hidden transition-all">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xs font-bold text-yellow-500 tracking-widest">RUMOR CHECK</h3>
        </div>

        {/* Input Field & Button */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={verifyInput}
            onChange={(e) => setVerifyInput(e.target.value)}
            placeholder="Type news or rumor to verify..."
            className="flex-1 bg-black/50 border border-yellow-500/20 rounded p-2 text-[10px] text-white font-mono placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
            onKeyDown={(e) => e.key === 'Enter' && handleVerifyNews()}
            disabled={isVerifying}
          />
          <button
            onClick={handleVerifyNews}
            disabled={isVerifying || !verifyInput}
            className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 p-2 rounded hover:bg-yellow-500/30 transition-all disabled:opacity-50 flex items-center justify-center w-8"
          >
            {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {/* Result Panel */}
        {verifyResult && (
          <div className={`mt-2 p-2 rounded border text-[10px] font-mono ${verifyResult.isVerified ? 'bg-green-900/30 border-green-500/30 text-green-300' : verifyResult.error ? 'bg-red-900/30 border-red-500/30 text-red-300' : 'bg-orange-900/30 border-orange-500/30 text-orange-400'}`}>
            {verifyResult.error ? (
              <span>{verifyResult.error}</span>
            ) : (
              <>
                <div className="flex items-center gap-1 mb-1">
                  {verifyResult.isVerified ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-orange-500" />}
                  <span className="font-bold">{verifyResult.isVerified ? 'VERIFIED' : 'UNVERIFIED'} [{verifyResult.confidenceScore}%]</span>
                </div>
                <span className="opacity-80">{verifyResult.verificationNote}</span>
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
}