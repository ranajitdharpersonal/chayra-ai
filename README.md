<div align="center">
  <img src="public/logo.png" alt="ChayRa AI Logo" width="120" style="filter: drop-shadow(0 0 20px rgba(220,38,38,0.8));" />
  <h1>ChayRa AI</h1>
  <br><p>
    <a href="https://chayra-ai.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Vercel-Live_Tactical_Demo-000000?style=for-the-badge&logo=vercel&logoColor=red" alt="Vercel Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/Status-Mission_Critical-ef4444?style=for-the-badge" alt="Mission Critical" />
    <img src="https://img.shields.io/badge/Swarm_Engine-3_Brains_|_7_Agents-8b5cf6?style=for-the-badge" alt="3 Brains & 7 Agents Swarm" />
    <img src="https://img.shields.io/badge/©_2026-Ranajit_Dhar-0ea5e9?style=for-the-badge" alt="Copyright Ranajit Dhar 2026" />
  </p>
  <p><em>Engineered by Ranajit Dhar • When the World Breaks, ChayRa Responds.</em></p>
</div>

---

## ⚡ Judge TL;DR (30-Second Overview)

**ChayRa AI is not just a chatbot. It is an autonomous, hyper-local crisis response swarm.**

We are building the ultimate digital safety net for zero-hour emergencies, turning **panicked, multilingual voice commands into coordinated survival intelligence.**

* **🎙️ Polyglot Voice-to-Action Protocol:** Built-in military-grade voice command processing. Victims can speak naturally in extreme stress (**100+ Local Languages**), and the system autonomously decodes, translates, and triggers the rescue swarm.
* 🗺️ **25km Tactical Routing (Navigator):** Automatically scans a 25km radius via OpenStreetMap to pinpoint verified hospitals, civilian shelters, or military bunkers, generating a secure evacuation route from the user's live location.
* ⚕️ **Live AI Triage (Medical Agent):** Instantly analyzes trauma context to generate life-saving first-aid steps and medication suggestions. Features a robust offline fallback lifeline protocol if connectivity drops.
* 🛡️ **Offline-First Mesh Network (Vault Agent):** Generates secure alphanumeric rescue beacons and autonomously instructs victims to utilize Bluetooth/WiFi Direct for peer-to-peer distress pings when traditional cell towers collapse.
* **🔌 3-Tier Auto-Failover Circuit Breaker:** Robust backend logic ensures that if the primary LLM brain fails or hallucinates, the system seamlessly falls back to a secondary module or a "Trust-User" default state(**Gemini 3 Pro` ➔ `Groq Llama 3` ➔ `HF Qwen**). False negatives are fatal in emergencies, so ChayRa guarantees uninterrupted execution.
* **📍 Tactical Pin Drop & Live GPS:** Victims can transmit their live location via secure GPS handshakes or utilize the "Drop Pin" feature on a tactical map when GPS is spoofed or compromised.
* 🔍 **Live Rumor Verification:** A dedicated intel search bar allows victims to instantly fact-check local news and dispel panic-inducing misinformation during the chaos of a crisis.
* **💻 Glassmorphism Tactical Console:** A premium, dark-themed, military-grade UI with dynamic glow states, real-time latency tracking, and autonomous agent processing indicators.

---

<div align="center">
  <h2>🌍 The Mission & Inspiration: Why build ChayRa AI?</h2>
</div>

> *Every year, millions are caught in the chaotic crossfire of natural disasters, wars, and humanitarian crises. In these zero-hour moments, the greatest enemy isn't just the disaster itself—**it is the delay of information, the collapse of networks, and paralyzing language barriers.***
> 
> *If a standard AI denies help because it "couldn't find recent news" about a hyper-local drone strike, that **false negative is fatal.***

<div align="center">
  <h3>💥 I refused to accept that. <i>I asked myself: "What if an AI system could act before panic spreads?"</i></h3>
</div>

* **What if** trapped civilians could instantly receive tactical evacuation routes?
* **What if** life-saving medical triage could be generated instantly, bypassing overloaded human dispatchers?
* **What if** a refugee could transmit distress signals in their native tongue and be understood flawlessly?

<div align="center">
  <br>
  <p>That vision became <b>ChayRa AI</b>. It is not just another conversational dashboard; it is an <b>autonomous multi-agent crisis response swarm</b> engineered to assist humanity during its most vulnerable seconds. From active threat detection to polyglot emergency broadcasting, every line of code serves one mission: protecting lives when traditional infrastructure fails.</p>
  
  <p>In a future where disasters are accelerating, intelligent coordination systems will become essential digital infrastructure.</p>
  
  <br><b>🛡️ I am not building AI for convenience. I am building AI for resilience.</b>
</div>

---

## 🚀 The Architecture: Autonomous Multi-Agent Swarm
Unlike traditional monolithic LLMs, ChayRa AI operates on a **Swarm Architecture**. It utilizes an Evaluator-Optimizer loop where specialized micro-agents communicate, verify, and execute critical tasks in parallel. 

### 🧠 The Core Agents (`src/core/agents/`)
1. **🛡️ MindGuard (The Firewall):** The gatekeeper. Prevents system abuse and features an **Omni-Disaster Fast-Pass**. It uses heuristic regex bypasses to instantly approve critical physical threats (bombings, earthquakes, tsunami) without waiting for slow news/API validations.
2. **🕵️‍♂️ Scavenger:** Extracts critical context, calculates the Threat Level (CRITICAL, HIGH, LOW), and tags required agents dynamically.
3. **📡 Radar:** Scans external environment APIs and environment parameters to establish the physical context of the crisis.
4. **⚖️ Verifier:** The Fact-Checker. Cross-references the victim's claim with Radar Intel to prevent hallucinations and establish an intelligence confidence score.
5. **🏥 Medical:** Generates immediate, life-saving triage protocols based on the extracted injury/disaster context.
6. **🗺️ Navigator:** Processes exact GPS coordinates or manual pin drops to map out tactical evacuation and routing protocols.
7. **🔒 Vault:** Manages secure identity and generates emergency beacons.

---

## 🧠 Autonomous Swarm Architecture Flow

The core of ChayRa AI relies on a highly specialized Evaluator-Optimizer loop. Here is the visual breakdown of our Multi-Agent Swarm execution:

```mermaid
graph TD
    %% Core Input
    User((👤 Victim Input <br> Voice/Text)) -->|Polyglot Decode| MG[🛡️ MindGuard Firewall]

    %% Firewall Logic
    MG -->|Spam / Prank| Deny[❌ Request Denied]
    MG -->|Omni-Disaster Bypass ⚡| Swarm{⚙️ Swarm Orchestrator}
    MG -->|Validated Crisis| Swarm

    %% Extraction
    Swarm --> Scav[🕵️‍♂️ Scavenger Agent <br> Extracts Threat Level]
    
    %% Parallel Processing
    Scav -->|Context| Radar[📡 Radar Agent <br> Scans Environment]
    Scav -->|Context| Verifier[⚖️ Verifier Agent <br> Fact-Checks Intel]
    
    Radar <-->|Cross-Reference| Verifier
    
    Scav -->|Coords| Nav[🗺️ Navigator Agent <br> Tactical Routing]
    Scav -->|Injury Data| Med[🏥 Medical Agent <br> Triage Protocols]
    Scav -->|Secure ID| Vault[🔒 Vault Agent <br> Key Generation]

    %% Final Output
    Verifier --> UI
    Nav --> UI
    Med --> UI
    Vault --> UI
    
    UI(((💻 Tactical Glassmorphism Console)))
    
    classDef firewall fill:#2d0909,stroke:#ef4444,stroke-width:2px,color:#fff;
    classDef core fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef agent fill:#022c22,stroke:#10b981,stroke-width:2px,color:#fff;
    
    class MG firewall;
    class Swarm,Scav core;
    class Radar,Verifier,Nav,Med,Vault agent;
```

## ⚙️ The Tech Stack & Directory Structure

ChayRa AI relies on a highly modular, serverless edge-optimized infrastructure. We bypassed monolithic designs for pure cloud-native speed and 100% uptime.

* **Frontend & Console:** ![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Leaflet](https://img.shields.io/badge/Leaflet_Maps-B91C1C?style=for-the-badge&logo=leaflet&logoColor=white)
* **The Intelligence Swarm (3-Tier):** ![Gemini Pro](https://img.shields.io/badge/Gemini_3_Pro-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white) ![Llama 3](https://img.shields.io/badge/Groq_Llama_3-F56565?style=for-the-badge) ![Qwen](https://img.shields.io/badge/HF_Qwen_2.5-FF9D00?style=for-the-badge)
* **Live Intel & Radar APIs:** ![Overpass API](https://img.shields.io/badge/Overpass_API_(OSM)-748B75?style=for-the-badge&logo=openstreetmap&logoColor=white) ![SerpAPI](https://img.shields.io/badge/SerpAPI_Live_Search-FFD700?style=for-the-badge&logo=google&logoColor=black)
* **Polyglot & Telemetry:** ![Voice API](https://img.shields.io/badge/Web_Audio_&_Voice-FF4444?style=for-the-badge&logo=webrtc&logoColor=white) ![Kyber-1024](https://img.shields.io/badge/Kyber_1024_Secured-4A00E0?style=for-the-badge&logo=springsecurity&logoColor=white)
* **Infrastructure:** ![Vercel](https://img.shields.io/badge/Vercel_Edge-000000?style=for-the-badge&logo=vercel&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### 📂 Core Directory Architecture

```text
📦 CHAYRA-AI
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 api              # Serverless Edge Endpoints (crisis-zones, swarm, verify, voice)
 ┃ ┃ ┣ 📜 globals.css      # Custom Tailwind & Glassmorphism styles
 ┃ ┃ ┣ 📜 layout.tsx       # Root Next.js layout structure
 ┃ ┃ ┗ 📜 page.tsx         # Main Command Center UI
 ┃ ┣ 📂 components         # UI Modules (ActionPanel, HelpBar, MapCore, MapWidget)
 ┃ ┣ 📂 core
 ┃ ┃ ┣ 📂 agents           # The Micro-Agents (medical, mindguard, navigator, radar, scavenger, vault, verifier, base.ts)
 ┃ ┃ ┗ 📂 brain            # Central LLM processing (brain.ts) & 3-Tier failover logic
 ┃ ┗ 📂 lib                # Shared utility functions (utils.ts)
 ┣ 📜 .env.local           # Master API Keys (Gemini, Groq, HF, SerpAPI)
 ┣ 📜 AGENTS.md            # Documentation for Agent prompts and behaviors
 ┗ 📜 package.json         # Project dependencies & scripts
```

---


## 🚀 Quick Start & Technical Verification (For Judges)

<div align="center">
  <br>
  <a href="https://chayra-ai.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Skip_Installation_&_Try_Live_Demo-Click_Here-000000?style=for-the-badge&logo=vercel" height="35" alt="Live Demo"/>
  </a>
  <br><br>
  <em>Note: Judges can test the system's full polyglot voice capabilities and swarm intelligence directly via the Live Edge URL above.<br>This section is strictly for open-source technical verification.</em>
</div>

### 1. Clone & Install
```bash
git clone [https://github.com/ranajitdharpersonal/chayra-ai.git](https://github.com/ranajitdharpersonal/chayra-ai.git)
cd chayra-ai
npm install
```

### 2. The Master Keys (`.env.local`)
To ignite the 3-Brain Swarm locally, create a `.env.local` file and configure the following environment variables:

```env
GEMINI_API_KEY=your_primary_brain_key
GROQ_API_KEY=your_llama3_failover_key
HF_TOKEN=your_survival_key
SERPAPI_API_KEY=live_rumor_verification_key
# Note: Overpass API (OpenStreetMap) is used for routing and does not require an API key!
```

### 3. Ignite the Engine
```Bash
npm run dev
```

---

## 👨‍💻 The Architect

**Ranajit Dhar**
* *AI & Multi-Agent Systems Architect | Pioneering Autonomous Crisis Response*
* **Copyright (c) 2026 Ranajit Dhar.**

**⭐ Final Note:**
> ChayRa AI is not just a tool; it is a proof-of-concept for a future where humanity is protected by intelligent, autonomous swarms when traditional infrastructure collapses. 
> <br><br>**Welcome to the next generation of crisis response.**
