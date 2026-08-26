import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronUp, 
  FileText, 
  Mail, 
  ArrowRight, 
  Briefcase, 
  Languages, 
  Award, 
  Target, 
  Linkedin, 
  Github, 
  Globe,
  Eye
} from "lucide-react";
import BackgroundStars from "./components/BackgroundStars";
import ProjectGallery from "./components/ProjectGallery";
import ResumeTimelines from "./components/ResumeTimelines";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";
import { SkillCategory } from "./types";
import { assetPaths } from "./lib/assets";
import icon3dBriefcase from "./assets/images/icon_3d_briefcase_1787633112935.jpg";
import icon3dGlobe from "./assets/images/icon_3d_globe_1787633140082.jpg";
import icon3dMedal from "./assets/images/icon_3d_medal_1787633125607.jpg";
import icon3dFlask from "./assets/images/icon_3d_flask_1787634208032.jpg";
import icon3dChip from "./assets/images/icon_3d_chip_1787634230568.jpg";
import icon3dMatlab from "./assets/images/icon_3d_matlab_1787633171652.jpg";

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Textile & Wet Processing",
    skills: [
      "Dyeing Chemistry",
      "Reactive Dyeing",
      "Textile Wet Processing",
      "Scouring & Bleaching",
      "Coloration Techniques",
      "Textile Testing",
      "Fiber & Fabric Analysis",
      "Sustainable Textile Processing"
    ]
  },
  {
    title: "Materials & Research",
    skills: [
      "Composite Materials",
      "Bio-based Materials",
      "Natural Fiber Composites",
      "Bacterial Cellulose",
      "Materials Characterization",
      "Sustainable Materials",
      "Experimental Research",
      "Literature Review"
    ]
  },
  {
    title: "Engineering & Digital Tools",
    skills: [
      "MATLAB",
      "Microsoft Excel",
      "Microsoft Word",
      "PowerPoint",
      "Technical Documentation",
      "Data Analysis",
      "Engineering Calculations",
      "Research Documentation"
    ]
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  const phrases = 
  [
  "Textile Engineering Student",
  "Composite & Bio-based Materials Enthusiast",
  "Aspiring Aerospace Materials Engineer"
  ];

  // Typewriter Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 35);
    } else {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 75);
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  // Scroll details tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgressWidth(pct);

      setScrolled(scrollTop > 45);
      setShowScrollTop(scrollTop > 380);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility and body lock for CV Modal
  useEffect(() => {
    if (!isCvOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCvOpen(false);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCvOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-[#E5C97A] selection:text-[#1A1A1A] overflow-x-hidden">
      
      {/* Scroll indicator bar */}
      <div 
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-[#C9A34E] via-[#E5C97A] to-[#C9A34E] z-[9999] transition-all duration-100 ease-out"
        style={{ width: `${progressWidth}%` }}
      />

      {/* Background Interactive Particles */}
      <BackgroundStars />

      {/* Sticky Header Nav */}
      <nav className={`fixed top-0 inset-x-0 z-[3000] transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3 border-b border-neutral-100" 
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
          
          {/* LOGO */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center transition-transform active:scale-95"
          >
            <div className="w-32 h-10 overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src={assetPaths.logo} 
                alt="Shadat Mahin Logo" 
                className="w-full h-full object-contain" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
          </button>

          {/* Nav tags list */}
          <div className="hidden md:flex items-center gap-1">
            {(["about", "experience", "education", "projects", "contact"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 transition-all uppercase tracking-wider"
              >
                {sec}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C9A34E] to-[#E5C97A] hover:brightness-105 active:scale-95 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md shadow-amber-400/10 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" /> Direct Inquiry
            </button>
          </div>

          {/* Hamburger activator */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-lg hover:bg-neutral-100 text-neutral-700 active:scale-95 transition-all"
            aria-label="Toggle Navigation Options"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[2900] bg-neutral-900/40 backdrop-blur-md md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-16 right-5 w-64 bg-white/95 backdrop-blur-xl rounded-3xl border border-neutral-200/80 p-6 flex flex-col gap-2 shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {(["about", "experience", "education", "projects", "contact"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="w-full text-left px-4 py-3 rounded-2xl text-xs font-bold text-neutral-700 hover:bg-[var(--accent-glow)] hover:text-[#C9A34E] transition-all uppercase tracking-wider"
              >
                {sec}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-4 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C9A34E] to-[#E5C97A] text-white text-xs font-bold tracking-widest uppercase text-center justify-center flex items-center gap-2 shadow-md shadow-amber-500/15"
            >
              <Mail className="w-4 h-4" /> Get In Touch
            </button>
          </div>
        </div>
      )}

      {/* Main hero segment */}
      <section id="hero" className="max-w-6xl mx-auto px-5 md:px-8 mt-24 md:mt-32 pt-8 pb-16 relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">
        
        {/* Profile Card & fallback image */}
        <div className="relative shrink-0 select-none animate-fade-in text-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A34E] to-[#E5C97A] rounded-full scale-102 blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
          
          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white shadow-xl bg-neutral-100 flex items-center justify-center transition-transform hover:scale-102 duration-300">
            {imageError ? (
              <div className="w-full h-full bg-gradient-to-br from-[#F5F5F5] to-neutral-200 flex flex-col items-center justify-center select-none text-center p-4">
                <span className="text-3xl font-black text-[#C9A34E] tracking-tight">SH</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-1">Shadat Mahin</span>
              </div>
            ) : (
              <img
                src={assetPaths.profilePhoto}
                alt="Shadat Hossen Mahin Portrait"
                className="w-full h-full object-cover origin-center"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          
          {/* Active status bubble */}
          <span className="absolute bottom-2.5 right-4 w-5.5 h-5.5 bg-green-500 border-4 border-white rounded-full flex items-center justify-center shadow-md shadow-green-500/20" title="Active Client Lead Mode" />
        </div>

        {/* Hero Bio Introduction */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-glow)] border border-[#C9A34E]/25 text-xs text-[#C9A34E] font-bold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-[#C9A34E] rounded-full animate-ping" /> Textile Engineer
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-none">
              Shadat Hossen Mahin
            </h1>
            
            {/* Dynamic Typewriter description box */}
            <div className="min-h-[28px] text-[#C9A34E] font-semibold text-sm md:text-base leading-relaxed tracking-wide flex items-center justify-center md:justify-start gap-1">
              <span>{typewriterText}</span>
              <span className="w-[2.5px] h-[1.1em] bg-[#C9A34E] animate-pulse" />
            </div>
          </div>

          <p className="text-[#666666] text-sm md:text-md max-w-xl leading-relaxed">
            I combine textile engineering principles, wet processing chemistry, composite materials, and bio-based material research to explore sustainable and high-performance engineering solutions. My approach integrates laboratory experimentation, material analysis, engineering calculations, and computational tools to investigate practical solutions for advanced material and textile applications.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#C9A34E] to-[#E5C97A] text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase hover:brightness-105 transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              Get In Touch <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full border border-neutral-300 hover:border-neutral-500 text-neutral-700 hover:text-neutral-900 text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              Verify Experience
            </button>
            <button
              onClick={() => setIsCvOpen(true)}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" /> Download Resume
            </button>
          </div>


        </div>
      </section>

      {/* Metrics bento cards grid */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white border border-neutral-200/60 p-6 rounded-3xl flex items-center justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400">Professional Tasks</p>
              <p className="text-3xl font-black text-[#C9A34E]">2 Roles</p>
              <p className="text-[11px] text-neutral-500">Aurwave + Scholars Club</p>
            </div>
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-[0_8px_20px_-4px_rgba(201,163,78,0.35)] border border-[#C9A34E]/30 group-hover:scale-108 transition-transform duration-300 bg-neutral-950 flex items-center justify-center shrink-0">
              <img 
                src={icon3dBriefcase} 
                alt="3D Briefcase Icon" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="bg-white border border-neutral-200/60 p-6 rounded-3xl flex items-center justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400">Languages</p>
              <p className="text-3xl font-black text-[#C9A34E]">2 Spoken</p>
              <p className="text-[11px] text-neutral-500">Bangla, English</p>
            </div>
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-[0_8px_20px_-4px_rgba(201,163,78,0.35)] border border-[#C9A34E]/30 group-hover:scale-108 transition-transform duration-300 bg-neutral-950 flex items-center justify-center shrink-0">
              <img 
                src={icon3dGlobe} 
                alt="3D Globe Icon" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="bg-white border border-neutral-200/60 p-6 rounded-3xl flex items-center justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400">Academic Training</p>
              <p className="text-3xl font-black text-[#C9A34E]">3 Certs</p>
              <p className="text-[11px] text-neutral-500">MATLAB + Fashion + Aerospace</p>
            </div>
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-[0_8px_20px_-4px_rgba(201,163,78,0.35)] border border-[#C9A34E]/30 group-hover:scale-108 transition-transform duration-300 bg-neutral-950 flex items-center justify-center shrink-0">
              <img 
                src={icon3dMedal} 
                alt="3D Medal Icon" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Deep About Details */}
      <section id="about" className="max-w-6xl mx-auto px-5 md:px-8 py-12 scroll-mt-24 relative z-10">
        <div className="bg-[var(--card-bg)] border border-neutral-200/50 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-[#C9A34E] rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">About Me</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left text-sm leading-relaxed text-[#666666]">
            <p className="font-medium text-neutral-700">
              Welcome! I am a final-year Textile Engineering student specializing in Wet Processing, with strong interests in Dyeing Chemistry, Composite Materials, and Bio-based Materials. My academic and research interests focus on developing sustainable materials and textile processes by combining chemical engineering principles, material science, laboratory experimentation, and computational tools such as MATLAB.
            </p>
            <p>
              Alongside my academic work, I have developed practical experience in textile processing, fiber and fabric testing, dyeing techniques, and sustainable material development. I am also interested in advanced composite materials and their potential applications in aerospace and other high-performance engineering fields. As the former Idea & Innovation Secretary of Scholars Fashion Club, I have also gained experience in innovation, documentation, teamwork, and project coordination. I approach technical challenges with analytical thinking, curiosity, and a strong commitment to continuous learning and research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-left">
  <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
      Major Specialized Area
    </p>
    <p className="text-xs font-bold text-neutral-800 mt-0.5">
      Wet Processing, Composite &amp; Bio-based Materials
    </p>
  </div>

  <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
      Academic Status
    </p>
    <p className="text-xs font-bold text-neutral-800 mt-0.5">
      Final-Year B.Sc. in Textile Engineering
    </p>
  </div>

  <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
      Research Interests
    </p>
    <p className="text-xs font-bold text-neutral-800 mt-0.5">
      Advanced Materials &amp; Sustainable Engineering
    </p>
  </div>

  <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
      Location
    </p>
    <p className="text-xs font-bold text-neutral-800 mt-0.5">
      Dhaka, Bangladesh
    </p>
  </div>
</div>
        </div>
      </section>

      {/* Experience, Education and Training Section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 relative z-10 text-left">
        <ResumeTimelines />
      </section>

      {/* Filterable Galleries section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 relative z-10 text-left">
        <ProjectGallery />
      </section>

      {/* Custom Skills List Section */}
      <section id="skills" className="max-w-6xl mx-auto px-5 md:px-8 py-12 scroll-mt-24 relative z-10">
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-neutral-900">Skills &amp; Expertise Cloud</h2>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              A focused overview of my textile engineering, advanced materials, research, and computational skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const skill3dIcon = 
                idx === 0 
                  ? icon3dFlask 
                  : idx === 1 
                    ? icon3dChip 
                    : icon3dMatlab;

              return (
                <div key={idx} className="bg-[#FDFDFD] border border-neutral-200/40 rounded-2xl p-5 space-y-4 text-left group hover:border-[#C9A34E]/50 transition-colors shadow-xs">
                  <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
                    <div className="w-8 h-8 rounded-xl overflow-hidden shadow-[0_4px_10px_rgba(201,163,78,0.25)] border border-[#C9A34E]/30 bg-neutral-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img src={skill3dIcon} alt={`${cat.title} 3D icon`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#C9A34E] transition-colors">
                      {cat.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-semibold text-neutral-700 bg-[var(--surface)] hover:bg-[#C9A34E] hover:text-white transition-all cursor-default border border-neutral-200/20 px-3.5 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual contact form section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 pb-24 relative z-10 text-left">
        <ContactSection />
      </section>

      {/* Footer with massive typographic watermark & status bar */}
      <Footer onNavigate={scrollToSection} onOpenCv={() => setIsCvOpen(true)} />

      {/* AI Twins Recruiter Bot sidebar component */}
      <AIAssistant />

      {/* CV Preview Modal */}
      {isCvOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 flex flex-col animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#C9A34E]" />
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-neutral-800">CV / Resume Preview</span>
              </div>
              <button 
                onClick={() => setIsCvOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-200/50 text-neutral-500 hover:text-neutral-800 transition-colors active:scale-95 cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 bg-neutral-100 relative">
              <iframe 
                src={assetPaths.resume} 
                title="Shadat Mahin Resume Preview" 
                className="w-full h-full border-0 select-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-neutral-400 font-semibold text-center sm:text-left">
                Scroll on the Preview paper layer or zoom in using the toolbar.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                <a
                  href={assetPaths.resume}
                  download="shadat_mahin_resume.pdf"
                  className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Download PDF
                </a>
                <button
                  onClick={() => setIsCvOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 hover:border-neutral-400 text-neutral-700 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop click zone layer */}
          <div className="absolute inset-0 -z-10 cursor-pointer" onClick={() => setIsCvOpen(false)} />
        </div>
      )}

      {/* Simple active back to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 p-3.5 sm:p-4 rounded-full bg-neutral-900 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all z-[4000] border border-neutral-800"
          aria-label="Back to raw top page"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
