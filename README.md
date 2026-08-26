# Shadat Mahin | Engineer & Materials Researcher Portfolio

A modern, high-performance portfolio application showcasing engineering milestones, research publications, composite material innovations, and commercial client operations for **Shadat Hossen Mahin** (Textile Engineer & Advanced Materials Researcher).

---

## 🌟 Key Features

- **Interactive Project & Research Showcase**: Filterable portfolio covering smart textiles, composite materials, sustainable wet-processing, and aerospace applications with rich technical dossiers.
- **Embedded PDF & Certificate Dossier**: Built-in modal viewer for inspecting certified training credentials (Aerospace, MATLAB, Fashion Design) and full CV previews.
- **AI Recruiter Twin**: Smart interactive conversational agent capable of answering technical queries regarding engineering backgrounds, publications, skill matrices, and scheduling consultations.
- **Google Sheets & Automated Inquiry Pipeline**: Direct contact form integration that logs submissions to Google Sheets with automatic email notifications.
- **Lightweight Architecture**: High-speed, client-side rendering with Tailwind CSS, Lucide icons, and Motion animations.

---

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Motion (`motion/react`)
- **Backend & AI**: Google Gemini API integration & Google Apps Script Webhooks

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shadat-mahin-portfolio.git
   cd shadat-mahin-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your keys:
   - `GEMINI_API_KEY`: (Optional) Your Gemini API key for server-side AI features.
   - `VITE_GOOGLE_SHEET_WEBHOOK_URL`: (Optional) Webhook URL for Google Sheets inquiry logging.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`.

---

## 📂 Project Structure

```
├── public/
│   └── Images/              # Brand logo, profile portrait, resume, and certificate assets
├── src/
│   ├── assets/              # 3D graphical icons and visual elements
│   ├── components/          # Reusable UI components (Hero, Gallery, Timeline, AI Twin, Footer)
│   ├── data/                # Structured engineering projects and publications data
│   ├── lib/                 # Asset path mapping and assistant reasoning engine
│   ├── types.ts             # TypeScript interface and type declarations
│   ├── App.tsx              # Main application shell & view controllers
│   ├── index.css            # Tailwind CSS directives and global theme styles
│   └── main.tsx             # React DOM entry point
├── GOOGLE_SHEETS_SETUP.md   # Step-by-step webhook & Google Sheet integration guide
├── package.json             # Scripts and package dependencies
└── vite.config.ts           # Vite configuration
```

---

## 📄 License

All research data, publications, and engineering portfolios &copy; 2026 Shadat Mahin. All Rights Reserved.
