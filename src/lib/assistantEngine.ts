import { ChatAction } from "../types";

export interface AssistantResponse {
  text: string;
  suggestions: string[];
  actions?: ChatAction[];
}

export const QUICK_PROMPTS = [
  {
    category: "About Mahin",
    icon: "User",
    prompt: "Who is Shadat Hossain Mahin and what is his background?"
  },
  {
    category: "Wet Processing",
    icon: "FlaskConical",
    prompt: "What is Mahin's academic specialization in Wet Processing & Dyeing?"
  },
  {
    category: "Materials & Composites",
    icon: "Layers",
    prompt: "Tell me about his research interests in Composite & Advanced Materials."
  },
  {
    category: "Bacterial Cellulose",
    icon: "Sparkles",
    prompt: "What research has Mahin explored in Bacterial Cellulose and bio-based materials?"
  },
  {
    category: "Aerospace Interest",
    icon: "Cpu",
    prompt: "How is Mahin connecting Textile Engineering to Aerospace Materials?"
  },
  {
    category: "MATLAB & Tools",
    icon: "Code",
    prompt: "What computational tools, software, and certifications does Mahin use?"
  },
  {
    category: "Contact & Collab",
    icon: "Mail",
    prompt: "How can I get in touch with Mahin for research or collaboration?"
  }
];

export function getAssistantResponse(rawInput: string): AssistantResponse {
  const query = rawInput.trim().toLowerCase();

  // 1. GREETINGS, INTRODUCTIONS & "WHO IS MAHIN" (Section 16 FAQ 1 & Section 17)
  if (
    query.match(/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|hola|sup|yo)\b/) ||
    query === "who are you" ||
    query.includes("what can you do") ||
    query.includes("who is mahin") ||
    query.includes("who is shadat") ||
    query.includes("introduce mahin") ||
    query.includes("introduction") ||
    query.includes("tell me about yourself") ||
    query.includes("tell me about mahin")
  ) {
    return {
      text: "👋 **Shadat Hossain Mahin** is a final-year Textile Engineering student specializing in **Wet Processing**.\n\nHis interests extend beyond conventional textile engineering into **composite materials**, **bio-based materials**, **sustainable engineering**, and **aerospace materials**. He is particularly interested in research involving **bacterial cellulose**, sustainable composites, advanced materials, and computational approaches such as **MATLAB**.\n\n• **Academic Status:** Final-Year B.Sc. in Textile Engineering (CGPA ~3.80 / 4.00)\n• **Institution:** University of Scholars, Dhaka, Bangladesh\n• **Core Focus:** Dyeing Chemistry, Composite Materials, Bio-based Materials & Advanced Materials Engineering",
      suggestions: [
        "What does Mahin study?",
        "What are Mahin's main research interests?",
        "Is Mahin interested in aerospace engineering?",
        "How can I contact Mahin?"
      ],
      actions: [
        { label: "View Experience", action: "scroll_experience", icon: "Briefcase" },
        { label: "View Research Projects", action: "scroll_projects", icon: "Workflow" }
      ]
    };
  }

  // 2. ONE-LINE IDENTITY / PROFILE POSITIONING (Section 12 & 18)
  if (
    query.includes("one line") ||
    query.includes("tagline") ||
    query.includes("headline") ||
    query.includes("positioning") ||
    query.includes("in short") ||
    query.includes("elevator pitch")
  ) {
    return {
      text: "📌 **One-Line Professional Identity:**\n\n> *\"Final-year Textile Engineering student specializing in Wet Processing, exploring Composite Materials, Bio-based Materials, Sustainable Engineering, and Aerospace Applications.\"*",
      suggestions: [
        "Tell me about his Wet Processing background",
        "Explain his research in composite materials",
        "What are his career goals?"
      ],
      actions: [
        { label: "View Projects", action: "scroll_projects", icon: "Workflow" }
      ]
    };
  }

  // 3. WHAT DOES MAHIN STUDY / ACADEMIC BACKGROUND (Section 2 & Section 16 FAQ 2)
  if (
    query.includes("what does mahin study") ||
    query.includes("what do you study") ||
    query.includes("education") ||
    query.includes("degree") ||
    query.includes("university") ||
    query.includes("cgpa") ||
    query.includes("grade") ||
    query.includes("scholars") ||
    query.includes("academic background") ||
    query.includes("academic status")
  ) {
    return {
      text: "🎓 **Academic Background & Status:**\n\nMahin is a **final-year B.Sc. Textile Engineering student** at the **University of Scholars**, Dhaka, Bangladesh.\n\n• **Major/Specialization:** Wet Processing & Dyeing Chemistry\n• **Academic Performance:** CGPA approximately **3.80 / 4.00**\n• **Academic Focus:** Textile wet processing, dyeing chemistry, fiber & fabric testing, sustainable textile processing, composite materials, bio-based materials, and experimental material characterization.\n\n• **Previous Education:**\n  - Higher Secondary Certificate (HSC) in Science (Barishal Board, 2022)\n  - Secondary School Certificate (SSC) in Science (Barishal Board, 2020)",
      suggestions: [
        "What is his Wet Processing specialization?",
        "What are his research interests?",
        "What computational tools does he use?"
      ],
      actions: [
        { label: "View Education Timeline", action: "scroll_experience", icon: "GraduationCap" },
        { label: "Download Resume", action: "download_cv", icon: "FileText" }
      ]
    };
  }

  // 4. WET PROCESSING & DYEING CHEMISTRY (Section 3 - Textile Engineering)
  if (
    query.includes("wet process") ||
    query.includes("dyeing") ||
    query.includes("reactive dye") ||
    query.includes("scouring") ||
    query.includes("bleaching") ||
    query.includes("coloration") ||
    query.includes("finishing") ||
    query.includes("textile testing") ||
    query.includes("fiber analysis") ||
    query.includes("fabric analysis") ||
    query.includes("textile chemistry")
  ) {
    return {
      text: "🧪 **Textile Wet Processing & Dyeing Chemistry:**\n\nMahin's core academic specialization within Textile Engineering includes:\n\n• **Dyeing Chemistry & Coloration:** Exhaustion reactive dyeing, dye-fiber covalent fixation mechanisms, trichromatic dye formulations, and fastness optimization.\n• **Pretreatment & Finishing:** Alkaline scouring (lignin & wax removal), hydrogen peroxide bleaching, bio-polishing, and sustainable low-temperature processes.\n• **Textile Testing & Characterization:** Fiber and fabric morphological analysis, liquor ratio calculations, wash/rubbing/perspiration fastness testing, and spectrophotometric evaluation.\n• **Sustainable Wet Processing:** Cleaner production strategies, reduction of thermal energy expenditure, and eco-friendly chemical alternatives.",
      suggestions: [
        "Tell me about Jute Fabric Dyeing at 50°C",
        "What research on sustainable dyeing in Bangladesh?",
        "How does wet processing connect to composite materials?"
      ],
      actions: [
        { label: "View Dyeing Projects", action: "scroll_projects", icon: "FlaskConical" }
      ]
    };
  }

  // 5. COMPOSITE MATERIALS & STRUCTURES (Section 3 - Composite Materials & Section 4)
  if (
    query.includes("composite") ||
    query.includes("natural fiber composite") ||
    query.includes("hybrid composite") ||
    query.includes("fiber-reinforced") ||
    query.includes("polymer-based") ||
    query.includes("cfrp") ||
    query.includes("lightweight") ||
    query.includes("characterization") ||
    query.includes("mechanical propert")
  ) {
    return {
      text: "🔬 **Composite Materials Research Interests:**\n\nMahin is interested in understanding advanced and sustainable composite systems:\n\n• **Structural Architectures:** 3D woven, braided, and unidirectional fiber architectures.\n• **Natural-Fiber & Hybrid Composites:** Utilizing plant fibers (such as jute) and bio-based reinforcements for eco-friendly engineering composites.\n• **High-Performance Fiber Composites:** Polymer-matrix composites and Carbon Fiber Reinforced Polymers (CFRP).\n• **Mechanical Characterization:** Understanding tensile, flexural, impact tolerance, and Compression After Impact (CAI) behavior under uncertainty.\n• **Application Goals:** Exploring lightweight, sustainable materials for structural, industrial, and high-performance applications.",
      suggestions: [
        "Tell me about the 3D Woven Composites simulation project",
        "How is this applied to Aerospace materials?",
        "What bio-based materials does he research?"
      ],
      actions: [
        { label: "View Composite Projects", action: "scroll_projects", icon: "Layers" }
      ]
    };
  }

  // 6. BIO-BASED MATERIALS & BACTERIAL CELLULOSE (Section 3, 4 & 5 - Thesis/Research Direction)
  if (
    query.includes("bio-based") ||
    query.includes("biobased") ||
    query.includes("bacterial cellulose") ||
    query.includes("cellulose") ||
    query.includes("kombucha") ||
    query.includes("pineapple") ||
    query.includes("fermentation") ||
    query.includes("sustainable material") ||
    query.includes("biodegradable") ||
    query.includes("thesis")
  ) {
    return {
      text: "🌱 **Bio-Based Materials & Bacterial Cellulose Research:**\n\nMahin's research direction centers on developing sustainable materials from biological and renewable sources:\n\n• **Bacterial Cellulose Production:** Investigating fermentation methods for bacterial cellulose synthesis, including biological sources such as kombucha-derived cultures.\n• **Waste-Derived Substrates (Proposed Concept):** Exploring experimental concepts such as utilizing pineapple peel as a low-cost, waste-derived substrate to obtain fermentable sugars for sustainable bacterial cellulose growth.\n• **Bio-Composites Development:** Investigating nanostructured cellulose matrices for mechanical property reinforcement and biodegradable material systems.\n• **Future Research Goal:** Investigating how bio-based materials and sustainable composite technologies can contribute to lightweight, high-performance engineering applications.\n\n*(Note: Clear distinction is maintained between explored concepts, ongoing investigations, and proposed experimental directions.)*",
      suggestions: [
        "What are his overall research interests?",
        "How could bio-based materials be used in aerospace?",
        "What tools does he use for research?"
      ],
      actions: [
        { label: "Explore Research Direction", action: "scroll_projects", icon: "Sparkles" }
      ]
    };
  }

  // 7. AEROSPACE INTEREST & TRANSITION (Section 6 & Section 16 FAQ 4)
  if (
    query.includes("aerospace") ||
    query.includes("aircraft") ||
    query.includes("aviation") ||
    query.includes("space") ||
    query.includes("transition")
  ) {
    return {
      text: "✈️ **Interdisciplinary Aerospace Materials Direction:**\n\nMahin is a **Textile Engineering student developing an interdisciplinary pathway toward advanced materials and aerospace engineering**.\n\n• **Core Connection:** His aerospace interest is centered on **materials and structures** (such as lightweight composite architectures, CFRP, bio-based composites, and sustainable high-performance materials) rather than piloting or flight operations.\n• **Areas of Interest:**\n  - Aerospace structures & lightweight materials\n  - Composite damage tolerance and impact resistance\n  - Digital Twin concepts & computational materials simulation\n  - Sustainable bio-composites for next-generation aerospace components\n\n*(Note: Mahin is building an academic foundation in materials science and simulation to prepare for postgraduate studies in advanced materials and aerospace-related fields.)*",
      suggestions: [
        "Tell me about the 3D Woven Composites simulation",
        "What is Mahin's career goal?",
        "What computational tools does he use?"
      ],
      actions: [
        { label: "View Research Dossier", action: "scroll_projects", icon: "Cpu" }
      ]
    };
  }

  // 8. 3D WOVEN COMPOSITES SIMULATION FRAMEWORK (Project)
  if (
    query.includes("3d woven") ||
    query.includes("probabilistic") ||
    query.includes("simulation framework") ||
    query.includes("monte carlo") ||
    query.includes("cai") ||
    query.includes("digital twin")
  ) {
    return {
      text: "📊 **Probabilistic Simulation Framework for 3D Woven Composites:**\n\nAn engineering research framework investigating the link between textile architecture, manufacturing process defects, and structural performance under uncertainty:\n\n• **Textile Architecture Parameters:** Evaluated fiber volume fractions, yarn waviness, and weave geometries.\n• **Defect Prediction Modeling:** Modeled void fractions and resin-rich regions with calibrated defect models.\n• **Monte Carlo Simulation (N=3000):** Predicted Compression After Impact (CAI) strength distributions and benchmarked against experimental aerospace literature.\n• **Significance:** Demonstrates how textile engineering architectures directly govern high-performance structural reliability in advanced composites.",
      suggestions: [
        "What software was used for this simulation?",
        "Tell me about his MATLAB proficiency",
        "View Project Gallery"
      ],
      actions: [
        { label: "View Simulation Details", action: "scroll_projects", icon: "Workflow" }
      ]
    };
  }

  // 9. COURSES & ADDITIONAL LEARNING (Section 10)
  if (
    query.includes("course") ||
    query.includes("training") ||
    query.includes("certification") ||
    query.includes("additional learning") ||
    query.includes("aircraft introduction") ||
    query.includes("fashion design course") ||
    query.includes("matlab onramp")
  ) {
    return {
      text: "📚 **Courses & Additional Learning:**\n\nMahin has completed the following additional learning activities to build an interdisciplinary engineering foundation:\n\n• **Aerospace Engineering: Aircraft Introduction**\n  - *Status:* Completed\n  - *Field:* Aerospace Engineering\n  - *Focus:* Fundamental concepts of aircraft and introductory aerospace engineering.\n  - *Impact:* Directly supports Mahin's growing interest in Aerospace Engineering, particularly **Aerospace Materials, Composite Structures, and Aircraft Structures**.\n\n• **MATLAB Onramp**\n  - *Status:* Completed (February 2026)\n  - *Institution:* MathWorks\n  - *Focus:* Fundamentals of MATLAB and computational problem-solving, matrix manipulation, technical data analysis, and engineering calculations.\n\n• **Fashion Design**\n  - *Status:* Completed (2024, 3-Month Short Course)\n  - *Institution:* University of Scholars\n  - *Focus:* Fundamentals of fashion design, apparel construction principles, and commercial design concepts.\n\nThese courses complement Mahin's Textile Engineering background and demonstrate his interdisciplinary approach combining **Textile Engineering, Materials Science, Computational Engineering, and Aerospace Engineering**.",
      suggestions: [
        "How is Mahin connecting Textile Engineering to Aerospace?",
        "What computational tools does he use?",
        "What are his research interests?"
      ],
      actions: [
        { label: "View Certificates", action: "view_certificate", icon: "Award" },
        { label: "View Research Projects", action: "scroll_projects", icon: "Workflow" }
      ]
    };
  }

  // 10. COMPUTATIONAL & SOFTWARE SKILLS / MATLAB (Section 7, 8 & Section 16 FAQ 6)
  if (
    query.includes("matlab") ||
    query.includes("software") ||
    query.includes("computational") ||
    query.includes("tools") ||
    query.includes("excel") ||
    query.includes("word") ||
    query.includes("powerpoint") ||
    query.includes("rag") ||
    query.includes("digital") ||
    query.includes("code") ||
    query.includes("programming")
  ) {
    return {
      text: "💻 **Computational & Software Capabilities:**\n\nMahin integrates computational tools with experimental materials research:\n\n• **MATLAB:** Completed **MathWorks MATLAB Onramp** (Feb 2026). Utilizes MATLAB for engineering calculations, matrix operations, data analysis, numerical scripting, and simulation-oriented research.\n• **Engineering & Research Documentation:** Technical report writing, research literature organization, and structured scientific documentation.\n• **Productivity Stack:** Microsoft Word, Microsoft Excel (data analysis & charts), Microsoft PowerPoint, and Google Workspace.\n• **Emerging Digital Interests:** Scientific literature management, document processing, AI-assisted research workflows, and simulation frameworks.\n• **Additional Courses:** Completed **Aerospace Engineering: Aircraft Introduction** and a 3-month **Fashion Design** course (2024); interested in learning LaTeX and advanced computational mechanics.",
      suggestions: [
        "What courses has Mahin completed?",
        "Explain his research in bacterial cellulose",
        "How can I contact Mahin?"
      ],
      actions: [
        { label: "View Skills Cloud", action: "scroll_skills", icon: "Target" },
        { label: "View Training Timeline", action: "scroll_experience", icon: "Award" }
      ]
    };
  }

  // 10. PROFESSIONAL & LEADERSHIP EXPERIENCE (Section 9)
  if (
    query.includes("experience") ||
    query.includes("aurwave") ||
    query.includes("work") ||
    query.includes("job") ||
    query.includes("client acquisition") ||
    query.includes("scholars fashion club") ||
    query.includes("fashion club") ||
    query.includes("secretary") ||
    query.includes("leadership")
  ) {
    return {
      text: "💼 **Professional & Leadership Experience:**\n\n• **Executive — Client Acquisition** | *Aurwave, Dhaka* (Jan 2025 – Present)\n  - Professional client communication and international business development.\n  - Coordinating with potential clients to clarify technical requirements and project scopes.\n\n• **Idea & Innovation Secretary** | *Scholars Fashion Club, Dhaka* (Nov 2024 – Apr 2025)\n  - Coordinated creative innovation activities, workshops, and club documentation.\n  - Fostered teamwork, project planning, and interdisciplinary collaboration among students.\n\n*(Note: While Mahin has valuable client communication and leadership experience, his primary professional identity is as a Textile Engineering student and emerging materials researcher.)*",
      suggestions: [
        "What are his academic qualifications?",
        "Tell me about his research in composites",
        "How to contact Mahin?"
      ],
      actions: [
        { label: "View Experience Timeline", action: "scroll_experience", icon: "Briefcase" }
      ]
    };
  }

  // 11. CAREER GOALS & POSTGRADUATE ASPIRATIONS (Section 11 & Section 16 FAQ 9)
  if (
    query.includes("career") ||
    query.includes("goal") ||
    query.includes("future") ||
    query.includes("postgraduate") ||
    query.includes("masters") ||
    query.includes("phd") ||
    query.includes("aspiration")
  ) {
    return {
      text: "🎯 **Career Goals & Long-Term Direction:**\n\nMahin's long-term career direction is focused on **advanced materials engineering and research**:\n\n• **Deepening Expertise:** Building specialized knowledge in composite materials, bio-based materials, and sustainable engineering.\n• **Bridging Disciplines:** Connecting Textile Engineering and materials science with aerospace structures and lightweight systems.\n• **Computational Skills:** Further developing simulation, numerical modeling (MATLAB), and materials characterization proficiencies.\n• **Postgraduate Study:** Pursuing postgraduate research in advanced materials, composite engineering, or aerospace-related fields.\n• **Sustainable Impact:** Contributing to the development of next-generation sustainable, high-performance materials.",
      suggestions: [
        "What makes Mahin's profile interdisciplinary?",
        "Tell me about his research interests",
        "How can I contact him for collaboration?"
      ],
      actions: [
        { label: "View Research Interests", action: "scroll_projects", icon: "Workflow" }
      ]
    };
  }

  // 12. INTERDISCIPLINARY PROFILE (Section 16 FAQ 10)
  if (
    query.includes("interdisciplinary") ||
    query.includes("unique") ||
    query.includes("why hire") ||
    query.includes("strengths") ||
    query.includes("profile")
  ) {
    return {
      text: "🌐 **What Makes Mahin's Profile Interdisciplinary?**\n\nHis academic foundation uniquely connects multiple engineering domains:\n\n1. **Textile Engineering & Chemistry:** Deep understanding of fiber properties, wet processing chemistry, polymer interactions, and sustainable processing.\n2. **Materials Science & Composites:** Knowledge of fiber-reinforced architectures, natural-fiber composites, and mechanical characterization.\n3. **Bio-Based Innovation:** Research interest in bacterial cellulose fermentation and renewable waste-derived substrates.\n4. **Computational & Analytical Tools:** Utilizing MATLAB for calculations and simulation frameworks, paired with disciplined research documentation.\n5. **Professional Communication:** Demonstrated teamwork, project coordination, and client communication capabilities.",
      suggestions: [
        "What are his main research interests?",
        "What does he study?",
        "How can I get in touch?"
      ],
      actions: [
        { label: "Explore Projects", action: "scroll_projects", icon: "Workflow" },
        { label: "Contact Shadat", action: "scroll_contact", icon: "Mail" }
      ]
    };
  }

  // 13. RESEARCH INTERESTS OVERVIEW (Section 4 & Section 16 FAQ 5)
  if (
    query.includes("research interest") ||
    query.includes("research area") ||
    query.includes("what does he research") ||
    query.includes("topics")
  ) {
    return {
      text: "🔬 **Mahin's Major Research Interests:**\n\n1. **Composite Materials** (3D woven, braided & fiber-reinforced)\n2. **Bio-based Materials** & Renewable Systems\n3. **Bacterial Cellulose** (Fermentation & waste-derived substrates)\n4. **Sustainable Materials** & Eco-friendly Processing\n5. **Natural Fiber Composites** (Jute & lignocellulosics)\n6. **Advanced & High-Performance Materials**\n7. **Lightweight Structures**\n8. **Materials Characterization**\n9. **Digital & Computational Methods** (MATLAB, simulation)\n10. **Aerospace Materials & Structures**",
      suggestions: [
        "Tell me about his Bacterial Cellulose research",
        "Explain his Aerospace materials interest",
        "What computational tools does he use?"
      ],
      actions: [
        { label: "View Research Projects", action: "scroll_projects", icon: "Workflow" }
      ]
    };
  }

  // 14. CONTACT / EMAIL / LOCATION / RESUME (Section 1 & 16)
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("hire") ||
    query.includes("resume") ||
    query.includes("cv") ||
    query.includes("location") ||
    query.includes("collaborat")
  ) {
    return {
      text: "📬 **Get in Touch with Shadat Hossain Mahin:**\n\n• **Full Name:** Shadat Hossain Mahin (Mahin)\n• **Location:** Dhaka, Bangladesh\n• **Email:** `shadatmahin681@gmail.com`\n• **Opportunities:** Academic research collaborations, materials science projects, textile engineering consulting, and postgraduate opportunities.\n\nYou can reach out directly via email or submit a message through the contact section on this site!",
      suggestions: [
        "Download Mahin's Resume",
        "Send message via Contact Form",
        "What are Mahin's research interests?"
      ],
      actions: [
        { label: "Open Contact Form", action: "scroll_contact", icon: "Mail" },
        { label: "Download Resume", action: "download_cv", icon: "FileText" },
        { label: "Copy Email", action: "copy_email", payload: "shadatmahin681@gmail.com", icon: "Copy" }
      ]
    };
  }

  // 15. DEFAULT CONTEXTUAL FALLBACK
  return {
    text: `That is an interesting question! As **Shadat Hossain Mahin's AI Assistant**, I can provide details about his **Textile Engineering (Wet Processing) background**, **Composite & Bio-based Materials research**, **Bacterial Cellulose projects**, **MATLAB & computational tools**, and **interdisciplinary aerospace interests**.\n\nPlease select one of the topics below or rephrase your question to explore further!`,
    suggestions: [
      "Who is Shadat Hossain Mahin?",
      "What are his research interests in composites?",
      "Tell me about his Bacterial Cellulose research",
      "How is he transitioning toward aerospace materials?"
    ],
    actions: [
      { label: "Explore Projects", action: "scroll_projects", icon: "Workflow" },
      { label: "Contact Mahin", action: "scroll_contact", icon: "Mail" }
    ]
  };
}
