import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onOpenCv?: () => void;
}

export default function Footer({ onNavigate, onOpenCv }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Close modal on Escape key press and lock background scroll
  useEffect(() => {
    if (!activeModal) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  const policyContent: Record<string, { title: string; body: string }> = {
    terms: {
      title: "Terms of Engineering & Consultation",
      body: "All intellectual property, proprietary wet-processing methodologies, laboratory trial designs, and computational models demonstrated across this portfolio remain the professional property of Shadat Hossen Mahin unless explicitly transferred under formal corporate contract or research license. Commercial inquiries, consultancy scopes, and industrial technical audits are subject to signed bilateral NDAs and professional service agreements."
    },
    privacy: {
      title: "Privacy & Data Protection Policy",
      body: "Direct inquiries, transmitted contact forms, and client communications sent through this platform are encrypted in transit and handled with strict confidentiality. No telemetry, recruiter contact info, or correspondence details are monetized, shared with third-party data brokers, or used for external machine learning training without express written consent."
    },
    ethics: {
      title: "Research Ethics & Academic Transparency",
      body: "Experimental textile data, FTIR spectrums, tensile mechanical tests, composite sample analyses, and biochemical trial logs adhere to international engineering integrity standards. All open-access publications, MATLAB computational scripts, and technical dossiers represent verified academic research conducted in accordance with institutional guidelines."
    }
  };

  return (
    <footer className="bg-[#0D1114] text-[#D9DEE2] border-t border-[#2B3238] relative z-10 overflow-hidden select-none">
      {/* Ambient subtle top edge gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1769AA]/40 to-transparent" />
      
      {/* Upper Navigation & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-[#2B3238]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-[#D9DEE2] font-mono tracking-tight text-center md:text-left">
            <span>&copy; {currentYear} Shadat Mahin</span>
            <span className="text-[#5C6670]">|</span>
            <span className="text-[#5C6670]">All Rights Reserved</span>
          </div>

          {/* Right: Legal & Policy links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-[#D9DEE2] font-medium">
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:text-white"
            >
              Terms and Conditions
            </button>
            <span className="text-[#5C6670] select-none">•</span>
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:text-white"
            >
              Privacy Policy
            </button>
            <span className="text-[#5C6670] select-none">•</span>
            <button
              onClick={() => setActiveModal("ethics")}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:text-white"
            >
              Research Statement
            </button>
          </div>
        </div>
      </div>

      {/* Massive Brand Watermark Section */}
      <div className="relative w-full overflow-hidden flex items-center justify-center pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-8 pointer-events-none">
        {/* Subtle radial glow centered behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#1769AA]/5 blur-3xl rounded-full" />
        
        <h1 
          className="text-[8.2vw] sm:text-[9vw] md:text-[9.6vw] lg:text-[10vw] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#2B3238] via-[#161A1D] to-[#0D1114] leading-none whitespace-nowrap select-none text-center"
          style={{
            letterSpacing: "-0.035em",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          SHADAT MAHIN
        </h1>
      </div>

      {/* Policy / Legal Detail Modal */}
      {activeModal && policyContent[activeModal] && (
        <div 
          className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-[#0D1114]/85 backdrop-blur-md animate-fade-in pointer-events-auto"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-lg bg-[#161A1D] border border-[#2B3238] rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#2B3238] pb-4">
              <div className="flex items-center gap-2.5 text-[#1769AA]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                  {policyContent[activeModal].title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-[#2B3238] text-[#D9DEE2] hover:text-white transition-colors cursor-pointer focus:outline-none"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#D9DEE2] leading-relaxed">
              {policyContent[activeModal].body}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full bg-[#1769AA] hover:bg-[#125386] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus:ring-2 focus:ring-[#1769AA]/50"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

