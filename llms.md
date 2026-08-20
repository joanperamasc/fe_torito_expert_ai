# Torito Expert AI - LLM Context

This file provides context for Large Language Models (LLMs) and AI coding assistants working on this repository to quickly understand the domain logic, tech stack, and architectural decisions.

## 1. Project Overview
**Name:** Torito 1 Millón Expert AI
**Description:** A high-performance web application designed to perform statistical analysis and generate predictive combinations for the Peruvian lottery "Torito 1 Millón". 
**Core Domain Logic:**
- The lottery uses **42 balls** (numbers 1 to 42).
- A valid combination consists of **6 numbers**.
- **Historical Data:** Stored in `/public/data/torito.json`. The engine parses this file on the client-side to calculate real-time frequencies, gaps (rezagados), and historical intersections.

## 2. Tech Stack
- **Framework:** [Astro](https://astro.build/) (Static Site Generation for SEO and performance).
- **Interactivity:** [React 18+](https://react.dev/) (Used exclusively for dynamic UI components and state management).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Inline utilities, zero custom CSS).
- **Language:** TypeScript.

## 3. Predictive Engine (`src/components/ToritoExpert.tsx`)
The engine generates combinations iteratively and passes them through rigorous mathematical filters (scoring system) until it finds a highly probable ticket.
**Key Filters:**
1. **Sum Filter (Campana de Gauss):** The sum of the 6 balls must fall within the ideal bell curve. For 42 balls, the absolute limit is 80-180, but the **ideal target range is 100-155**.
2. **Parity (Odd/Even):** Rejects combinations with 6 odds or 6 evens. Prefers balanced tickets like 3/3 or 4/2.
3. **Decades:** Rejects combinations clustering 4 or more numbers in the same decade.
4. **Consecutives:** Rejects combinations with more than 2 consecutive numbers.
5. **Anti-Clones:** The generated ticket cannot exactly match any historical winning ticket.

## 4. Design System & UI Guidelines
- **Aesthetic:** "Premium AI Dark Mode" infused with the official Torito branding. 
- **Colors:** Deep/Vibrant Reds (`red-600` to `red-950`) for backgrounds and panels, accented with Bright Yellows (`yellow-400`, `yellow-500`) for highlights, borders, and CTA buttons. 
- **Rule:** Do NOT use generic colors (like basic blue, gray/slate, or green) for main layouts. Stick to the Torito Red/Yellow palette.
- **Glassmorphism:** Use `backdrop-blur` and translucent backgrounds (`bg-red-950/60`) for floating panels.
- **Micro-interactions:** Elements should feel alive. Use `hover:-translate-y-x`, glowing shadows (`shadow-[0_0_15px_rgba(...)]`), and smooth transitions.

## 5. Coding Rules
- **Astro Islands:** Any React component that requires client-side JavaScript (`useState`, `useEffect`, `onClick`) MUST be hydrated in Astro files using the `client:load` or `client:visible` directive. 
  - *Correct:* `<ToritoExpert client:load />`
  - *Incorrect:* `<ToritoExpert />`
- **TypeScript:** Strictly type interfaces and API responses. Avoid `any`.
- **CSS:** Avoid the `@apply` directive in `global.css`. Build UI using purely inline Tailwind utility classes.
