Features
Bilingual interface (Indonesian / English) with an instant language switch
Intro screen that greets visitors in 13 languages
Hero with parallax layers: large name behind a cut-out photo, reacting to mouse and scroll
Interactive canvas background (network of nodes, data packets, cursor reactions)
Scroll reveal animations, animated timeline, and count-up statistics
Certificate gallery with a full-size lightbox
Education cards that turn from grayscale to color on hover
Project detail pages with an animated terminal showing sample API requests and responses
Smooth scrolling, scroll progress bar, and back-to-top button
Respects prefers-reduced-motion
Responsive layout for desktop and mobile
Projects Featured
Project	Stack
Authentication API	Laravel, PHP, MySQL, Sanctum
Inventory Management API	Laravel, PHP, MySQL, REST API
Approval Workflow System	Laravel, React, MySQL, REST API
Tech Stack
Next.js (App Router)
React + TypeScript
Tailwind CSS v4
Lenis for smooth scrolling
Deployed on Vercel
Getting Started

Requirements: Node.js 20 or newer.

bash
# clone the repository
git clone https://github.com/AlbarFahrezi/Portfolio-.git
cd Portfolio-

# install dependencies
npm install

# start the development server
npm run dev

Open http://localhost:3000 in your browser.

To create a production build:

bash
npm run build
npm start
Project Structure
app/
├── components/        # Hero, animations, language provider, helpers
├── projects/          # Project detail pages
├── globals.css        # Global styles and animations
├── layout.tsx
├── page.tsx           # Home page
└── template.tsx       # Page transition and intro loader
public/
└── images/            # Photos, certificates, school logos
Deployment

Every push to the main branch is deployed automatically by Vercel.

Contact
Email: albarfahrezi7@gmail.com
LinkedIn: Albar Fahrezi
GitHub: @AlbarFahrezi
Instagram: @rzexxtr
