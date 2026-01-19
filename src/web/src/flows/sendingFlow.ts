import { WalletFlow } from '../types/flow';

export const sendingFlow: WalletFlow = {
  metadata: {
    id: 'sending-flow',
    title: 'Sending Cryptocurrency Flow',
    category: 'sending',
    description: 'Complete flow for sending cryptocurrency, including address validation, amount entry, fee selection, and transaction confirmation.',
    walletTypes: ['hot', 'cold', 'hardware', 'multi-sig'],
    experienceLevel: ['beginner', 'intermediate', 'advanced'],
    securityModel: ['standard', 'enhanced', 'maximum'],
    tags: ['transaction', 'security', 'fees', 'confirmation'],
    version: '1.0.0'
  },
  nodes: [
    {
      id: 'start',
      label: 'Start: Send Crypto',
      type: 'start',
      description: 'User initiates sending cryptocurrency',
      userAction: 'Click "Send" button',
      systemResponse: 'Navigate to send screen',
      uxNotes: [
        {
          title: 'Context Matters',
          description: 'Users may arrive at this flow from various contexts: scanning a QR code, clicking a payment link, or manually initiating. The entry point affects UX expectations.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'select-asset',
      label: 'Select Asset',
      type: 'action',
      description: 'Choose which cryptocurrency to send',
      userAction: 'Select asset from list',
      systemResponse: 'Display asset balance and sending options',
      uxNotes: [
        {
          title: 'Balance Visibility',
          description: 'Always show available balance prominently. Users need to know how much they can send.',
          type: 'best-practice'
        },
        {
          title: 'Network Selection',
          description: 'For multi-chain assets (USDT, USDC), force explicit network selection. Wrong network = lost funds.',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'enter-address',
      label: 'Enter Recipient Address',
      type: 'action',
      description: 'Input or paste the recipient\'s address',
      userAction: 'Paste address, scan QR, or select from contacts',
      systemResponse: 'Validate address format',
      securityLevel: 'high',
      commonErrors: [
        'Invalid address format',
        'Wrong network address',
        'Malware clipboard hijacking',
        'Address typo (no checksum)'
      ],
      uxNotes: [
        {
          title: 'Multiple Input Methods',
          description: 'Support paste, QR scan, ENS/domain resolution, and contact selection. Mobile users especially need QR.',
          type: 'best-practice'
        },
        {
          title: 'Clipboard Warning',
          description: 'Warn about clipboard malware. Show first and last 6 characters after paste for user to verify.',
          type: 'security-tip'
        },
        {
          title: 'Visual Validation',
          description: 'Use checksum visualization or identicons. Make it easy to spot differences.',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'address-validation',
      label: 'Validate Address',
      type: 'security-checkpoint',
      description: 'System validates address format and network compatibility',
      userAction: 'Wait for validation',
      systemResponse: 'Check format, checksum, and network compatibility',
      securityLevel: 'critical',
      estimatedTime: '1-2 seconds',
      uxNotes: [
        {
          title: 'Multi-Layer Validation',
          description: 'Validate: (1) Character set (2) Length (3) Checksum (4) Network compatibility (5) Not own address',
          type: 'security-tip'
        },
        {
          title: 'Self-Send Detection',
          description: 'Warn if sending to own address. Usually a mistake.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'address-invalid',
      label: 'Invalid Address Error',
      type: 'error',
      description: 'Address validation failed',
      userAction: 'Read error and correct address',
      systemResponse: 'Show specific error: format, network mismatch, etc.',
      commonErrors: [
        'Bitcoin address for Ethereum wallet',
        'Testnet address on mainnet',
        'Truncated address'
      ],
      uxNotes: [
        {
          title: 'Specific Error Messages',
          description: 'Don\'t just say "invalid". Say WHY: wrong network, bad checksum, too short, etc.',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'enter-amount',
      label: 'Enter Amount',
      type: 'action',
      description: 'Specify how much to send',
      userAction: 'Enter amount in crypto or fiat equivalent',
      systemResponse: 'Show both crypto and fiat values, validate against balance',
      commonErrors: [
        'Insufficient balance',
        'Amount too small (below dust limit)',
        'Not accounting for fees'
      ],
      uxNotes: [
        {
          title: 'Dual Currency Display',
          description: 'Show both crypto amount and fiat equivalent. Update in real-time.',
          type: 'best-practice'
        },
        {
          title: 'Max Button',
          description: 'Provide "Max" or "Send All" button, but subtract estimated fees automatically.',
          type: 'best-practice'
        },
        {
          title: 'Decimal Precision',
          description: 'Support appropriate precision (Bitcoin: 8 decimals, Ethereum: 18 decimals) but don\'t overwhelm users.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'friction-fee-confusion',
      label: 'UX Friction: Fee Confusion',
      type: 'ux-friction',
      description: 'Users confused about fees and total cost',
      userAction: 'Question total cost vs amount',
      systemResponse: 'Clarify fee structure',
      commonErrors: [
        'User thinks amount includes fee',
        'Sticker shock from high fees',
        'Confusion about who pays fee (sender vs receiver)'
      ],
      uxNotes: [
        {
          title: 'Fee Transparency',
          description: 'Show breakdown: Amount + Fee = Total. Always in both crypto and fiat.',
          type: 'best-practice'
        },
        {
          title: 'Fee Explainer',
          description: 'Link to "Why fees?" explainer. Many users don\'t understand blockchain fees vs payment processor fees.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'select-fee',
      label: 'Select Transaction Fee',
      type: 'action',
      description: 'Choose fee level (slow/normal/fast)',
      userAction: 'Select fee tier',
      systemResponse: 'Show estimated confirmation time and cost',
      uxNotes: [
        {
          title: 'Fee Tier Labeling',
          description: 'Use clear labels: "Economy", "Standard", "Priority" better than "Slow/Medium/Fast".',
          type: 'best-practice'
        },
        {
          title: 'Time Estimates',
          description: 'Provide ranges, not exact times: "10-30 minutes" not "15 minutes". Network conditions vary.',
          type: 'best-practice'
        },
        {
          title: 'Custom Fee Warning',
          description: 'If offering custom fee, warn about too low (stuck transaction) and too high (wasted money).',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'review-transaction',
      label: 'Review Transaction',
      type: 'security-checkpoint',
      description: 'Final review before signing',
      userAction: 'Review all details carefully',
      systemResponse: 'Display complete transaction summary',
      securityLevel: 'critical',
      uxNotes: [
        {
          title: 'Comprehensive Summary',
          description: 'Show: From address, To address, Amount, Fee, Total, Estimated time, Network.',
          type: 'best-practice'
        },
        {
          title: 'Visual Hierarchy',
          description: 'Make critical info (recipient, amount, total) visually prominent. Use typography and color.',
          type: 'best-practice'
        },
        {
          title: 'Last Chance Warning',
          description: 'Clear message: "Transactions cannot be reversed. Double-check the recipient address."',
          type: 'security-tip'
        }
      ]
    },
    {
      id: 'confirm-transaction',
      label: 'Confirm & Sign',
      type: 'action',
      description: 'User confirms and wallet signs transaction',
      userAction: 'Click confirm, provide authentication (password/biometric)',
      systemResponse: 'Prompt for authentication, sign transaction',
      securityLevel: 'critical',
      estimatedTime: '5-10 seconds',
      uxNotes: [
        {
          title: 'Hardware Wallet Flow',
          description: 'For hardware wallets, explain what to do on device: "Confirm transaction on your Ledger".',
          type: 'best-practice'
        },
        {
          title: 'Signing Progress',
          description: 'Show progress: "Authenticating → Signing → Broadcasting".',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'broadcast-transaction',
      label: 'Broadcast to Network',
      type: 'action',
      description: 'Send signed transaction to blockchain',
      userAction: 'Wait for broadcast',
      systemResponse: 'Submit transaction to network nodes',
      estimatedTime: '2-5 seconds',
      commonErrors: [
        'Network connection lost',
        'Node unavailable',
        'Nonce conflict (multiple pending transactions)',
        'Gas price too low (rejected by network)'
      ],
      uxNotes: [
        {
          title: 'Network Errors',
          description: 'Network errors don\'t mean the transaction failed. The transaction is signed but not broadcast. Allow retry.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'broadcast-error',
      label: 'Broadcast Error',
      type: 'error',
      description: 'Failed to broadcast transaction',
      userAction: 'Decide whether to retry or cancel',
      systemResponse: 'Show error details and retry option',
      commonErrors: [
        'Network timeout',
        'RPC node error',
        'Transaction already known (duplicate)'
      ],
      uxNotes: [
        {
          title: 'Safe Retry',
          description: 'Allow retry without re-signing. The signed transaction is still valid.',
          type: 'best-practice'
        },
        {
          title: 'Error Context',
          description: 'Explain in plain language. "Network connection lost" not "RPC error 500".',
          type: 'best-practice'
        }
      ]
    },
    {
      id: 'success',
      label: 'Transaction Submitted',
      type: 'success',
      description: 'Transaction successfully broadcast to network',
      userAction: 'View transaction details or return to wallet',
      systemResponse: 'Show transaction hash and confirmation progress',
      uxNotes: [
        {
          title: 'Success vs Confirmation',
          description: 'Clarify: "Transaction submitted" ≠ "Transaction confirmed". Show pending status.',
          type: 'best-practice'
        },
        {
          title: 'Transaction Link',
          description: 'Provide link to block explorer. Users want to verify.',
          type: 'best-practice'
        },
        {
          title: 'Share Receipt',
          description: 'Allow sharing transaction hash or receipt. Useful for proof of payment.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'pending-confirmation',
      label: 'Pending Confirmation',
      type: 'action',
      description: 'Transaction waiting for network confirmations',
      userAction: 'Monitor confirmation progress',
      systemResponse: 'Show confirmation count and estimated completion',
      estimatedTime: 'Network dependent (1 min - 1 hour+)',
      uxNotes: [
        {
          title: 'Progress Indication',
          description: 'Show confirmations visually: "2/6 confirmations". Include approximate time remaining.',
          type: 'best-practice'
        },
        {
          title: 'Background Monitoring',
          description: 'Allow user to navigate away. Send notification when confirmed.',
          type: 'consideration'
        }
      ]
    },
    {
      id: 'cancel-request',
      label: 'Optional: Cancel/Speed Up',
      type: 'action',
      description: 'User wants to cancel or accelerate pending transaction',
      userAction: 'Click cancel or speed up',
      systemResponse: 'Explain options and limitations',
      uxNotes: [
        {
          title: 'Cancel Limitations',
          description: 'Can only "cancel" before first confirmation by sending 0 ETH to self with higher fee. Explain this complexity.',
          type: 'consideration'
        },
        {
          title: 'Speed Up Mechanism',
          description: 'Replace-by-fee (RBF) requires higher gas price. Show cost difference.',
          type: 'consideration'
        }
      ]
    }
  ],
  edges: [
    // Happy Path
    { id: 'e1', source: 'start', target: 'select-asset', label: 'Primary Flow' },
    { id: 'e2', source: 'select-asset', target: 'enter-address', label: 'Asset Selected' },
    { id: 'e3', source: 'enter-address', target: 'address-validation', label: 'Address Entered' },
    { id: 'e4', source: 'address-validation', target: 'enter-amount', label: 'Valid' },
    { id: 'e5', source: 'enter-amount', target: 'select-fee', label: 'Amount Set' },
    { id: 'e6', source: 'select-fee', target: 'review-transaction', label: 'Fee Selected' },
    { id: 'e7', source: 'review-transaction', target: 'confirm-transaction', label: 'Reviewed' },
    { id: 'e8', source: 'confirm-transaction', target: 'broadcast-transaction', label: 'Signed' },
    { id: 'e9', source: 'broadcast-transaction', target: 'success', label: 'Broadcast' },
    { id: 'e10', source: 'success', target: 'pending-confirmation', label: 'Monitor' },

    // Error Paths
    { id: 'e11', source: 'address-validation', target: 'address-invalid', label: 'Invalid', type: 'error' },
    { id: 'e12', source: 'address-invalid', target: 'enter-address', label: 'Retry', type: 'error' },
    { id: 'e13', source: 'broadcast-transaction', target: 'broadcast-error', label: 'Failed', type: 'error' },
    { id: 'e14', source: 'broadcast-error', target: 'broadcast-transaction', label: 'Retry', type: 'error' },

    // Alternative Paths
    { id: 'e15', source: 'enter-amount', target: 'friction-fee-confusion', label: 'Confused', type: 'alternative' },
    { id: 'e16', source: 'friction-fee-confusion', target: 'select-fee', label: 'Clarified' },
    { id: 'e17', source: 'pending-confirmation', target: 'cancel-request', label: 'Cancel/Speed Up', type: 'alternative' },
    { id: 'e18', source: 'cancel-request', target: 'confirm-transaction', label: 'New TX' }
  ]
};
