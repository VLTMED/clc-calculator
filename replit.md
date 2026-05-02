# Cooling & Heating Load Calculator — CLC v4A (حاسبة الأحمال الحرارية)

## Project Overview

Arabic-first HVAC load calculator built in React 19 + TypeScript + Vite + Tailwind + shadcn/ui.
Fully RTL, mobile-first. 100% faithful rebuild of Dr. Raheem K. Jassim's Excel CLC Version 4A.
Supports: refrigeration mode and air-conditioning mode, all 22 ASHRAE-based tables.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI)
- **Fonts:** Thmanyah Sans (5 weights) + Thmanyah Serif Display (2 weights)
- **Package Manager:** npm

## Project Structure

```
src/
  App.tsx                   — Main layout: header, input columns, sticky results sidebar
  types/inputs.ts           — Complete CLCInputs type + all sub-interfaces (StudentInfo added)
  engine/
    fullCalculator.ts       — Full calculation engine: calculateAll() + calcU()
    defaults.ts             — getDefaultInputs(mode) with all defaults
  data/
    tables.ts               — All 22 tables: MATERIALS, SAUDI_CITIES, GLASS_TYPES, etc.
    products.ts             — 60+ products from Excel tables 2-5 to 2-8
  sections/
    StudentInfo.tsx         — Student/project info fields
    DimensionsSection.tsx   — Room dims, temp conditions, city selector (table 2-4)
    ConstructionSection.tsx — Walls(4 dirs), roof, floor: layers + U display + solar toggle
    GlassSection.tsx        — Glass/windows: direction, type, SC, solar method (16A/16B)
    InternalLoadsSection.tsx — Lighting, people (table 2-20/21), equipment
    ProductSection.tsx      — Product loads (3 independent toggles), packaging, defrost
    AirLoadsSection.tsx     — Infiltration (table 2-11), air changes (2-13), ventilation (2-14)
    ResultsPanel.tsx        — Live results: U-values, all loads, total W/kW/TR
  components/ui/            — shadcn/ui components
public/
  fonts/                    — Arabic fonts (Thmanyah)
  fonts.css                 — Font-face declarations
```

## Calculation Engine

Key formulas (faithful to Excel):
- **U = 1 / (1/hi + Σ(L_i/k_i) + 1/ho)** — per surface
- **Q = U × A × CLTD** — conduction load
- **Q_solar = U × A × DTs** where **DTs = 1.15 × a × I / ho** — solar load (table 2-16A)
- **Product Q = M × Cp × ΔT × 1000 / (3600 × n × CRF)** — 3 independent toggles per Excel E105/F105/G105
- **Short method** — table 2-22 (23 rows, 0.6 to 2800 m³)

## Key Data

- Table 2-1: 11 materials with exact k values
- Table 2-4: Saudi cities with Tdb/Twb
- Tables 2-5 to 2-8: 60+ products (Tf, Cp↑, Cp↓, LH, CRF, humidity)
- Table 2-11: Infiltration rates by volume + temp zone
- Table 2-13: Air changes per day by volume
- Table 2-14: Ventilation rates
- Table 2-16A/B: Solar radiation (16A: cooling CLTD; 16B: monthly by direction)
- Table 2-17: Glass U-values
- Table 2-19: Packaging materials Cp
- Table 2-20/21: People heat gains (AC / refrigeration)
- Table 2-22: Short-method load factors (heavy/medium construction)

## Mode

- **تبريد (Refrigeration):** product loads, air changes, packaging, defrost enabled
- **تكييف (AC):** ventilation, people activity table 2-20 enabled; product section hidden

## Development

```bash
npm install
npm run dev  # port 5000
```

## Deployment

- Build: `npm run build` → `dist/`
- GitHub: https://github.com/VLTMED/clc-calculator (branch: main)
- Push: use Python REST API with personal access token stored in env (write via REST API only)
