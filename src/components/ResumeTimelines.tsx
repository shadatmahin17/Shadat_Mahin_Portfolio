import React, { useEffect, useState } from "react";
import { Experience, Education, Training, Language } from "../types";
import { assetPaths } from "../lib/assets";
import CertificateModal from "./CertificateModal";
import icon3dAeroplane from "../assets/images/aeroplane_3d_icon_1787775234127.jpg";
import icon3dMatlab from "../assets/images/matlab_3d_icon_1787775220092.jpg";
import icon3dFashion from "../assets/images/fashion_design_3d_icon_1787775692848.jpg";
import icon3dBriefcase from "../assets/images/briefcase_3d_icon_1787775134330.jpg";
import icon3dMedal from "../assets/images/medal_3d_icon_1787775162478.jpg";
import icon3dGlobe from "../assets/images/globe_3d_icon_1787775706516.jpg";
import icon3dEducation from "../assets/images/education_3d_icon_1787775149053.jpg";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  Building, 
  Calendar, 
  Heart, 
  Globe,
  Plane,
  Code,
  Palette,
  BookOpen,
  Eye,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

const EXPERIENCES: Experience[] = [
  {
    role: "Executive – Client Acquisition",
    company: "Aurwave (Web Devlopment Company)",
    location: "Dhaka, Bangladesh",
    date: "Jan 2025 – Present",
    highlights: [
      "Identified and cultivated strategic high-potential leads for textile design production pipelines.",
      "Communicated and negotiated successfully with international clients through freelance marketplaces, closing major active contracts.",
      "Maintained key global client relationships and assisted lead developers in custom project specification coordination."
    ],
    icon: "briefcase"
  },
  {
    role: "Idea & Innovation Secretary",
    company: "Scholars Fashion Club",
    location: "Dhaka, Bangladesh",
    date: "Nov 2024 – Apr 2025",
    highlights: [
      "Organized creative interdisciplinary workshops, innovation debates, and club activities.",
      "Coordinated active communication networks among club members and external workshop participants.",
      "Managed essential project documentation and innovative runway asset planning."
    ],
    icon: "users"
  }
];

const EDUCATIONS: Education[] = [
  {
    degree: "B.Sc. in Textile Engineering",
    institution: "University of Scholars",
    location: "Dhaka, Bangladesh",
    date: "2023 – Present",
    badge: "Final-Year B.Sc. • Major: Wet Processing • CGPA ~3.80"
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institution: "Barishal Board",
    location: "Barishal, Bangladesh",
    date: "2022"
  },
  {
    degree: "Secondary School Certificate (Science)",
    institution: "Barishal Board",
    location: "Barishal, Bangladesh",
    date: "2020"
  }
];

const TRAININGS: Training[] = [
  {
    id: "aerospace-intro",
    title: "Aerospace Engineering: Aircraft Introduction",
    institution: "Aerospace Engineering",
    date: "Completed",
    credentialId: "AE-AI-2026-084",
    field: "Aerospace Engineering",
    description: "Fundamental concepts of aircraft and introductory aerospace engineering. Directly supports Mahin's growing interest in Aerospace Materials, Composite Structures, and Aircraft Structures.",
    skills: ["Aircraft Anatomy", "Aerospace Structures", "Composite Applications", "Aerodynamics Basics"],
    fileUrl: assetPaths.aerospaceCertificate,
    fileType: "pdf",
    icon: "plane"
  },
  {
    id: "matlab-onramp",
    title: "MATLAB Onramp",
    institution: "MathWorks",
    date: "Feb 2026",
    credentialId: "MW-MATLAB-2026-9812",
    field: "Computational Engineering",
    description: "Fundamentals of MATLAB and computational problem-solving, matrix manipulation, technical data analysis, and numerical engineering workflows.",
    skills: ["Matrix Operations", "Data Visualization", "Numerical Analysis", "Engineering Scripts"],
    fileUrl: assetPaths.matlabCertificate,
    fileType: "pdf",
    icon: "code"
  },
  {
    id: "fashion-design",
    title: "Fashion Design (3-Month Short Course)",
    institution: "University of Scholars",
    date: "2024 (3 Months)",
    credentialId: "US-FD-2024-031",
    field: "Apparel & Fashion",
    description: "Fundamentals of fashion design and apparel-related concepts, bridging textile fabrication knowledge with commercial garment design.",
    skills: ["Apparel Construction", "Fashion Illustration", "Draping Principles", "Color Theory"],
    fileUrl: assetPaths.fashionDesignCertificate,
    fileType: "image",
    icon: "palette"
  }
];

const LANGUAGES: Language[] = [
  { name: "Bangla", level: "Native", percentage: 100 },
  { name: "English", level: "Fluent / Working Professional", percentage: 85 },
];

export default function ResumeTimelines() {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Training | null>(null);

  useEffect(() => {
    // Delay slightly to trigger smooth load animation
    const timer = setTimeout(() => setAnimateProgress(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-16">
      {/* Experience & Education Timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Experience Column */}
        <div id="experience" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-[#D9DEE2] pb-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#D9DEE2] bg-[#0D1114] flex items-center justify-center shrink-0">
              <img src={icon3dBriefcase} alt="3D Work Experience" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[#161A1D]">Work Experience</h3>
          </div>

          <div className="relative border-l-2 border-dashed border-[#D9DEE2] pl-6 ml-3 space-y-8">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Node counter dot */}
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1769AA] group-hover:bg-[#1769AA] transition-all shadow-[0_0_8px_rgba(23,105,170,0.3)]" />
                
                <div className="bg-[#FFFFFF] border border-[#D9DEE2] rounded-2xl p-5 shadow-xs group-hover:border-[#1769AA]/60 group-hover:shadow-md transition-all space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-[#161A1D] group-hover:text-[#1769AA] transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-[#5C6670] font-semibold flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-[#1769AA]" /> {exp.company} &bull; {exp.location}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#1769AA] bg-[#E8F3FA] px-2.5 py-1 rounded-full border border-[#D9DEE2] flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3 h-3 text-[#1769AA]" /> {exp.date}
                    </span>
                  </div>

                  <ul className="space-y-2 mt-2">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-[#5C6670] leading-relaxed list-disc list-inside">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div id="education" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-[#D9DEE2] pb-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#D9DEE2] bg-[#0D1114] flex items-center justify-center shrink-0">
              <img src={icon3dEducation} alt="3D Education" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[#161A1D]">Education</h3>
          </div>

          <div className="relative border-l-2 border-dashed border-[#D9DEE2] pl-6 ml-3 space-y-8">
            {EDUCATIONS.map((edu, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1769AA] group-hover:bg-[#1769AA] transition-all shadow-[0_0_8px_rgba(23,105,170,0.3)]" />
                
                <div className="bg-[#FFFFFF] border border-[#D9DEE2] rounded-2xl p-5 shadow-xs group-hover:border-[#1769AA]/60 group-hover:shadow-md transition-all space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-[#161A1D] group-hover:text-[#1769AA] transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-[#5C6670] font-semibold mt-0.5">
                        {edu.institution} &bull; {edu.location}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#5C6670] bg-[#F7F9FA] px-2.5 py-1 rounded-full border border-[#D9DEE2] shrink-0">
                      {edu.date}
                    </span>
                  </div>

                  {edu.badge && (
                    <span className="inline-block mt-1 text-[10px] font-extrabold tracking-wider bg-[#E8F3FA] border border-[#D9DEE2] text-[#1769AA] px-3 py-1 rounded-full uppercase">
                      {edu.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certifications & Languages side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
        
        {/* Trainings & Certificates */}
        <div id="certifications" className="space-y-6 scroll-mt-24">
          <div className="flex items-center justify-between border-b border-[#D9DEE2] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#D9DEE2] bg-[#0D1114] flex items-center justify-center shrink-0">
                <img src={icon3dMedal} alt="3D Certifications" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#161A1D]">Academic Training &amp; Certs</h3>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#1769AA] bg-[#E8F3FA] px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#D9DEE2]">
              <Eye className="w-3 h-3" /> Click cert to view
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {TRAININGS.map((train, idx) => {
              const icon3dSrc = 
                train.icon === "plane" 
                  ? icon3dAeroplane 
                  : train.icon === "code" 
                    ? icon3dMatlab 
                    : icon3dFashion;

              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedCertificate(train)}
                  className="bg-[#FFFFFF] border border-[#D9DEE2] p-4.5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-[#1769AA]/60 transition-all hover:shadow-md group cursor-pointer relative overflow-hidden"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedCertificate(train);
                    }
                  }}
                  aria-label={`View certificate for ${train.title}`}
                >
                  {/* Top Corner Badge Indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-bold text-[#1769AA] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#D9DEE2] shadow-xs z-10">
                    <Eye className="w-3 h-3" /> View Certificate
                  </div>

                  <div className="flex items-start gap-3.5">
                    {/* 3D Icon Container */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#D9DEE2] shrink-0 group-hover:scale-105 transition-transform duration-300 bg-[#0D1114] flex items-center justify-center">
                      <img 
                        src={icon3dSrc} 
                        alt={`${train.title} 3D icon`} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1 flex-1 min-w-0 pr-12">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold text-[#1769AA] uppercase tracking-wider bg-[#E8F3FA] px-2 py-0.5 rounded border border-[#D9DEE2]">
                          {train.institution}
                        </span>
                        <span className="text-[10px] font-bold text-[#5C6670] shrink-0">{train.date}</span>
                      </div>
                      <h4 className="font-bold text-[#161A1D] text-sm group-hover:text-[#1769AA] transition-colors line-clamp-1">
                        {train.title}
                      </h4>
                      <p className="text-xs text-[#5C6670] leading-relaxed line-clamp-2">
                        {train.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer preview chip */}
                  <div className="pt-2 border-t border-[#D9DEE2] flex items-center justify-between text-[11px]">
                    <span className="text-[#5C6670] font-mono text-[10px]">
                      ID: {train.credentialId}
                    </span>
                    <span className="text-[#1769AA] font-semibold flex items-center gap-1 group-hover:underline text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Credential &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Languages Proficiency */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-[#D9DEE2] pb-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#D9DEE2] bg-[#0D1114] flex items-center justify-center shrink-0">
              <img src={icon3dGlobe} alt="3D Languages" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[#161A1D]">Language Proficiencies</h3>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D9DEE2] p-6 rounded-2xl space-y-5 shadow-xs">
            {LANGUAGES.map((lang, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#161A1D]">{lang.name}</span>
                  <span className="font-semibold text-[#1769AA] bg-[#E8F3FA] px-2.5 py-0.5 rounded-full text-[10px] border border-[#D9DEE2]">
                    {lang.level}
                  </span>
                </div>
                {/* Visual loading bar */}
                <div className="w-full bg-[#F7F9FA] h-2 rounded-full overflow-hidden border border-[#D9DEE2]">
                  <div 
                    className="bg-[#1769AA] h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateProgress ? `${lang.percentage}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
            
            <p className="text-[11px] text-[#5C6670] italic text-center pt-2 flex items-center justify-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#1769AA]" /> Facilitating seamless communication across diverse multicultural buyer environments.
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Certificate Modal Viewer */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          allCertificates={TRAININGS}
          onClose={() => setSelectedCertificate(null)}
          onSelectCertificate={(cert) => setSelectedCertificate(cert)}
        />
      )}
    </div>
  );
}

