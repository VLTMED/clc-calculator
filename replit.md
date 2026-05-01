# Cooling & Heating Load Calculator (حساب أحمال التبريد والتكييف)

## Project Overview

A web application for calculating cooling/heating loads based on ASHRAE tables. The UI is in Arabic (RTL). It supports load calculations for walls/roof/floor conduction, solar/glass radiation, internal gains (people/lighting/equipment), product/storage cold-room gains, and air loads.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui-style components (Radix UI)
- **Charts:** Recharts
- **Package Manager:** npm

## Project Structure

- `src/main.tsx` — React entry point (RTL/Arabic setup)
- `src/App.tsx` — Main UI, inputs state, calculation trigger, results panel
- `src/engine/` — Calculation logic (`calculator.ts`, `fullCalculator.ts`)
- `src/types/` — TypeScript types (`inputs.ts`)
- `src/data/` — ASHRAE/material/product lookup tables
- `src/sections/` — UI input sections/tabs
- `src/components/ui/` — Shared UI components
- `public/fonts/` — Arabic fonts (ThmanyahSans, ThmanyahSerifDisplay)

## Development

```bash
npm install
npm run dev
```

App runs on port 5000 at `0.0.0.0`.

## Deployment

Configured as a static site:
- **Build:** `npm run build`
- **Public Dir:** `dist`
