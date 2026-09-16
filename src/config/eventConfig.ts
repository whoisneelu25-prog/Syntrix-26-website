export interface EventRule {
  title?: string;
  description: string;
}

export interface EventItem {
  id: string;
  name: string;
  category: 'Technical' | 'Non-Technical';
  phase: 'Phase 1' | 'Phase 2';
  phaseNumber: 1 | 2;
  phaseTrack?: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  iconName: 'FileCode2' | 'Terminal' | 'BrainCircuit' | 'Rocket';
  badge: string;
  round: string;
  teamSize: string;
  duration: string;
  topic?: string;
  concept?: string;
  animatedTagline?: string;
  examplePrompts?: string[];
  rules: string[];
  eligibility?: string;
  venue?: string;
  registrationLink: string;
}

export interface Coordinator {
  role: string;
  name: string;
  phone: string;
  displayPhone: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  message: string;
  badgeText: string;
  actionText?: string;
  actionUrl?: string;
}

export interface PrizeItem {
  place: string;
  reward: string;
  perks?: string[];
}

export interface EventConfig {
  collegeName: string;
  collegeSubtitle: string;
  departmentName: string;
  departmentTitle: string;
  departmentShort: string;
  location: string;
  collegeCoords: {
    lat: string;
    lng: string;
  };
  eventName: string;
  eventEdition: string;
  eventTheme: string;
  eventTagline: string;
  
  date: string;
  displayDate: string;
  day: string;
  time: string;
  venue: string;
  countdownDate: string; // ISO 8601 format

  googleFormUrl: string;
  registrationLink: string;

  announcement: AnnouncementConfig;

  events: EventItem[];

  prizes: PrizeItem[];

  coordinators: Coordinator[];
}

export const OFFICIAL_REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScPt36IAj0Zghi8N28lhx7fcman_dblQ3AZkDM1Ql8ewN8cJQ/viewform";

export const eventConfig: EventConfig = {
  collegeName: "PRATHYUSHA ENGINEERING COLLEGE",
  collegeSubtitle: "(AN AUTONOMOUS INSTITUTION)",
  departmentName: "DEPARTMENT OF ARTIFICIAL INTELLIGENCE AND DATA SCIENCE",
  departmentTitle: "Department of Artificial Intelligence and Data Science",
  departmentShort: "AI & DS",
  location: "ARANVOYAL KUPPAM, TIRUVALLUR",
  collegeCoords: {
    lat: "13.0827° N",
    lng: "80.2707° E"
  },

  eventName: "SYNTRIX'26",
  eventEdition: "2026",
  eventTheme: "CELEBRATION OF SOFTWARE FREEDOM DAY & INTERNATIONAL INNOVATION DAY",
  eventTagline: "YOUR NEXT MISSION AWAITS",

  date: "2026-09-18",
  displayDate: "18-09-2026",
  day: "FRIDAY",
  time: "9:00 AM",
  venue: "AI&DS BLOCK",

  countdownDate: "2026-09-18T09:00:00",

  googleFormUrl: OFFICIAL_REGISTRATION_URL,
  registrationLink: OFFICIAL_REGISTRATION_URL,

  announcement: {
    enabled: true,
    message: "MISSION DETECTED: SYNTRIX'26 REGISTRATION CONSOLE IS ONLINE // PHASE 1 & PHASE 2 ACTIVE",
    badgeText: "TRANSMISSION LIVE",
    actionText: "ENTER THE MISSION",
    actionUrl: "#events"
  },

  events: [
    {
      id: "paper-404",
      name: "PAPER 404",
      category: "Technical",
      phase: "Phase 1",
      phaseNumber: 1,
      phaseTrack: "PHASE 1 // RESEARCH & PRESENTATION",
      subtitle: "Technical Presentation Challenge",
      tagline: "DECODE IDEAS. REWRITE POSSIBILITIES.",
      shortDescription: "Deliver an original, high-impact technical presentation on the announced domain.",
      fullDescription: "PAPER 404 is the premier technical symposium track of SYNTRIX'26 Phase 1. Teams deliver an original, plagiarism-free technical presentation demonstrating sound technical knowledge, innovation, and relevance.",
      iconName: "FileCode2",
      badge: "PHASE 1: RESEARCH",
      round: "Single Round",
      teamSize: "2–3 members",
      duration: "4 mins per team",
      topic: "TOPIC WILL BE ANNOUNCED SOON",
      venue: "AI&DS Block",
      rules: [
        "Presentation must be original and plagiarism-free.",
        "All team members must participate.",
        "PPT/presentation materials may be used as permitted by organizers.",
        "Evaluation: Technical Knowledge + Innovation + Relevance + Presentation.",
        "Exceeding the time limit may result in score deduction."
      ],
      registrationLink: OFFICIAL_REGISTRATION_URL
    },
    {
      id: "crazy-startup",
      name: "CRAZY PITCH",
      category: "Non-Technical",
      phase: "Phase 1",
      phaseNumber: 1,
      phaseTrack: "PHASE 1 // RAPID IDEATION & PITCH",
      subtitle: "On-the-Spot Startup Pitch",
      tagline: "BOLD IDEAS. BIGGER IMPACT.",
      shortDescription: "Take a completely random, absurd topic on the spot and pitch it like the next billion-dollar unicorn.",
      fullDescription: "CRAZY PITCH is an adrenaline-charged Phase 1 ideation challenge. You will receive an unexpected, absurd topic on the spot. Your mission: turn it into a crazy startup concept and pitch it like it is the next billion-dollar company.",
      concept: "Take a completely random topic and turn it into a crazy startup idea. Pitch it like it is the next billion-dollar company.",
      animatedTagline: "MAKE THE IMPOSSIBLE SOUND INVESTABLE.",
      topic: "A RANDOM, ABSURD OR UNEXPECTED TOPIC WILL BE GIVEN ON THE SPOT.",
      examplePrompts: [
        "A Wi-Fi enabled water bottle.",
        "A chair that gives career advice.",
        "A smart umbrella for indoor use.",
        "A subscription service for borrowing friends.",
        "A startup for people who hate weekends."
      ],
      iconName: "Rocket",
      badge: "PHASE 1: INNOVATION",
      round: "Single Round",
      teamSize: "2 members (Duo)",
      duration: "5 mins",
      venue: "AI&DS Block",
      rules: [
        "No mobile phones, laptops, internet, PPT, or AI tools.",
        "Be creative, crazy, funny, or completely absurd.",
        "Offensive or inappropriate content is not allowed.",
        "Malpractice leads to disqualification."
      ],
      registrationLink: OFFICIAL_REGISTRATION_URL
    },
    {
      id: "promptcraft",
      name: "PROMPT CRAFT",
      category: "Technical",
      phase: "Phase 2",
      phaseNumber: 2,
      phaseTrack: "PHASE 2 // GENERATIVE PROMPT CRAFT",
      subtitle: "AI Prompt Engineering Challenge",
      tagline: "IDEAS IN. INNOVATION OUT.",
      shortDescription: "Formulate high-precision AI prompts to generate targeted outputs with zero manual post-editing.",
      fullDescription: "PROMPT CRAFT puts your AI prompt orchestration skills to the test in Phase 2. Formulate powerful, creative, and strictly constrained prompts to guide models to target results accurately and creatively without manual modifications.",
      iconName: "Terminal",
      badge: "PHASE 2: GEN-AI",
      round: "Single Round",
      teamSize: "2 members (Duo)",
      duration: "65 mins",
      venue: "AI&DS Block",
      rules: [
        "Create effective prompts based on the given task.",
        "Submit the final prompt along with its generated output.",
        "No manual editing of the generated output.",
        "Copying another team's prompt/output is prohibited.",
        "Evaluation: Prompt Quality + Accuracy + Creativity + Output Quality.",
        "Malpractice or violation of the rules leads to disqualification."
      ],
      registrationLink: OFFICIAL_REGISTRATION_URL
    },
    {
      id: "ai-case-file",
      name: "AI CASE FILE",
      category: "Technical",
      phase: "Phase 2",
      phaseNumber: 2,
      phaseTrack: "PHASE 2 // CYBER FORENSICS",
      subtitle: "AI-Based Mystery & Investigation",
      tagline: "ANALYZE. SOLVE. UNLOCK.",
      shortDescription: "Solve the digital anomaly using clues and evidence provided under timed conditions.",
      fullDescription: "AI CASE FILE is an intense Phase 2 cyber-investigation challenge. A suspicious anomaly threatens the dropship mission telemetry. Your team must inspect the clues and evidence provided, identify the root cause, and submit the final forensic verdict with solid reasoning.",
      iconName: "BrainCircuit",
      badge: "PHASE 2: FORENSICS",
      round: "Single Round",
      teamSize: "2–3 members",
      duration: "65 mins",
      venue: "AI&DS Block",
      rules: [
        "Solve the case using the clues and evidence provided.",
        "Use only the materials given during the event.",
        "Mobile phones, internet, AI tools, and outside help are not allowed.",
        "Submit the final answer with brief reasoning/evidence.",
        "Sharing answers or clues with other teams is prohibited.",
        "Fastest valid submission wins in case of a tie.",
        "Malpractice leads to disqualification."
      ],
      registrationLink: OFFICIAL_REGISTRATION_URL
    }
  ],

  prizes: [],

  coordinators: [
    {
      role: "EVENT COORDINATOR",
      name: "Datshin Kumar",
      phone: "7845390496",
      displayPhone: "7845390496"
    },
    {
      role: "EVENT COORDINATOR",
      name: "Monisha J",
      phone: "+918248078959",
      displayPhone: "+91 82480 78959"
    },
    {
      role: "EVENT COORDINATOR",
      name: "VC Neeleash",
      phone: "7395989526",
      displayPhone: "7395989526"
    },
    {
      role: "STAFF COORDINATOR",
      name: "Ms. Sivaganga",
      phone: "+917530022365",
      displayPhone: "+91 75300 22365"
    }
  ]
};

