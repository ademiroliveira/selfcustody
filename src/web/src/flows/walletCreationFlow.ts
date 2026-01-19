import { WalletFlow } from '../types/flow';

export const walletCreationFlow: WalletFlow = {
  metadata: {
    id: 'wallet-creation-flow',
    title: 'Wallet Creation Flow',
    category: 'wallet-creation',
    description: 'Complete flow for creating a new self-custody wallet, including seed phrase generation, backup, and verification.',
    walletTypes: ['hot', 'cold', 'hardware'],
    experienceLevel: ['beginner', 'intermediate', 'advanced'],
    securityModel: ['standard', 'enhanced', 'maximum'],
    tags: ['onboarding', 'seed-phrase', 'backup', 'security'],
    version: '1.0.0'
  },
  nodes: [
    {
      id: 'start',
      label: 'Start: Create Wallet',
      type: 'start',
      description: 'User initiates wallet creation process',
      userAction: 'Click "Create New Wallet" button',
      systemResponse: 'Display wallet type selection',
      uxNotes: [
        {
          title: 'First Impression',
          description: 'This is often a user\'s first interaction with crypto. Clear, simple language is critical.',
          type: 'best-practice',
          references: ['https://www.nngroup.com/articles/first-impressions/']
        },
        {
          title: 'Anxiety Management',
          description: 'Users are often anxious about making mistakes with crypto. Provide reassurance early.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'wallet-type-selection',
      label: 'Select Wallet Type',
      type: 'action',
      description: 'User chooses between hot wallet, hardware wallet, or multi-sig',
      userAction: 'Select wallet type from options',
      systemResponse: 'Show security tradeoffs and proceed to setup',
      commonErrors: [
        'User unclear about differences between wallet types',
        'Insufficient explanation of security implications'
      ],
      uxNotes: [
        {
          title: 'Educational Moment',
          description: 'Most users don\'t understand wallet types. Provide clear comparisons with security levels.',
          type: 'best-practice'
        },
        {
          title: 'Default Recommendation',
          description: 'Suggest the safest option for new users while allowing advanced options.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'security-education',
      label: 'Security Education',
      type: 'security-checkpoint',
      description: 'Critical education about seed phrase security',
      userAction: 'Read security information and acknowledge',
      systemResponse: 'Display key security principles with examples',
      securityLevel: 'critical',
      estimatedTime: '2-3 minutes',
      uxNotes: [
        {
          title: 'Retention Challenge',
          description: 'Users often skip or quickly dismiss security warnings. Make it engaging, not just scary.',
          type: 'common-mistake'
        },
        {
          title: 'Visual Learning',
          description: 'Use illustrations and examples. "Your seed phrase is like a master key" resonates better than technical explanations.',
          type: 'best-practice'
        },
        {
          title: 'Checkpoint Pattern',
          description: 'Consider requiring user to answer a quick quiz before proceeding to ensure comprehension.',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'friction-skip-education',
      label: 'UX Friction: Skip Temptation',
      type: 'ux-friction',
      description: 'Users may try to skip security education',
      userAction: 'Attempt to skip or quickly dismiss warnings',
      systemResponse: 'Require acknowledgment or brief quiz',
      commonErrors: [
        'Users skip without reading',
        'Information overload causes disengagement'
      ],
      uxNotes: [
        {
          title: 'Balance Required',
          description: 'Too many warnings desensitize users. Too few leave them vulnerable. Find the minimum effective dose.',
          type: 'consideration'
        },
        {
          title: 'Progressive Disclosure',
          description: 'Present critical info first, allow users to expand for details.',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'generate-seed',
      label: 'Generate Seed Phrase',
      type: 'action',
      description: 'System generates cryptographically secure seed phrase',
      userAction: 'Click "Generate Seed Phrase"',
      systemResponse: 'Generate and display 12 or 24 word seed phrase',
      securityLevel: 'critical',
      uxNotes: [
        {
          title: 'Entropy Source',
          description: 'Users may not trust the randomness. Explain the process or allow user entropy contribution.',
          type: 'consideration'
        },
        {
          title: '12 vs 24 Words',
          description: 'Default to 12 words for beginners (easier to backup), offer 24 for advanced users.',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'display-seed',
      label: 'Display Seed Phrase',
      type: 'security-checkpoint',
      description: 'Show seed phrase with security warnings',
      userAction: 'View and prepare to write down seed phrase',
      systemResponse: 'Display words in numbered order with copy/screenshot warnings',
      securityLevel: 'critical',
      commonErrors: [
        'User screenshots seed phrase',
        'User takes photo with phone',
        'User copies to clipboard and pastes in insecure location'
      ],
      uxNotes: [
        {
          title: 'Screenshot Detection',
          description: 'Detect screenshot attempts and warn users. Consider blocking screenshots on mobile.',
          type: 'security-tip'
        },
        {
          title: 'Environmental Awareness',
          description: 'Remind users to check their surroundings for cameras and people.',
          type: 'security-tip'
        },
        {
          title: 'Clear Visibility',
          description: 'Use large, readable font. Number each word. Consider grouping (3 columns of 4 words).',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'friction-backup-difficulty',
      label: 'UX Friction: Backup Difficulty',
      type: 'ux-friction',
      description: 'Users struggle with secure backup method',
      userAction: 'Attempt to backup seed phrase',
      systemResponse: 'Provide backup guidance',
      commonErrors: [
        'Don\'t have paper and pen handy',
        'Uncertain about where to store backup',
        'Write down words incorrectly'
      ],
      uxNotes: [
        {
          title: 'Backup Method Guidance',
          description: 'Explicitly suggest: metal plate > paper in safe > paper in multiple locations > digital (encrypted)',
          type: 'best-practice'
        },
        {
          title: 'Pause & Resume',
          description: 'Allow users to pause here and return later if they need to get materials.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'backup-confirmation',
      label: 'Confirm Backup',
      type: 'action',
      description: 'User confirms they have backed up seed phrase',
      userAction: 'Check "I have written down my seed phrase"',
      systemResponse: 'Proceed to verification',
      uxNotes: [
        {
          title: 'Trust but Verify',
          description: 'Don\'t just accept a checkbox. Always verify in the next step.',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'verify-seed',
      label: 'Verify Seed Phrase',
      type: 'security-checkpoint',
      description: 'User must prove they backed up correctly',
      userAction: 'Enter specific words from seed phrase (e.g., word #3, #7, #12)',
      systemResponse: 'Validate entered words',
      securityLevel: 'high',
      commonErrors: [
        'Words entered in wrong order',
        'Typos in word entry',
        'User didn\'t actually write it down'
      ],
      uxNotes: [
        {
          title: 'Verification Method',
          description: 'Asking for 3-4 random words is sufficient. Full phrase re-entry is tedious and error-prone.',
          type: 'best-practice'
        },
        {
          title: 'Word Validation',
          description: 'BIP39 has specific word list. Validate against it and suggest corrections for typos.',
          type: 'consideration'
        },
        {
          title: 'Retry UX',
          description: 'If verification fails, don\'t start over. Allow user to view seed again and retry.',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'verification-failed',
      label: 'Verification Failed',
      type: 'error',
      description: 'User entered incorrect words',
      userAction: 'Review error and choose to retry or view seed again',
      systemResponse: 'Show which words were incorrect, offer to display seed again',
      commonErrors: [
        'User gets frustrated and gives up',
        'User loses confidence in the process'
      ],
      uxNotes: [
        {
          title: 'Helpful Error Messages',
          description: 'Don\'t just say "wrong". Explain possible issues: typo, wrong order, wrong word.',
          type: 'best-practice'
        },
        {
          title: 'Attempt Limit',
          description: 'Consider limiting verification attempts to prevent brute force, but keep limit high (10+).',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'set-password',
      label: 'Set Wallet Password',
      type: 'action',
      description: 'User creates password for app access',
      userAction: 'Enter and confirm password',
      systemResponse: 'Validate password strength',
      securityLevel: 'high',
      commonErrors: [
        'Password too weak',
        'Password doesn\'t match confirmation',
        'User forgets password immediately'
      ],
      uxNotes: [
        {
          title: 'Password vs Seed Phrase',
          description: 'Clearly explain: password is for app access, seed phrase is for recovery. Different purposes.',
          type: 'best-practice'
        },
        {
          title: 'Strength Requirements',
          description: 'Enforce minimum strength but don\'t be draconian. Consider passphrase option.',
          type: 'consideration'
        },
        {
          title: 'Biometric Alternative',
          description: 'On mobile, offer biometric auth as alternative to password entry.',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'biometric-setup',
      label: 'Optional: Biometric Setup',
      type: 'action',
      description: 'Configure fingerprint or face recognition',
      userAction: 'Enable biometric authentication',
      systemResponse: 'Configure device biometric',
      uxNotes: [
        {
          title: 'Security Tradeoff',
          description: 'Biometrics are convenient but less secure than strong password. Explain the tradeoff.',
          type: 'consideration'
        },
        {
          title: 'Keep Password Required',
          description: 'Biometrics should augment, not replace password. User still needs password for recovery.',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'wallet-generation',
      label: 'Generate Wallet',
      type: 'action',
      description: 'System derives wallet addresses from seed',
      userAction: 'Wait for wallet generation',
      systemResponse: 'Derive addresses, initialize wallet storage',
      estimatedTime: '5-10 seconds',
      uxNotes: [
        {
          title: 'Loading State',
          description: 'Show progress indicator. List steps: "Generating keys", "Deriving addresses", "Initializing storage".',
          type: 'best-practice'
        },
        {
          title: 'Technical Transparency',
          description: 'For advanced users, offer option to see technical details (derivation path, etc.).',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'generation-error',
      label: 'Generation Error',
      type: 'error',
      description: 'Technical error during wallet creation',
      userAction: 'Read error message and retry',
      systemResponse: 'Display error details and retry option',
      commonErrors: [
        'Storage full',
        'Crypto library error',
        'Network connection lost (for multi-sig coordination)'
      ],
      uxNotes: [
        {
          title: 'Error Recovery',
          description: 'Preserve user\'s seed phrase and password. Don\'t make them start over.',
          type: 'best-practice'
        },
        {
          title: 'Support Information',
          description: 'Provide error code and way to contact support for persistent issues.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'success',
      label: 'Wallet Created',
      type: 'success',
      description: 'Wallet successfully created and ready to use',
      userAction: 'View wallet address and explore',
      systemResponse: 'Show wallet address, balance (0), and next steps',
      uxNotes: [
        {
          title: 'Celebration Moment',
          description: 'Acknowledge accomplishment. Creating a wallet is intimidating for new users.',
          type: 'best-practice'
        },
        {
          title: 'Next Steps',
          description: 'Guide user: "Now you can receive crypto" with clear CTA to view receive address.',
          type: 'best-practice'
        },
        {
          title: 'Backup Reminder',
          description: 'Show storage location suggestion one more time. Consider periodic backup reminders.',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'onboarding-tour',
      label: 'Optional: App Tour',
      type: 'action',
      description: 'Brief tour of app features',
      userAction: 'Navigate through app tour',
      systemResponse: 'Highlight key features: Send, Receive, Settings, Backup',
      uxNotes: [
        {
          title: 'Keep It Short',
          description: 'Maximum 3-4 screens. Users can explore on their own.',
          type: 'best-practice'
        },
        {
          title: 'Skippable',
          description: 'Always allow skipping. Some users prefer to explore.',
          type: 'consideration'
        }
      ]
    }
  ],
  edges: [
    // Happy Path
    { id: 'e1', source: 'start', target: 'wallet-type-selection', label: 'Primary Flow' },
    { id: 'e2', source: 'wallet-type-selection', target: 'security-education', label: 'Type Selected' },
    { id: 'e3', source: 'security-education', target: 'generate-seed', label: 'Acknowledged' },
    { id: 'e4', source: 'generate-seed', target: 'display-seed', label: 'Generated' },
    { id: 'e5', source: 'display-seed', target: 'backup-confirmation', label: 'Viewed' },
    { id: 'e6', source: 'backup-confirmation', target: 'verify-seed', label: 'Confirmed' },
    { id: 'e7', source: 'verify-seed', target: 'set-password', label: 'Verified' },
    { id: 'e8', source: 'set-password', target: 'wallet-generation', label: 'Password Set' },
    { id: 'e9', source: 'wallet-generation', target: 'success', label: 'Complete' },
    { id: 'e10', source: 'success', target: 'onboarding-tour', label: 'Optional', type: 'alternative' },

    // Biometric Alternative Path
    { id: 'e11', source: 'set-password', target: 'biometric-setup', label: 'Offer Biometric', type: 'alternative' },
    { id: 'e12', source: 'biometric-setup', target: 'wallet-generation', label: 'Configured' },

    // Error Paths
    { id: 'e13', source: 'verify-seed', target: 'verification-failed', label: 'Incorrect', type: 'error' },
    { id: 'e14', source: 'verification-failed', target: 'display-seed', label: 'View Again', type: 'error' },
    { id: 'e15', source: 'verification-failed', target: 'verify-seed', label: 'Retry', type: 'error' },
    { id: 'e16', source: 'wallet-generation', target: 'generation-error', label: 'Failed', type: 'error' },
    { id: 'e17', source: 'generation-error', target: 'wallet-generation', label: 'Retry', type: 'error' },

    // UX Friction Points
    { id: 'e18', source: 'security-education', target: 'friction-skip-education', label: 'Skip Attempt', type: 'alternative' },
    { id: 'e19', source: 'friction-skip-education', target: 'generate-seed', label: 'Forced Continue' },
    { id: 'e20', source: 'display-seed', target: 'friction-backup-difficulty', label: 'Needs Help', type: 'alternative' },
    { id: 'e21', source: 'friction-backup-difficulty', target: 'backup-confirmation', label: 'Resolved' }
  ]
};
