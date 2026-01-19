# Wallet Flow Visualizer

An interactive self-custody wallet flow visualizer built with React and React Flow. This tool visualizes and documents wallet UX patterns, security checkpoints, error states, and user friction points for design research and development.

## Overview

The Wallet Flow Visualizer is located in `/src/web` and provides a comprehensive, interactive way to explore self-custody wallet user experiences. It's designed for:

- **Product Designers**: Understanding UX patterns and friction points
- **Developers**: Implementing wallet flows with security best practices
- **Researchers**: Documenting and analyzing wallet user experiences
- **Educators**: Teaching crypto wallet concepts and security

## Features

### Visual Flow Diagrams
Interactive node-based diagrams for major self-custody patterns:
- ✅ **Wallet Creation** - Seed phrase generation, backup, and verification
- ✅ **Sending** - Address validation, amount entry, fee selection, confirmation
- 🔄 **Receiving** (template available)
- 🔄 **Recovery** (template available)
- 🔄 **Multi-Sig** (template available)
- 🔄 **Hardware Wallet Integration** (template available)
- 🔄 **DApp Connection** (template available)

### Detailed Annotations
Each node includes:
- **User Actions**: What the user does at this step
- **System Responses**: How the system reacts
- **Common Errors**: Typical mistakes and edge cases
- **UX Notes**: Design patterns, considerations, best practices, security tips
- **Security Levels**: Visual indicators for critical checkpoints
- **Estimated Time**: Time expectations for each step

### Interactive Exploration
- Click any node to see detailed UX notes and design patterns
- Multiple flow types (happy path, error states, alternative paths)
- Visual hierarchy with color-coded node types
- Zoom and pan for detailed inspection

### Filtering System
Filter flows by:
- **Wallet Type**: Hot, Cold, Multi-Sig, Hardware
- **Experience Level**: Beginner, Intermediate, Advanced
- **Security Model**: Standard, Enhanced, Maximum
- **Flow Category**: All major wallet operations
- **Search**: Full-text search across all flow content

### Export Functionality
- **PNG Export**: High-resolution images for presentations
- **PDF Export**: Documentation-ready format
- **JSON Export**: Raw flow data for integration

### Professional Design
- Clean, accessible design system
- Consistent visual language
- Mobile-responsive
- High-quality typography and spacing

## Quick Start

```bash
# Navigate to the web app
cd src/web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/web/
├── src/
│   ├── components/              # React components
│   │   ├── FlowNode.tsx         # Custom node component for React Flow
│   │   ├── FlowVisualizer.tsx   # Main visualizer with layout engine
│   │   ├── NodeDetailPanel.tsx  # Detailed node information panel
│   │   ├── FilterPanel.tsx      # Filtering controls
│   │   └── ExportToolbar.tsx    # Export functionality
│   │
│   ├── flows/                   # Flow definitions
│   │   ├── index.ts             # Flow exports
│   │   ├── walletCreationFlow.ts # Complete wallet creation flow
│   │   └── sendingFlow.ts        # Complete sending flow
│   │
│   ├── types/                   # TypeScript types
│   │   └── flow.ts              # Flow data structures
│   │
│   ├── utils/                   # Utility functions
│   │   └── export.ts            # Export helpers (PNG, PDF, JSON)
│   │
│   ├── styles/                  # CSS styles
│   │   ├── globals.css          # Design system & global styles
│   │   └── flow.css             # React Flow customizations
│   │
│   ├── App.tsx                  # Main app component with flow selector
│   └── main.tsx                 # Entry point
│
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
└── README.md                    # Detailed documentation
```

## Design System

The application uses CSS custom properties for consistent theming:

### Colors
- **Primary**: Blue (#3b82f6) - Actions and links
- **Success**: Green (#10b981) - Positive outcomes
- **Warning**: Orange (#f59e0b) - Cautions and decisions
- **Error**: Red (#ef4444) - Errors and critical issues
- **Security**: Purple (#8b5cf6) - Security checkpoints
- **Friction**: Orange (#f97316) - UX friction points

### Node Types
- **Start**: Beginning of a flow (green)
- **Action**: User or system action (blue)
- **Security Checkpoint**: Critical security moment (purple)
- **Decision**: Branching point (yellow/orange)
- **Error**: Error state (red)
- **Success**: Successful completion (green)
- **UX Friction**: Point of user friction (orange)

### UX Note Types
- **Consideration**: Important UX consideration (yellow)
- **Best Practice**: Recommended best practice (green)
- **Common Mistake**: Common mistake to avoid (red)
- **Security Tip**: Security-related guidance (purple)

## Adding New Flows

### 1. Create Flow File

```typescript
// src/flows/myFlow.ts
import { WalletFlow } from '../types/flow';

export const myFlow: WalletFlow = {
  metadata: {
    id: 'my-flow',
    title: 'My Flow',
    category: 'wallet-creation', // or other category
    description: 'Flow description',
    walletTypes: ['hot', 'hardware'],
    experienceLevel: ['beginner', 'intermediate'],
    securityModel: ['standard', 'enhanced'],
    tags: ['tag1', 'tag2'],
    version: '1.0.0'
  },
  nodes: [
    {
      id: 'start',
      label: 'Start: My Flow',
      type: 'start',
      description: 'Flow begins',
      userAction: 'User clicks button',
      systemResponse: 'System responds',
      uxNotes: [
        {
          title: 'Note Title',
          description: 'Note description',
          type: 'best-practice',
          references: ['https://example.com']
        }
      ]
    }
    // ... more nodes
  ],
  edges: [
    { id: 'e1', source: 'start', target: 'next', label: 'Continue' }
    // ... more edges
  ]
};
```

### 2. Export Flow

```typescript
// src/flows/index.ts
import { myFlow } from './myFlow';

export const flows: WalletFlow[] = [
  walletCreationFlow,
  sendingFlow,
  myFlow  // Add your flow
];
```

### 3. Flow is Automatically Available

The flow will appear in the flow selector automatically.

## Example Flows

### Wallet Creation Flow
Complete flow with 18 nodes covering:
- Wallet type selection
- Security education (critical checkpoint)
- Seed phrase generation and display
- Backup process and verification
- Password setup
- Biometric configuration
- Wallet generation
- Success and onboarding

Includes 3 error paths, 2 UX friction points, and 45+ UX notes.

### Sending Flow
Complete flow with 15 nodes covering:
- Asset selection
- Address entry and validation
- Amount entry with fee calculation
- Fee tier selection
- Transaction review (critical checkpoint)
- Signing and broadcasting
- Confirmation monitoring
- Cancel/speed-up options

Includes 2 error paths, 1 UX friction point, and 30+ UX notes.

## Technology Stack

- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type safety and developer experience
- **React Flow**: Node-based diagram library
- **Vite**: Fast build tool and dev server
- **Lucide React**: Beautiful, consistent icons
- **html-to-image**: PNG export functionality
- **jsPDF**: PDF export functionality

## Browser Support

Modern browsers with ES2020 support:
- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## Development

### Scripts
```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Hot Module Replacement
Vite provides instant HMR for React components, CSS, and TypeScript changes during development.

### Adding Dependencies
```bash
npm install <package-name>
npm install -D <dev-package-name>  # Dev dependency
```

## Production Deployment

### Build Output
```bash
npm run build
```

Generates optimized production build in `/dist`:
- Minified and tree-shaken JavaScript
- Optimized CSS
- Source maps for debugging
- Static assets with cache busting

### Hosting Options
- **Static Hosting**: Deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages)
- **CDN**: Works great behind a CDN
- **Docker**: Include in Docker image for containerized deployment

### Environment Variables
Create `.env.production` for production config:
```env
VITE_APP_TITLE=Wallet Flow Visualizer
VITE_API_URL=https://api.example.com
```

## Future Enhancements

### Additional Flows
- Receiving cryptocurrency
- Wallet recovery flows
- Multi-signature setup
- Hardware wallet pairing
- DApp connection (WalletConnect, MetaMask)
- Token swapping
- NFT management

### Features
- Animation/transition playback
- User testing mode (record actual user paths)
- Comparative flow analysis
- A/B test documentation
- Integration with design tools (Figma)
- Accessibility audit overlay
- Mobile-specific flows
- Dark mode

### Analytics
- Track which nodes get clicked most
- Export usage statistics
- Popular search terms
- Flow complexity metrics

## Contributing

When adding flows:
1. Include comprehensive UX notes
2. Document all error states
3. Identify friction points
4. Add security considerations
5. Include time estimates
6. Reference best practices

## License

[Your License Here]

## Credits

Built with:
- [React](https://react.dev/)
- [React Flow](https://reactflow.dev/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Note**: This is a design research and documentation tool. Actual wallet implementations should follow security best practices and undergo thorough security audits.
