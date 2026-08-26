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
import icon3dBriefcase from "./assets/images/briefcase_3d_icon_1787775134330.jpg";
import icon3dGlobe from "./assets/images/globe_3d_icon_1787775706516.jpg";
import icon3dMedal from "./assets/images/medal_3d_icon_1787775162478.jpg";
import icon3dFlask from "./assets/images/flask_3d_icon_1787775189702.jpg";
import icon3dChip from "./assets/images/chip_3d_icon_1787775203534.jpg";
import icon3dMatlab from "./assets/images/matlab_3d_icon_1787775220092.jpg";

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

  const phrases = [
    "Materials & Aerospace Research",
    "Composites, Bio-based Materials & 3D Structures",
    "Textile Engineering & Wet Processing Chemistry",
    "Computational Engineering & MATLAB Simulations"
  ];

  // Typewriter Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 65);
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
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

      setScrolled(scrollTop > 30);
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
    <div className="relative min-h-screen bg-[#F7F9FA] text-[#161A1D] font-sans selection:bg-[#E8F3FA] selection:text-[#1769AA] overflow-x-hidden">
      
      {/* Precision Scroll indicator bar in Aerospace Blue */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] bg-[#1769AA] z-[9999] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(23,105,170,0.5)]"
        style={{ width: `${progressWidth}%` }}
      />

      {/* Technical Background Constellation & Subtle Grid */}
      <BackgroundStars />

      {/* Sticky Header Nav */}
      <nav className={`fixed top-0 inset-x-0 z-[3000] transition-all duration-300 ${
        scrolled 
          ? "bg-[#FFFFFF]/92 backdrop-blur-md shadow-[0_2px_15px_rgba(22,26,29,0.04)] py-3 border-b border-[#D9DEE2]" 
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
          
          {/* LOGO */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center transition-transform active:scale-95 cursor-pointer"
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

          {/* Nav items list */}
          <div className="hidden md:flex items-center gap-1">
            {(["about", "experience", "education", "projects", "contact"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#5C6670] hover:text-[#161A1D] hover:bg-[#E8F3FA] active:bg-[#D9DEE2] transition-all uppercase tracking-wider cursor-pointer"
              >
                {sec}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-3 px-4.5 py-2 rounded-lg bg-[#1769AA] hover:bg-[#125386] active:scale-95 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" /> Direct Inquiry
            </button>
          </div>

          {/* Hamburger activator */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-lg hover:bg-[#E8F3FA] text-[#161A1D] active:scale-95 transition-all"
            aria-label="Toggle Navigation Options"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[2900] bg-[#0D1114]/50 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-16 right-5 w-64 bg-[#FFFFFF] rounded-2xl border border-[#D9DEE2] p-5 flex flex-col gap-1.5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {(["about", "experience", "education", "projects", "contact"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#5C6670] hover:bg-[#E8F3FA] hover:text-[#1769AA] transition-all uppercase tracking-wider"
              >
                {sec}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-3 w-full py-3 rounded-xl bg-[#1769AA] hover:bg-[#125386] text-white text-xs font-bold tracking-widest uppercase text-center justify-center flex items-center gap-2 shadow-xs"
            >
              <Mail className="w-4 h-4" /> Get In Touch
            </button>
          </div>
        </div>
      )}

      {/* Main hero segment */}
      <section id="hero" className="max-w-6xl mx-auto px-5 md:px-8 mt-24 md:mt-32 pt-8 pb-16 relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">
        
        {/* Profile Card & fallback image */}
        <div className="relative shrink-0 select-none text-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1769AA]/20 via-[#E8F3FA] to-[#1769AA]/10 rounded-full scale-105 blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
          
          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#FFFFFF] shadow-lg bg-[#FFFFFF] flex items-center justify-center transition-transform hover:scale-[1.02] duration-300">
            {imageError ? (
              <div className="w-full h-full bg-[#F7F9FA] flex flex-col items-center justify-center select-none text-center p-4">
                <span className="text-3xl font-black text-[#1769AA] tracking-tight">SH</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5C6670] mt-1">Shadat Mahin</span>
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
          <span className="absolute bottom-2.5 right-4 w-5 h-5 bg-[#10B981] border-3 border-white rounded-full flex items-center justify-center shadow-xs" title="Active Client & Research Lead Mode" />
        </div>

        {/* Hero Bio Introduction */}
        <div className="flex-1 text-center md:text-left space-y-5">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3FA] border border-[#D9DEE2] text-xs text-[#1769AA] font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 bg-[#1769AA] rounded-full animate-ping" /> Textile Engineer &bull; Materials &amp; Aerospace Research
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#161A1D] leading-none">
              Shadat Hossen Mahin
            </h1>
            
            {/* Dynamic Typewriter description box */}
            <div className="min-h-[26px] text-[#1769AA] font-semibold text-sm md:text-base leading-relaxed tracking-wide flex items-center justify-center md:justify-start gap-1 font-mono">
              <span>{typewriterText}</span>
              <span className="w-[2px] h-[1.1em] bg-[#1769AA] animate-pulse" />
            </div>
          </div>

          <p className="text-[#5C6670] text-sm md:text-md max-w-xl leading-relaxed">
            Exploring composites, bio-based materials, sustainable wet processing, and advanced aerospace material systems. My approach integrates rigorous laboratory experimentation, mechanical characterization, engineering calculations, and MATLAB computational simulations to build high-performance solutions.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#1769AA] hover:bg-[#125386] text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all shadow-xs active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              View Research <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#161A1D] hover:bg-[#2B3238] text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer active:scale-95"
            >
              Explore Projects
            </button>
            <button
              onClick={() => setIsCvOpen(true)}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-[#FFFFFF] border border-[#D9DEE2] hover:bg-[#E8F3FA] text-[#161A1D] text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-[#1769AA]" /> Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* Metrics bento cards grid in Aerospace Graphite */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-[#FFFFFF] border border-[#D9DEE2] p-6 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#1769AA]/60 hover:shadow-md transition-all duration-300 group">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#5C6670]">Professional Roles</p>
              <p className="text-3xl font-black text-[#1769AA]">2 Roles</p>
              <p className="text-[11px] text-[#5C6670]">Aurwave + Scholars Club</p>
            </div>
            <div className="relative w-13 h-13 rounded-xl overflow-hidden border border-[#D9DEE2] group-hover:border-[#1769AA]/40 transition-all duration-300 bg-[#0D1114] flex items-center justify-center shrink-0">
              <img 
                src={icon3dBriefcase} 
                alt="3D Briefcase Icon" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D9DEE2] p-6 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#1769AA]/60 hover:shadow-md transition-all duration-300 group">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#5C6670]">Languages</p>
              <p className="text-3xl font-black text-[#1769AA]">2 Spoken</p>
              <p className="text-[11px] text-[#5C6670]">Bangla, English</p>
            </div>
            <div className="relative w-13 h-13 rounded-xl overflow-hidden border border-[#D9DEE2] group-hover:border-[#1769AA]/40 transition-all duration-300 bg-[#0D1114] flex items-center justify-center shrink-0">
              <img 
                src={icon3dGlobe} 
                alt="3D Globe Icon" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D9DEE2] p-6 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#1769AA]/60 hover:shadow-md transition-all duration-300 group">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#5C6670]">Academic Certifications</p>
              <p className="text-3xl font-black text-[#1769AA]">3 Certs</p>
              <p className="text-[11px] text-[#5C6670]">Aerospace + MATLAB + Fashion</p>
            </div>
            <div className="relative w-13 h-13 rounded-xl overflow-hidden border border-[#D9DEE2] group-hover:border-[#1769AA]/40 transition-all duration-300 bg-[#0D1114] flex items-center justify-center shrink-0">
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
      <section id="about" className="max-w-6xl mx-auto px-5 md:px-8 py-10 scroll-mt-24 relative z-10">
        <div className="bg-[#FFFFFF] border border-[#D9DEE2] rounded-3xl p-6 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 bg-[#1769AA] rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-[#161A1D]">About Engineering &amp; Research Focus</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left text-sm leading-relaxed text-[#5C6670]">
            <p className="font-medium text-[#161A1D]">
              I am a final-year Textile Engineering student specializing in Wet Processing, with deep research interests spanning Composite Materials, Bacterial Cellulose, and Bio-based Engineering Systems. My work bridges laboratory chemical engineering with modern materials science, structural mechanics, and MATLAB computational simulations.
            </p>
            <p>
              My research trajectory focuses on transitioning from conventional textile processing toward advanced composite structures and lightweight aerospace applications. As the former Idea &amp; Innovation Secretary of Scholars Fashion Club and Executive in Client Acquisition at Aurwave, I combine rigorous technical exploration with agile project management, clear documentation, and global technical communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3 text-left">
            <div className="p-4 bg-[#F7F9FA] rounded-xl border border-[#D9DEE2]">
              <p className="text-[10px] font-bold text-[#5C6670] uppercase tracking-widest">
                Core Specialization
              </p>
              <p className="text-xs font-bold text-[#161A1D] mt-0.5">
                Wet Processing, Composites &amp; Bio-materials
              </p>
            </div>

            <div className="p-4 bg-[#F7F9FA] rounded-xl border border-[#D9DEE2]">
              <p className="text-[10px] font-bold text-[#5C6670] uppercase tracking-widest">
                Academic Status
              </p>
              <p className="text-xs font-bold text-[#161A1D] mt-0.5">
                Final-Year B.Sc. in Textile Engineering
              </p>
            </div>

            <div className="p-4 bg-[#F7F9FA] rounded-xl border border-[#D9DEE2]">
              <p className="text-[10px] font-bold text-[#5C6670] uppercase tracking-widest">
                Target Transition
              </p>
              <p className="text-xs font-bold text-[#161A1D] mt-0.5">
                Aerospace Materials &amp; High-Performance Systems
              </p>
            </div>

            <div className="p-4 bg-[#F7F9FA] rounded-xl border border-[#D9DEE2]">
              <p className="text-[10px] font-bold text-[#5C6670] uppercase tracking-widest">
                Location
              </p>
              <p className="text-xs font-bold text-[#161A1D] mt-0.5">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience, Education and Training Section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 relative z-10 text-left">
        <ResumeTimelines />
      </section>

      {/* Filterable Galleries section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 relative z-10 text-left">
        <ProjectGallery />
      </section>

      {/* Custom Skills List Section */}
      <section id="skills" className="max-w-6xl mx-auto px-5 md:px-8 py-10 scroll-mt-24 relative z-10">
        <div className="bg-[#FFFFFF] border border-[#D9DEE2] rounded-3xl p-6 md:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-[#161A1D]">Technical Competencies &amp; Skills Matrix</h2>
            <p className="text-xs text-[#5C6670] max-w-md mx-auto">
              A structured technical overview of chemical wet processing, composite material characterization, and engineering tools.
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
                <div key={idx} className="bg-[#F7F9FA] border border-[#D9DEE2] rounded-2xl p-5 space-y-4 text-left group hover:border-[#1769AA]/60 transition-colors shadow-2xs">
                  <div className="flex items-center gap-3 border-b border-[#D9DEE2] pb-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#D9DEE2] bg-[#0D1114] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img src={skill3dIcon} alt={`${cat.title} 3D icon`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-bold text-sm text-[#161A1D] group-hover:text-[#1769AA] transition-colors">
                      {cat.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-semibold text-[#161A1D] bg-[#FFFFFF] hover:bg-[#1769AA] hover:text-white transition-all cursor-default border border-[#D9DEE2] px-3 py-1.5 rounded-lg"
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
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 pb-20 relative z-10 text-left">
        <ContactSection />
      </section>

      {/* Footer with massive typographic watermark & status bar */}
      <Footer onNavigate={scrollToSection} onOpenCv={() => setIsCvOpen(true)} />

      {/* AI Twins Recruiter Bot sidebar component */}
      <AIAssistant />

      {/* CV Preview Modal */}
      {isCvOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-[#0D1114]/75 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-4xl h-[85vh] bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-2xl border border-[#D9DEE2] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-[#D9DEE2] flex items-center justify-between bg-[#F7F9FA]">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#1769AA]" />
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#161A1D]">CV / Resume Preview</span>
              </div>
              <button 
                onClick={() => setIsCvOpen(false)}
                className="p-2 rounded-xl hover:bg-[#D9DEE2] text-[#5C6670] hover:text-[#161A1D] transition-colors active:scale-95 cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 bg-[#F7F9FA] relative">
              <iframe 
                src={assetPaths.resume} 
                title="Shadat Mahin Resume Preview" 
                className="w-full h-full border-0 select-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-[#D9DEE2] bg-[#F7F9FA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-[#5C6670] font-semibold text-center sm:text-left">
                Scroll on the Preview paper layer or zoom in using the toolbar.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                <a
                  href={assetPaths.resume}
                  download="shadat_mahin_resume.pdf"
                  className="px-5 py-2.5 rounded-xl bg-[#1769AA] hover:bg-[#125386] text-white text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Download PDF
                </a>
                <button
                  onClick={() => setIsCvOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D9DEE2] hover:bg-[#D9DEE2] text-[#161A1D] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer active:scale-95"
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
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 p-3.5 sm:p-4 rounded-xl bg-[#161A1D] text-white shadow-xl hover:bg-[#1769AA] active:scale-95 transition-all z-[4000] border border-[#D9DEE2]/40"
          aria-label="Back to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
