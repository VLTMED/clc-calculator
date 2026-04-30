/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // Logical property utilities that may appear in dynamic strings
    'ms-auto', 'me-auto',
    'ps-8', 'pe-8', 'ps-2', 'pe-2', 'ps-3', 'pe-3',
    'ms-1', 'me-1', 'ms-2', 'me-2',
    'border-s', 'border-e',
    'rounded-s-md', 'rounded-e-md', 'rounded-s-none', 'rounded-e-none',
    'text-start', 'text-end',
    'rtl-flip',
  ],
  theme: {
    extend: {
      fontFamily: {
        // ── Primary (حصري) ──
        // All text defaults to ThmanyahSans — no fallback
        sans:    ['ThmanyahSans'],
        // Display serif for heroes & major headings
        display: ['ThmanyahSerifDisplay'],
        // Named weight aliases for semantic clarity in className
        'th-light':   ['ThmanyahSans'],
        'th-regular': ['ThmanyahSans'],
        'th-medium':  ['ThmanyahSans'],
        'th-bold':    ['ThmanyahSans'],
        'th-black':   ['ThmanyahSans'],
        'th-serif-bold':  ['ThmanyahSerifDisplay'],
        'th-serif-black': ['ThmanyahSerifDisplay'],
      },
      fontSize: {
        // Arabic-optimized type scale
        'display-2xl': ['3.5rem',  { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['2.75rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg':  ['2.25rem', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['1.875rem',{ lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm':  ['1.5rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'heading-lg':  ['1.25rem', { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        'heading-md':  ['1.125rem',{ lineHeight: '1.35', letterSpacing: '-0.005em' }],
        'heading-sm':  ['1rem',    { lineHeight: '1.4',  letterSpacing: '0' }],
        'body-lg':     ['1.0625rem',{ lineHeight: '1.65', letterSpacing: '0' }],
        'body-md':     ['0.9375rem',{ lineHeight: '1.65', letterSpacing: '0' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.6',  letterSpacing: '0' }],
        'caption':     ['0.8125rem',{ lineHeight: '1.55', letterSpacing: '0.01em' }],
        'micro':       ['0.75rem',  { lineHeight: '1.5',  letterSpacing: '0.01em' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:                  "hsl(var(--sidebar-background))",
          foreground:               "hsl(var(--sidebar-foreground))",
          primary:                  "hsl(var(--sidebar-primary))",
          "primary-foreground":     "hsl(var(--sidebar-primary-foreground))",
          accent:                   "hsl(var(--sidebar-accent))",
          "accent-foreground":      "hsl(var(--sidebar-accent-foreground))",
          border:                   "hsl(var(--sidebar-border))",
          ring:                     "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%":     { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "caret-blink":    "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
