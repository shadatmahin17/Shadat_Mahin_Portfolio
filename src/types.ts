export interface ProjectMetric {
  label: string;
  value: string;
  badgeColor?: string;
}

export interface ProjectParameter {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: "wet-processing" | "dyeing" | "client-acquisition" | "innovations" | "all";
  badgeLabel?: string;
  description: string;
  details: string[];
  tags: string[];
  metrics?: ProjectMetric[];
  parameters?: ProjectParameter[];
  impactSummary?: string;
  featured?: boolean;
  image?: string;
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  date: string;
  highlights: string[];
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  date: string;
  badge?: string;
}

export interface SkillCategory {
  title: string;
  icon?: string;
  skills: string[];
}

export interface Language {
  name: string;
  level: string;
  percentage: number;
}

export interface Training {
  id?: string;
  title: string;
  institution: string;
  date: string;
  description: string;
  icon: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  field?: string;
  issuerLogo?: string;
  status?: string;
  image?: string;
  fileUrl?: string;
  fileType?: "pdf" | "image";
}

export interface ChatAction {
  label: string;
  action: "scroll_contact" | "scroll_projects" | "scroll_experience" | "scroll_skills" | "download_cv" | "copy_email" | "suggest_query" | "view_certificate";
  payload?: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: ChatAction[];
  isError?: boolean;
}
