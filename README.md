# Albar Fahrezi — Portfolio

Personal portfolio of **Albar Fahrezi**, Fullstack Developer. It collects my internship (PKL) journey, certificates, education, and the backend projects I built with Laravel.

**Live demo:** [albar-fahrezi-portfolio.vercel.app](https://albar-fahrezi-portfolio.vercel.app)

<!-- TODO: add a screenshot of the hero section here -->

## Features

- Bilingual interface (Indonesian / English) with an instant language switch
- Intro screen that greets visitors in 13 languages
- Hero with parallax layers: large name behind a cut-out photo, reacting to mouse and scroll
- Interactive canvas background (network of nodes, data packets, cursor reactions)
- Scroll reveal animations, animated timeline, and count-up statistics
- Certificate gallery with a full-size lightbox
- Education cards that turn from grayscale to color on hover
- Project detail pages with an animated terminal showing sample API requests and responses
- Smooth scrolling, scroll progress bar, and back-to-top button
- Respects `prefers-reduced-motion`
- Responsive layout for desktop and mobile

## Projects Featured

| Project | Stack |
| --- | --- |
| [Authentication API](https://github.com/AlbarFahrezi/Authentication-Server-API) | Laravel, PHP, MySQL, Sanctum |
| [Inventory Management API](https://github.com/AlbarFahrezi/Inventory-Stock-Management-API) | Laravel, PHP, MySQL, REST API |
| [Approval Workflow System](https://github.com/AlbarFahrezi/approval_workflow_api) | Laravel, React, MySQL, REST API |

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

Requirements: Node.js 20 or newer.

```bash
# clone the repository
git clone https://github.com/AlbarFahrezi/Portfolio-.git
cd Portfolio-

# install dependencies
npm install

# start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── components/        # Hero, animations, language provider, helpers
├── projects/          # Project detail pages
├── globals.css        # Global styles and animations
├── layout.tsx
├── page.tsx           # Home page
└── template.tsx       # Page transition and intro loader
public/
└── images/            # Photos, certificates, school logos
```

## Deployment

Every push to the `main` branch is deployed automatically by Vercel.

## Contact

- Email: [albarfahrezi7@gmail.com](mailto:albarfahrezi7@gmail.com)
- LinkedIn: [Albar Fahrezi](https://www.linkedin.com/in/albar-fahrezi-65b30a395/)
- GitHub: [@AlbarFahrezi](https://github.com/AlbarFahrezi)
- Instagram: [@rzexxtr](https://www.instagram.com/rzexxtr/)

---

© 2026 Albar Fahrezi. All rights reserved.
