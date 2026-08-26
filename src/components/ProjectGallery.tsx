import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Project } from "../types";
import { DETAILED_PROJECTS } from "../data/projectsData";
import icon3dFlask from "../assets/images/flask_3d_icon_1787775189702.jpg";
import icon3dChip from "../assets/images/chip_3d_icon_1787775203534.jpg";
import icon3dBriefcase from "../assets/images/briefcase_3d_icon_1787775134330.jpg";
import icon3dMedal from "../assets/images/medal_3d_icon_1787775162478.jpg";
import { 
  FlaskConical, 
  Workflow, 
  Cpu, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Code, 
  Search, 
  Sparkles, 
  Layers, 
  TrendingUp,
  Tag
} from "lucide-react";

type CategoryFilter = "all" | "wet-processing" | "innovations" | "client-acquisition";

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open to prevent overlapping scroll issues
  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedProject]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return DETAILED_PROJECTS.filter((proj) => {
      // Category match
      const matchesCategory = 
        activeCategory === "all" || 
        proj.category === activeCategory || 
        (activeCategory === "wet-processing" && proj.category === "dyeing");

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        proj.title.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query) ||
        proj.tags.some(t => t.toLowerCase().includes(query)) ||
        proj.parameters?.some(p => p.label.toLowerCase().includes(query) || p.value.toLowerCase().includes(query)) ||
        proj.details.some(d => d.toLowerCase().includes(query));

      // Tag filter
      const matchesTag = !selectedTag || proj.tags.includes(selectedTag);

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [activeCategory, searchQuery, selectedTag]);

  const categoryMetadata: Record<CategoryFilter, { label: string; icon: React.ReactNode; count: number }> = {
    all: {
      label: "All Projects",
      icon: <Workflow className="w-4 h-4" />,
      count: DETAILED_PROJECTS.length
    },
    "wet-processing": {
      label: "Wet Processing & Dyeing",
      icon: <FlaskConical className="w-4 h-4" />,
      count: DETAILED_PROJECTS.filter(p => p.category === "wet-processing" || p.category === "dyeing").length
    },
    innovations: {
      label: "Research",
      icon: <Cpu className="w-4 h-4" />,
      count: DETAILED_PROJECTS.filter(p => p.category === "innovations").length
    },
    "client-acquisition": {
      label: "B2B Client Acquisition",
      icon: <TrendingUp className="w-4 h-4" />,
      count: DETAILED_PROJECTS.filter(p => p.category === "client-acquisition").length
    }
  };

  const getBadgeColorClasses = (color?: string) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-500/10 text-emerald-800 border-emerald-300/40";
      case "blue":
        return "bg-[#E8F3FA] text-[#1769AA] border-[#1769AA]/20";
      case "purple":
        return "bg-purple-500/10 text-purple-800 border-purple-300/40";
      case "amber":
      default:
        return "bg-[#E8F3FA] text-[#1769AA] border-[#D9DEE2]";
    }
  };

  return (
    <div id="projects" className="space-y-10 scroll-mt-24">
      {/* Header section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F3FA] border border-[#D9DEE2] text-[#1769AA] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#1769AA]" />
          Portfolio &amp; Engineering Research
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-[#161A1D]">
          Featured Engineering Showcases
        </h2>
        <p className="text-[#5C6670] max-w-2xl mx-auto text-sm leading-relaxed">
          Explore research in <strong>3D Composites Digital Twin (Monte Carlo N=3000)</strong>, 
          <strong> textile wet processing &amp; reactive dyeing chemistry</strong>, and international 
          <strong> B2B client acquisition systems</strong>.
        </p>
      </div>

      {/* Control Bar: Categories + Search */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {(["all", "wet-processing", "innovations", "client-acquisition"] as CategoryFilter[]).map((cat) => {
            const isSelected = activeCategory === cat;
            const meta = categoryMetadata[cat];

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedTag(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-[#161A1D] text-white border-[#161A1D] shadow-xs"
                    : "bg-[#FFFFFF] text-[#5C6670] border-[#D9DEE2] hover:border-[#1769AA] hover:text-[#161A1D] hover:bg-[#E8F3FA]"
                }`}
              >
                <span className={isSelected ? "text-[#1769AA]" : "text-[#5C6670]"}>
                  {meta.icon}
                </span>
                <span>{meta.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isSelected ? "bg-[#0D1114] text-[#E8F3FA]" : "bg-[#F7F9FA] text-[#5C6670] border border-[#D9DEE2]"
                  }`}
                >
                  {meta.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#D9DEE2] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5C6670] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. MATLAB, Jute, Monte Carlo, Soda Ash, B2B, CAI)..."
              className="w-full pl-10 pr-9 py-2 text-xs rounded-xl border border-[#D9DEE2] focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA]/20 focus:outline-none placeholder:text-[#5C6670]/70 text-[#161A1D] bg-[#F7F9FA]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5C6670] hover:text-[#161A1D]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Selected Tag Active Pill Bar */}
        {selectedTag && (
          <div className="flex items-center gap-2 px-2 text-xs text-[#5C6670]">
            <span>Filtering by tag:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161A1D] text-white font-semibold text-xs">
              <Tag className="w-3 h-3 text-[#1769AA]" />
              {selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="p-0.5 hover:bg-[#2B3238] rounded-full ml-0.5"
                aria-label="Remove tag filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-[#FFFFFF] rounded-2xl border border-[#D9DEE2] space-y-3">
          <p className="text-sm font-semibold text-[#5C6670]">
            No engineering projects matched your query &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag(null);
              setActiveCategory("all");
            }}
            className="text-xs font-bold text-[#1769AA] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer bg-[#FFFFFF] border border-[#D9DEE2] rounded-2xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#1769AA]/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Featured Highlight Bar */}
              {proj.featured && (
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                  <div className="bg-[#1769AA] text-white text-[9px] font-black uppercase tracking-wider text-center py-1 absolute top-3 -right-7 w-28 rotate-45 shadow-xs">
                    Featured
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex items-center justify-between pr-8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#D9DEE2] bg-[#0D1114] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <img 
                        src={
                          proj.category === "wet-processing" || proj.category === "dyeing"
                            ? icon3dFlask
                            : proj.category === "innovations"
                              ? icon3dChip
                              : icon3dBriefcase
                        } 
                        alt="3D Category Icon" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-extrabold tracking-wider text-[#1769AA] bg-[#E8F3FA] border border-[#D9DEE2] px-2.5 py-0.5 rounded-md">
                      {proj.badgeLabel || proj.category.split("-").join(" ")}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#161A1D] group-hover:text-[#1769AA] transition-colors leading-snug line-clamp-2">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#5C6670] line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Key Metrics Pills */}
                {proj.metrics && proj.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {proj.metrics.slice(0, 2).map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-2 rounded-xl border text-left ${getBadgeColorClasses(m.badgeColor)}`}
                      >
                        <p className="text-[9px] uppercase font-bold tracking-wider opacity-80">{m.label}</p>
                        <p className="text-xs font-bold font-mono mt-0.5 truncate">{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Tags & Action */}
              <div className="mt-5 pt-4 border-t border-[#D9DEE2] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 3).map((tg) => (
                    <span
                      key={tg}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTag(tg);
                      }}
                      className="text-[10px] font-semibold text-[#161A1D] bg-[#F7F9FA] border border-[#D9DEE2] hover:bg-[#1769AA] hover:text-white px-2.5 py-0.5 rounded-md transition-colors"
                    >
                      {tg}
                    </span>
                  ))}
                  {proj.tags.length > 3 && (
                    <span className="text-[10px] font-bold text-[#5C6670] self-center">
                      +{proj.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#161A1D] group-hover:text-[#1769AA] transition-colors pt-1">
                  <span>View Technical Dossier</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#1769AA]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comprehensive Technical Dossier Modal rendered via Portal */}
      {selectedProject && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-[#0D1114]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[#FFFFFF] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-[#D9DEE2] flex flex-col my-auto max-h-[90vh] text-[#161A1D]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="bg-gradient-to-r from-[#0D1114] via-[#151A1E] to-[#0D1114] text-white p-5 sm:p-7 relative shrink-0 border-b border-[#2B3238]">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#2B3238]/60 hover:bg-[#2B3238] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D9DEE2]/40 bg-[#0D1114] flex items-center justify-center shrink-0">
                  <img 
                    src={
                      selectedProject.category === "wet-processing" || selectedProject.category === "dyeing"
                        ? icon3dFlask
                        : selectedProject.category === "innovations"
                          ? icon3dChip
                          : icon3dBriefcase
                    } 
                    alt="3D Dossier Category" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-white bg-[#1769AA] px-3 py-1 rounded-full shadow-xs">
                    {selectedProject.badgeLabel || selectedProject.category.split("-").join(" ")}
                  </span>
                  {selectedProject.featured && (
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#E8F3FA] border border-[#1769AA] px-2.5 py-0.5 rounded-full">
                      Featured Work
                    </span>
                  )}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white pr-10 leading-snug">
                {selectedProject.title}
              </h2>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              {/* Executive Summary */}
              <div className="space-y-2 bg-[#F7F9FA] p-4 rounded-2xl border border-[#D9DEE2]">
                <h4 className="text-xs uppercase font-extrabold text-[#5C6670] tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#1769AA]" /> Executive Summary &amp; Scope
                </h4>
                <p className="text-[#161A1D] text-xs sm:text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
                {selectedProject.impactSummary && (
                  <div className="pt-2 mt-2 border-t border-[#D9DEE2] text-xs text-[#161A1D] font-semibold flex items-start gap-2">
                    <span className="text-[#1769AA] font-bold">Key Impact:</span>
                    <span>{selectedProject.impactSummary}</span>
                  </div>
                )}
              </div>

              {/* Key Quantitative Metrics Grid */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-extrabold text-[#5C6670] tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#1769AA]" /> Quantitative Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedProject.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-3 rounded-2xl border ${getBadgeColorClasses(m.badgeColor)}`}
                      >
                        <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">{m.label}</p>
                        <p className="text-sm sm:text-base font-bold font-mono mt-1">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Parameters Matrix */}
              {selectedProject.parameters && selectedProject.parameters.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-extrabold text-[#5C6670] tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#1769AA]" /> Engineering Specification Matrix
                  </h4>
                  <div className="bg-[#F7F9FA] rounded-2xl border border-[#D9DEE2] divide-y divide-[#D9DEE2] overflow-hidden text-xs">
                    {selectedProject.parameters.map((param, pIdx) => (
                      <div key={pIdx} className="p-3 sm:px-4 sm:py-2.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="font-bold text-[#161A1D]">{param.label}</span>
                        <span className="font-mono text-[#161A1D] font-medium sm:text-right bg-white sm:bg-transparent px-2 sm:px-0 py-0.5 rounded border sm:border-0 border-[#D9DEE2]">
                          {param.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Methodology & Outcomes */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold text-[#5C6670] tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Methodology &amp; Implementation Details
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-[#5C6670] text-xs sm:text-sm leading-relaxed items-start">
                      <ChevronRight className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Competency & Skill Tags */}
              <div className="space-y-2 pt-3 border-t border-[#D9DEE2]">
                <h4 className="text-xs uppercase font-extrabold text-[#5C6670] tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#1769AA]" /> Verified Engineering Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tg) => (
                    <span
                      key={tg}
                      className="text-xs font-semibold text-[#161A1D] bg-[#F7F9FA] border border-[#D9DEE2] px-3 py-1 rounded-md"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-[#F7F9FA] border-t border-[#D9DEE2] p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  const contactEl = document.getElementById("contact");
                  contactEl?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs font-bold text-[#1769AA] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Inquire about this research &rarr;
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#161A1D] hover:bg-[#2B3238] text-white transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
