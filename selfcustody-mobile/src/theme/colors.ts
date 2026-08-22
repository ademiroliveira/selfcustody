// Palette calibrated 2026-04-02 against the Revolut reference.
// See docs/design/taste/2026-04-02-selfcustody-taste.md
//
// The semantic split that governs this file:
//   action.*  near-black — anything that commits the user's money
//   accent.indigo  the agent layer only — AI status, chat, agent glyphs
// Indigo is never a button. Depth comes from surface colour, never shadow.
export const colors = {
  bg: {
    primary: '#f2f2f7',   // screen ground — warm near-white
    secondary: '#f8fafc', // subtle inset within a card
    elevated: '#f1f5f9',
    card: '#ffffff',      // cards sit above the ground by colour alone
  },
  action: {
    primary: '#0f172a',   // CTA fill — mirrors --accent in global.css
    onPrimary: '#ffffff',
    disabled: '#e2e8f0',
    onDisabled: '#94a3b8',
  },
  accent: {
    indigo: '#6366F1',    // agent layer only — not for buttons
    indigoLight: '#818CF8',
    amber: '#D97706',
    rose: '#E11D48',
    sky: '#0284C7',
    green: '#059669',
  },
  text: {
    primary: '#0f172a',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    positive: '#059669',
    negative: '#E11D48',
  },
  agent: {
    idle: '#94a3b8',
    thinking: '#6366F1',
    alert: '#E11D48',
    blocked: '#D97706',
    executing: '#059669',
  },
  border: {
    subtle: '#f1f5f9',
    default: '#e2e8f0',
    strong: '#cbd5e1',
  },
} as const;
