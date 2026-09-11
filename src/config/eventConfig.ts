export interface EventRule {
  title?: string;
  description: string;
}

export interface EventItem {
  id: string;
  name: string;
  category: 'Technical' | 'Non-Technical';
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  iconName: 'FileCode2' | 'Terminal' | 'BrainCircuit' | 'Rocket';
  badge: string;
  rules: string[];
  eligibility: string;
  teamSize: string;
  duration: string;
  venue?: string;
  importantInstructions?: string[];
  registrationLink: string;
}

export interface Coordinator {
  role: string;
  name: string;
  phone: string;
  email: string;
}

export interface PrizeItem {
  place: string;
  title: string;
  reward: string;
  perks: string[];
}

export interface AnnouncementConfig {
  enabled: boolean;
  message: string;
  badgeText: string;
  actionText?: string;
  actionUrl?: string;
}

export interface EventConfig {
  collegeName: string;
  collegeSubtitle: string;
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

  announcement: AnnouncementConfig;

  events: EventItem[];

  // Configurable prizes array: if empty, the UI section gracefully hides
  prizes: PrizeItem[];

  coordinators: Coordinator[];
  officialEmail: string;

  socials: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export const eventConfig: EventConfig = {
  collegeName: "Prathyusha Engineering College",
  collegeSubtitle: "(An Autonomous Institution)",
  location: "Aranvoyal Kuppam, Tiruvallur",
  collegeCoords: {
    lat: "13.0827° N",
    lng: "80.2707° E"
  },

  eventName: "SYNTRIX'26",
  eventEdition: "2026",
  eventTheme: "Celebration of Software Freedom Day & International Innovation Day",
  eventTagline: "YOUR NEXT MISSION AWAITS",

  date: "2026-09-18",
  displayDate: "18-09-2026",
  day: "Friday",
  time: "09:00 AM",
  venue: "Seminar Hall",

  countdownDate: "2026-09-18T09:00:00",

  googleFormUrl: "YOUR_GOOGLE_FORM_LINK_HERE",

  announcement: {
    enabled: true,
    message: "MISSION DETECTED: SYNTRIX'26 REGISTRATIONS PREPARING FOR LAUNCH",
    badgeText: "TRANSMISSION LIVE",
    actionText: "VIEW MISSIONS",
    actionUrl: "#events"
  },

  events: [
    {
      id: "paper-404",
      name: "PAPER 404",
      category: "Technical",
      tagline: "Research Paradigm & Tech Symposium",
      shortDescription: "A flagship technical paper symposium challenging crewmates to present innovative computing paradigms, algorithms, and architectures.",
      fullDescription: "PAPER 404 is the premier technical symposium of SYNTRIX'26. Crewmates present original research and engineering proposals addressing emerging technological frontiers, open-source innovations, artificial intelligence, and cybersecurity.",
      iconName: "FileCode2",
      badge: "SECTOR: RESEARCH",
      rules: [], // User will provide specific rules; component gracefully shows placeholder
      eligibility: "Open to all engineering & technology students",
      teamSize: "1 - 3 Crewmates",
      duration: "10 mins presentation + 5 mins Q&A",
      venue: "Seminar Hall - Track A",
      importantInstructions: [
        "Participants must bring their presentations in PPT/PDF format on a flash drive.",
        "Plagiarism above acceptable limits will result in immediate disqualification.",
        "Strict adherence to the 10-minute presentation limit is enforced."
      ],
      registrationLink: "YOUR_GOOGLE_FORM_LINK_HERE"
    },
    {
      id: "prompt-craft",
      name: "PROMPT CRAFT",
      category: "Technical",
      tagline: "AI Orchestration & Prompt Engineering",
      shortDescription: "Master generative AI protocols. Formulate precision prompts to solve algorithmic anomalies and design computational solutions.",
      fullDescription: "PROMPT CRAFT puts your AI steering capabilities to the test. Crewmates interact with advanced generative models to solve riddles, produce targeted logic, synthesize code, and unlock multi-stage prompt challenges under time pressure.",
      iconName: "Terminal",
      badge: "SECTOR: GEN-AI",
      rules: [],
      eligibility: "Open to all departments and skill levels",
      teamSize: "1 - 2 Crewmates",
      duration: "60 Minutes",
      venue: "Computer Lab 3",
      importantInstructions: [
        "Systems with designated AI interface access will be provided.",
        "Use of unauthorized external tabs or search engines is strictly monitored by telemetry.",
        "Scoring is evaluated based on output accuracy, iteration speed, and token efficiency."
      ],
      registrationLink: "YOUR_GOOGLE_FORM_LINK_HERE"
    },
    {
      id: "ai-case-file",
      name: "AI CASE FILE",
      category: "Technical",
      tagline: "Forensic Data & Algorithmic Investigation",
      shortDescription: "A cyber-investigation mission. Analyze anomalous datasets, identify model vulnerabilities, and resolve critical digital mysteries.",
      fullDescription: "AI CASE FILE is a thrilling tech detective challenge. A catastrophic data breach and corrupted neural model threaten the station. Your team must inspect logs, identify bias or hallucination vectors, trace illicit pipelines, and submit the final forensic dossier.",
      iconName: "BrainCircuit",
      badge: "SECTOR: CYBER & ML",
      rules: [],
      eligibility: "Open to all undergraduate tech students",
      teamSize: "2 - 3 Crewmates",
      duration: "90 Minutes",
      venue: "Data Center Lab",
      importantInstructions: [
        "Teams will be granted access to simulated server logs and model checkpoints.",
        "All investigative findings must be summarized in the digital case dossier.",
        "Collaboration across teams is considered sabotage."
      ],
      registrationLink: "YOUR_GOOGLE_FORM_LINK_HERE"
    },
    {
      id: "crazy-pitch",
      name: "CRAZY PITCH",
      category: "Non-Technical",
      tagline: "Disruptive Ideation & Pitch Showdown",
      shortDescription: "The ultimate ideation and persuasive showdown. Pitch eccentric, unorthodox, and wildly innovative concepts with theatrical flair.",
      fullDescription: "CRAZY PITCH unleashes pure creative adrenaline. Ever wondered how to pitch teleportation for pizzas or AI-powered umbrellas for astronauts? Convince our panel of venture judges with compelling rhetoric, outrageous mockups, and razor-sharp market logic.",
      iconName: "Rocket",
      badge: "SECTOR: INNOVATION",
      rules: [],
      eligibility: "Open to all students from any discipline",
      teamSize: "2 - 4 Crewmates",
      duration: "5 mins pitch + 3 mins jury interrogation",
      venue: "Main Auditorium",
      importantInstructions: [
        "Props, theatrical elements, and creative presentation decks are strongly encouraged.",
        "Ideas can be fictional or wildly futuristic, but internal pitch logic must be watertight.",
        "Audience response will contribute to the Innovation Score."
      ],
      registrationLink: "YOUR_GOOGLE_FORM_LINK_HERE"
    }
  ],

  // Left empty so the section automatically hides as required by the user prompt.
  // When prize data is added in the future, the UI will automatically render the rewards.
  prizes: [],

  coordinators: [
    {
      role: "Faculty Event Coordinator",
      name: "Department Faculty Coordinator",
      phone: "+91 9XXXXXXXXX",
      email: "syntrix26@prathyusha.edu.in"
    },
    {
      role: "Student Crew Lead",
      name: "Student Coordinator",
      phone: "+91 9XXXXXXXXX",
      email: "syntrix26@prathyusha.edu.in"
    }
  ],

  officialEmail: "syntrix26@prathyusha.edu.in",

  socials: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    website: "https://prathyusha.edu.in"
  }
};
