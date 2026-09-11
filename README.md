# SYNTRIX'26 — Official Event Website
**Prathyusha Engineering College (An Autonomous Institution)**  
*Celebration of Software Freedom Day & International Innovation Day*

---

## 🚀 Overview

**SYNTRIX'26** is an immersive, production-ready event website designed with an interactive **Among Us-inspired mission experience** transitioning into a futuristic, cyberpunk HUD college tech symposium portal.

### ✨ Key Features

1. **4-Phase Among Us Cinematic Mission Opening**:
   - **Phase 1**: Deep space particle canvas, original vector crewmate float-in, and glowing typography: *"AMONG US"* → *"A NEW MISSION HAS BEEN ASSIGNED"*.
   - **Phase 2**: Terminal docking scan with real-time log telemetry (`CREWMATE DETECTED`, `MISSION FOUND`, `SYSTEM ONLINE`, `INITIALIZING...`).
   - **Phase 3**: Holographic transformation into **SYNTRIX'26** branding with date, time, venue, and college credentials.
   - **Phase 4**: Smooth iris/airlock decompression transition into the main hero experience.
   - **Skip & Accessibility**: "SKIP INTRO →" button, `sessionStorage` memory (so subsequent reloads within the session bypass the intro), and full `prefers-reduced-motion` compliance.

2. **Centralized Dynamic Configuration (`src/config/eventConfig.ts`)**:
   - Every single event parameter is editable from this single file:
     - College name, subtitle, location, and GPS coordinates
     - Event date, time, venue, and countdown timestamp
     - Google Form URLs (global + per-event override capability)
     - 4 Events (**PAPER 404**, **PROMPT CRAFT**, **AI CASE FILE**, **CRAZY PITCH**) with rules, descriptions, team sizes, eligibility, and duration
     - Announcement banner configuration (auto-hides when empty or disabled)
     - Prize rewards structure (auto-hides when empty, renders when populated)
     - Faculty and Student Coordinator details

3. **Safe Google Form Link Handling**:
   - When registration links are set to `"YOUR_GOOGLE_FORM_LINK_HERE"`, the site does not break or show 404s. Instead, it displays a high-tech "Registration Portal Opening Soon" status modal with instructions and an email action.
   - When valid URLs are supplied, it seamlessly opens the Google Form in a new tab.

4. **Procedural Web Audio Synthesizer (`src/lib/soundEffects.ts`)**:
   - Subtle sci-fi ambient drone, radar pings, and button click sounds generated 100% via the browser Web Audio API (zero external audio assets, zero copyright risks).
   - Includes an audio toggle `[🔊 / 🔇]` in the sticky HUD navigation bar.

5. **Live 1-Second Precision Countdown**:
   - Targets **18 September 2026, 09:00 AM IST**.
   - Dynamically tracks DAYS, HOURS, MINUTES, and SECONDS.
   - Dynamic states: "COUNTDOWN TO LAUNCH", "MISSION IN PROGRESS", and "MISSION COMPLETE".

6. **Interactive Missions & Detail Modals**:
   - Event cards with 3D hover effects, telemetry chips, category badges (Technical / Non-Technical), and original crewmate miniature badges.
   - "VIEW INTEL" modal showing complete dossiers, instructions, rules, and register buttons.
   - Deep linking support (`?event=paper-404`).

7. **Crewmate Rulebook Accordion**:
   - Futuristic mission handbook with expandable dossiers for each event.
   - Automatically renders formatted rules or displays "Rules will be revealed soon... Stand by for telemetry transmission."

8. **Official Digital Poster Showcase**:
   - Interactive modal presenting the official event poster layout with print and save capabilities.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript with strict typing (`verbatimModuleSyntax`)
- **Styling**: Tailwind CSS with custom neon cyan, electric blue, purple, magenta, and space dark tokens
- **Motion & Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Audio**: Web Audio API Procedural Synthesizer

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
```

### Running Locally
```bash
# Start the local development server
npm run dev
```
Visit `http://localhost:5173` in your browser.

### Building for Production
```bash
# Compile TypeScript and bundle production assets with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ Updating Event Information

To update any text, rules, coordinator details, or Google Form links, open:
`src/config/eventConfig.ts`

### Adding Google Form Links
Replace `"YOUR_GOOGLE_FORM_LINK_HERE"` with your actual Google Form URL:
```typescript
googleFormUrl: "https://forms.gle/your-actual-form-link",
```

### Adding Rules to an Event
Locate the event in `eventConfig.events` and populate the `rules` array:
```typescript
{
  id: "paper-404",
  name: "PAPER 404",
  rules: [
    "Abstract submissions must be within 300 words.",
    "Maximum team size is 3 members.",
    "Presentation time is strictly 10 minutes + 5 minutes Q&A."
  ],
  ...
}
```

### Adding Prize Amounts
In `eventConfig.ts`, populate `prizes`:
```typescript
prizes: [
  {
    place: "1ST PRIZE",
    title: "Champion Crewmate",
    reward: "Cash Prize & Trophy",
    perks: ["Gold Certificate", "Direct Finalist Entry"]
  }
]
```
*(If `prizes: []` is empty, the section automatically remains hidden!)*

---

## 🛡️ License & Credits

Hosted by **Prathyusha Engineering College (An Autonomous Institution)**, Aranvoyal Kuppam, Tiruvallur.  
Created for **SYNTRIX'26** in celebration of **Software Freedom Day & International Innovation Day**.
