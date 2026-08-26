import { Project } from "../types";

export const DETAILED_PROJECTS: Project[] = [
  {
    id: "probabilistic-simulation-framework-3d-composites",
    title: "Probabilistic Simulation Framework for 3D Woven Composites: Linking Architecture, Defects, and Structural Performance",
    category: "innovations",
    badgeLabel: "Aerospace Simulation Project",
    featured: true,
    description: "Developed a reduced-order probabilistic digital twin integrating textile architecture, manufacturing process conditions, defect prediction, and structural performance for aerospace-grade 3D woven composites under uncertainty.",
    impactSummary: "Predicted Compression After Impact (CAI) strength within 2.0 MPa mean absolute deviation from literature benchmarks, establishing a 42.2% compliance rate for 450 MPa aerospace certification.",
    metrics: [
      { label: "Monte Carlo Samples", value: "N = 3,000", badgeColor: "amber" },
      { label: "CAI Strength Range", value: "380 – 560 MPa", badgeColor: "emerald" },
      { label: "Mean Accuracy Error", value: "MAD 2.0 MPa", badgeColor: "blue" },
      { label: "Aerospace Pass Rate", value: "42.2% @ 450 MPa", badgeColor: "purple" }
    ],
    parameters: [
      { label: "Fibre Volume Fraction", value: "0.48 – 0.60 (Pearson r = +0.48)" },
      { label: "Yarn Waviness Ratio", value: "0.02 – 0.08 (Pearson r = -0.41)" },
      { label: "Braid Angles", value: "25° – 40°" },
      { label: "Void Fraction Model", value: "1.0% – 4.0% (Mean: 2.85%)" },
      { label: "Numerical Engine", value: "MATLAB Stochastic Scripting" },
      { label: "Target Application", value: "Aerospace Primary Structural Panels" }
    ],
    details: [
      "Coupled textile micro-structural architecture parameters (fibre volume fraction 0.48–0.60, waviness 0.02–0.08, braid angle 25°–40°) with defect formation models.",
      "Simulated void concentrations (1–4%) and localized resin-rich areas via empirically calibrated polynomial response surface approximations.",
      "Conducted Monte Carlo iterations (N=3000) to map structural stochastic distributions, yielding a mean CAI of 448.0 MPa matching experimental publications.",
      "Demonstrated that fibre volume fraction (r = +0.48) and waviness (r = -0.41) are the governing sensitivities controlling impact tolerance."
    ],
    tags: ["Simulation Framework", "3D Woven Composites", "Monte Carlo Simulation", "Compression After Impact", "Python", "Uncertainty Quantification" , "Aerospace Application"]
  },
  {
    id: "dyeing-optimization",
    title: "Dyeing of Woven Cotton Fabric with Reactive Dyes",
    category: "wet-processing",
    badgeLabel: "Dyeing",
    featured: true,
    description: "High-precision exhaustion dyeing of scoured and bleached woven cotton fabric utilizing fiber-reactive dyes to form robust covalent ether linkages with cellulosic hydroxyl groups.",
    impactSummary: "Achieved Level 4-5 wash and perspiration fastness with optimal alkali fixation at pH 10.5–11.5 and 92% color yield efficiency.",
    metrics: [
      { label: "Liquor Ratio", value: "1:10 – 1:20 M:L", badgeColor: "blue" },
      { label: "Fixation Temperature", value: "60°C – 80°C", badgeColor: "amber" },
      { label: "Alkali Fixation pH", value: "10.5 – 11.5", badgeColor: "emerald" },
      { label: "Wash Fastness", value: "Grade 4-5 / ISO 105", badgeColor: "purple" }
    ],
    parameters: [
      { label: "Substrate", value: "100% Scoured & Bleached Woven Cotton" },
      { label: "Dyestuff Chemistry", value: "Vinyl Sulphone / Monochlorotriazine Reactive" },
      { label: "Exhaustion Salt (Glauber)", value: "40 – 80 g/L Na₂SO₄" },
      { label: "Fixation Alkali", value: "15 – 25 g/L Soda Ash (Na₂CO₃)" },
      { label: "After-Treatment Wash", value: "95°C Boiling soaping with non-ionic agent" },
      { label: "Bond Type", value: "Covalent C-O-C Cellulose Ether Linkage" }
    ],
    details: [
      "Calculated high-accuracy dye bath recipes utilizing 1:10 to 1:20 liquor ratios, 1-3% owf dye concentrations, and salt-assisted exhaustion kinetics.",
      "Engineered a phased temperature ramp (60°C–80°C) with staged alkali dosing to suppress dyestuff hydrolysis and maximize fixation yield.",
      "Executed multiple boiling clearing cycles with 1-2 g/L non-ionic detergent to eliminate unfixed surface dye and ensure superior rub/wash fastness."
    ],
    tags: ["Exhaustion Dyeing", "Reactive Chemistry", "Soda Ash Fixation", "Woven Cotton", "Liquor Ratio Math", "Color Fastness"]
  },
  {
    id: "freelance-pipeline",
    title: "Aurwave International B2B Client Acquisition Funnel",
    category: "client-acquisition",
    badgeLabel: "Global Business Dev",
    featured: true,
    description: "Architected an end-to-end B2B client acquisition engine for Aurwave, capturing qualified international enterprise contracts across North American and European markets.",
    impactSummary: "Boosted active client conversion rates by 40% and maintained consistent 5-star customer satisfaction ratings across freelancing ecosystems.",
    metrics: [
      { label: "Meeting Conversion Boost", value: "+40% Growth", badgeColor: "emerald" },
      { label: "Inquiry Response Time", value: "< 5 Seconds Hook", badgeColor: "amber" },
      { label: "Target Client Markets", value: "US, UK & EU", badgeColor: "blue" },
      { label: "Client Satisfaction", value: "5.0 ★ Rating", badgeColor: "purple" }
    ],
    parameters: [
      { label: "Target Sectors", value: "Custom Web Solutions, E-Commerce, Tech Packs" },
      { label: "Outreach Channels", value: "Direct Marketplace Portals & Enterprise Inbound" },
      { label: "Strategy Model", value: "Pain-Point Diagnosis & Technical Alignment" },
      { label: "Documentation", value: "Standard Operating Guidelines (SOGs)" },
      { label: "Bridge Function", value: "Overseas Buyer Ops ↔ In-House Dev Teams" }
    ],
    details: [
      "Conducted granular market research on high-intent international businesses requiring custom technical web and digital platforms.",
      "Designed algorithmic proposal templates focused on rapid value propositions and verified technical credentials.",
      "Spearheaded technical contract negotiations, aligning custom project milestones and deliverables with overseas executive stakeholders."
    ],
    tags: ["B2B Sales Funnel", "Lead Qualification", "International Negotiation", "Proposal Architecture", "Marketplace Outreach"]
  },
  {
    id: "textile-dyeing-bangladesh",
    title: "Textile Dyeing in Bangladesh: Towards Sustainable & Eco-Friendly Development",
    category: "innovations",
    badgeLabel: "Environmental Assessment",
    description: "In-depth environmental impact assessment evaluating resource consumption, wastewater toxicity, and zero liquid discharge (ZLD) roadmaps in Bangladesh's textile wet processing sector.",
    impactSummary: "Quantified sector water-energy metrics and structured a 3-phase sustainability roadmap from cleaner production to industrial closed-loop recycling.",
    metrics: [
      { label: "Groundwater Draw", value: "164 L / kg fabric", badgeColor: "blue" },
      { label: "Wastewater Volume", value: "119 L / kg fabric", badgeColor: "amber" },
      { label: "Chemical Footprint", value: "449 g / kg fabric", badgeColor: "purple" },
      { label: "Recycling Feasibility", value: "100% Effluent Reuse", badgeColor: "emerald" }
    ],
    parameters: [
      { label: "Sector Focus", value: "Bangladesh Export-Oriented Dyeing Mills" },
      { label: "National Effluent Volume", value: "349+ Million m³ projected" },
      { label: "Cleaner Technologies", value: "Supercritical CO₂ Waterless, Bio-Dyestuffs" },
      { label: "Advanced Wastewater (ETP)", value: "UF / NF / RO Membranes & Ozone/Fenton AOP" },
      { label: "Long-Term Goal", value: "Zero Liquid Discharge (ZLD) & Solar Thermal" }
    ],
    details: [
      "Conducted extensive material-balance assessments on groundwater draw (164 L/kg), electrical load (2.58 kWh/kg), and chemical intensity in local export units.",
      "Analyzed breakthrough sustainable dyeing technologies: supercritical fluid CO₂ dyeing, microbial colorants, and enzyme-assisted bio-scouring.",
      "Formulated a transition framework balancing capital expenditure (CapEx) against long-term water recovery and international regulatory compliance (ZDHC)."
    ],
    tags: ["Sustainable Dyeing", "ETP Wastewater", "ZDHC Compliance", "Bangladesh Textiles", "Advanced Oxidation", "Water-Energy Nexus"]
  },
  {
    id: "jute-reactive-dyeing",
    title: "Low-Temperature Jute Fabric Dyeing at 50°C",
    category: "wet-processing",
    badgeLabel: "Jute Fabric Dyeing at Low Temperature",
    description: "Specialized wet processing research evaluating trichromatic reactive dye diffusion into lignocellulosic jute matrices at mild 50°C thermal conditions.",
    impactSummary: "Proved effective dye fixation kinetics for heat-sensitive natural fibres while lowering thermal energy expenditure by over 30%.",
    metrics: [
      { label: "Process Temp", value: "50°C Low-Energy", badgeColor: "emerald" },
      { label: "Liquor Ratio", value: "1:30 M:L Ratio", badgeColor: "blue" },
      { label: "Trichromatic Blend", value: "1:1:1 Red/Yellow/Blue", badgeColor: "purple" },
      { label: "Fixation Alkali", value: "10 g/L Soda Ash", badgeColor: "amber" }
    ],
    parameters: [
      { label: "Fibre Substrate", value: "100% Natural Bangladeshi Jute Fabric" },
      { label: "Pretreatment", value: "Alkaline Bio-Scouring (Lignin & Wax Cleansing)" },
      { label: "Salt Concentration", value: "40 g/L Glauber Salt" },
      { label: "Auxiliary Agents", value: "5 ml/L Leveling, Sequestering & Wetting" },
      { label: "Target Color Spectrum", value: "Deep Earth Brown / Charcoal Complex Shade" }
    ],
    details: [
      "Utilized equal 0.5g parts of Reactive Red, Yellow, and Blue to formulate balanced neutral brown shades with high consistency on irregular jute surfaces.",
      "Maintained 1:30 liquor ratios to mitigate fiber friction, maximize dye solubility, and enhance penetration through dense cellulose walls.",
      "Validated that mild 50°C baths protect jute tensile strength compared to conventional boiling baths, opening pathways for eco-textile products."
    ],
    tags: ["Jute Engineering", "50°C Dyeing", "Trichromatic Chemistry", "Lignocellulose", "Alkali Fixation", "Eco-Fibres"]
  }
];
