import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Training } from "../types";
import icon3dAeroplane from "../assets/images/icon_3d_aeroplane_1787633159138.jpg";
import icon3dMatlab from "../assets/images/icon_3d_matlab_1787633171652.jpg";
import icon3dFashion from "../assets/images/icon_3d_fashion_new_1787633997108.jpg";
import { 
  X, 
  Download, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Plane, 
  Code, 
  Palette, 
  Award
} from "lucide-react";

interface CertificateModalProps {
  certificate: Training | null;
  allCertificates: Training[];
  onClose: () => void;
  onSelectCertificate: (cert: Training) => void;
}

export default function CertificateModal({
  certificate,
  allCertificates,
  onClose,
  onSelectCertificate
}: CertificateModalProps) {
  // Lock body scroll and handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!certificate) return null;

  const currentIndex = allCertificates.findIndex(
    (c) => c.title === certificate.title || c.id === certificate.id
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectCertificate(allCertificates[currentIndex - 1]);
    } else {
      onSelectCertificate(allCertificates[allCertificates.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allCertificates.length - 1) {
      onSelectCertificate(allCertificates[currentIndex + 1]);
    } else {
      onSelectCertificate(allCertificates[0]);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "plane":
        return <Plane className="w-4 h-4 text-[#C9A34E]" />;
      case "code":
        return <Code className="w-4 h-4 text-[#C9A34E]" />;
      case "palette":
        return <Palette className="w-4 h-4 text-[#C9A34E]" />;
      default:
        return <Award className="w-4 h-4 text-[#C9A34E]" />;
    }
  };

  const fileUrl = certificate.fileUrl;
  const isPdf = fileUrl?.toLowerCase().endsWith(".pdf") || certificate.fileType === "pdf";

  const icon3dSrc = 
    certificate.icon === "plane" 
      ? icon3dAeroplane 
      : certificate.icon === "code" 
        ? icon3dMatlab 
        : icon3dFashion;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-neutral-900 border border-[#C9A34E]/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(201,163,78,0.3)] border border-[#C9A34E]/30 shrink-0 bg-neutral-950 flex items-center justify-center">
              <img 
                src={icon3dSrc} 
                alt={`${certificate.title} 3D icon`} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                {certificate.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Pagination Controls */}
            <div className="flex items-center bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-0.5">
              <button
                onClick={handlePrev}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                title="Previous certificate"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-semibold text-neutral-300 px-2 select-none">
                {currentIndex + 1} / {allCertificates.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                title="Next certificate"
                aria-label="Next certificate"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct File Actions */}
            {fileUrl && (
              <>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 rounded-xl transition-all hidden sm:flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Open in new window"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#E5C97A]" />
                  <span>Open</span>
                </a>
                <a
                  href={fileUrl}
                  download={isPdf ? `${certificate.id || "certificate"}.pdf` : `${certificate.id || "certificate"}.jpeg`}
                  className="p-2 bg-[#C9A34E] hover:bg-[#d6b15e] text-neutral-950 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-sm"
                  title="Download Certificate"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Download</span>
                </a>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-3 sm:p-5 overflow-y-auto bg-neutral-950 flex-1 flex flex-col items-center justify-center">
          {fileUrl ? (
            isPdf ? (
              /* Original PDF Viewer */
              <div className="w-full h-[68vh] min-h-[480px] bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-inner flex flex-col">
                <object
                  data={`${fileUrl}#toolbar=1&navpanes=0`}
                  type="application/pdf"
                  className="w-full h-full rounded-xl bg-neutral-900"
                >
                  <iframe
                    src={`${fileUrl}#toolbar=1`}
                    title={`${certificate.title} PDF`}
                    className="w-full h-full border-none rounded-xl"
                  />
                </object>
              </div>
            ) : (
              /* Original Image Viewer */
              <div className="w-full min-h-[480px] max-h-[68vh] flex items-center justify-center p-2">
                <img 
                  src={fileUrl} 
                  alt={`${certificate.title} Certificate`}
                  className="max-h-[66vh] w-auto max-w-full object-contain rounded-xl border border-neutral-800 shadow-2xl"
                />
              </div>
            )
          ) : (
            <div className="p-8 text-center text-neutral-400">
              <p>Certificate document is loading...</p>
            </div>
          )}
        </div>

        {/* Certificate Navigation Footer */}
        <div className="px-4 sm:px-6 py-3 bg-neutral-950 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Certificate Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
            {allCertificates.map((cert, idx) => (
              <button
                key={idx}
                onClick={() => onSelectCertificate(cert)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all text-xs flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  cert.title === certificate.title
                    ? "bg-[#C9A34E]/20 text-[#E5C97A] border border-[#C9A34E]/40 font-bold"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent"
                }`}
              >
                <span>{cert.institution}</span>
                <span>&bull;</span>
                <span className="line-clamp-1">{cert.title.split("(")[0].split(":")[0]}</span>
              </button>
            ))}
          </div>

          {/* Close Action */}
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold transition-colors cursor-pointer ml-auto"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
