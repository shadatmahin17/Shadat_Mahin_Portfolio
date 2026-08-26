/**
 * Public asset URLs. Keep the matching files in public/Images so Vite includes
 * them in the production build without changing their deployed paths.
 */
export const assetPaths = {
  logo: "/Images/brand-logo.png",
  siteIcon: "/Images/site-icon.png",
  profilePhoto: "/Images/profile-photo.png",
  resume: "/Images/resume.pdf",
  aerospaceCertificate: "/Images/aerospace-certificate.pdf",
  matlabCertificate: "/Images/matlab-certificate.pdf",
  fashionDesignCertificate: "/Images/fashion-design-certificate.jpeg",
} as const;
