# Wallet Flow Visualizer

An interactive self-custody wallet flow visualizer built with React and React Flow. This tool helps visualize and document wallet UX patterns, security checkpoints, error states, and user friction points.

## Features

- **Visual Flow Diagrams**: Node-based diagrams for major self-custody patterns
  - Wallet Creation
  - Sending
  - Receiving
  - Recovery
  - Multi-Sig
  - Hardware Wallet Integration
  - DApp Connection

- **Detailed Annotations**: Each node includes:
  - User actions
  - System responses
  - Common errors
  - UX considerations and best practices
  - Security levels
  - Estimated time

- **Interactive Exploration**: Click any node to see detailed UX notes and design patterns

- **Filtering System**: Filter flows by:
  - Wallet type (hot/cold/multi-sig/hardware)
  - Experience level (beginner/intermediate/advanced)
  - Security model (standard/enhanced/maximum)
  - Flow category

- **Export Functionality**:
  - PNG for presentations
  - PDF for documentation
  - JSON for data portability

- **Professional Design**: Clean, accessible design system suitable for design research

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/web/
├── src/
│   ├── components/       # React components
│   │   ├── FlowNode.tsx           # Custom node component
│   │   ├── FlowVisualizer.tsx     # Main visualizer component
│   │   ├── NodeDetailPanel.tsx    # Detailed node information panel
│   │   ├── FilterPanel.tsx        # Filtering controls
│   │   └── ExportToolbar.tsx      # Export functionality
│   ├── flows/           # Flow definitions
│   │   └── walletCreationFlow.ts  # Wallet creation flow data
│   ├── types/           # TypeScript types
│   │   └── flow.ts               # Flow data structures
│   ├── utils/           # Utility functions
│   │   └── export.ts             # Export helpers
│   ├── styles/          # CSS styles
│   │   ├── globals.css           # Global styles and design system
│   │   └── flow.css              # React Flow customizations
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## Adding New Flows

To add a new wallet flow:

1. Create a new file in `src/flows/` (e.g., `sendingFlow.ts`)
2. Define the flow using the `WalletFlow` type:

```typescript
import { WalletFlow } from '../types/flow';

export const sendingFlow: WalletFlow = {
  metadata: {
    id: 'sending-flow',
    title: 'Sending Crypto Flow',
    category: 'sending',
    description: 'Flow for sending cryptocurrency',
    walletTypes: ['hot', 'hardware'],
    experienceLevel: ['beginner', 'intermediate'],
    securityModel: ['standard', 'enhanced'],
    tags: ['transaction', 'security'],
    version: '1.0.0'
  },
  nodes: [
    // Define your nodes here
  ],
  edges: [
    // Define your edges here
  ]
};
```

3. Import and use it in `App.tsx`

## Node Types

- **start**: Beginning of a flow
- **action**: User or system action
- **security-checkpoint**: Critical security moment
- **decision**: Branching point in the flow
- **error**: Error state
- **success**: Successful completion
- **ux-friction**: Point of user friction or confusion

## UX Note Types

- **consideration**: Important UX consideration
- **best-practice**: Recommended best practice
- **common-mistake**: Common mistake to avoid
- **security-tip**: Security-related guidance

## Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **React Flow**: Node-based diagram library
- **Vite**: Build tool and dev server
- **Lucide React**: Icon library
- **html-to-image**: PNG export
- **jsPDF**: PDF export

## Design Tokens

The application uses CSS custom properties for consistent theming:

- Colors: Primary, success, warning, error, security, friction
- Spacing: xs, sm, md, lg, xl, 2xl
- Typography: Multiple font sizes and families
- Shadows: sm, md, lg, xl
- Border radius: sm, md, lg, xl, 2xl

## Browser Support

Modern browsers with ES2020 support:
- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## License

[Your License Here]
