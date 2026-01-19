export type WalletType = 'hot' | 'cold' | 'multi-sig' | 'hardware';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type SecurityModel = 'standard' | 'enhanced' | 'maximum';

export type FlowCategory =
  | 'wallet-creation'
  | 'sending'
  | 'receiving'
  | 'recovery'
  | 'multi-sig'
  | 'hardware-wallet'
  | 'dapp-connection';

export type NodeType =
  | 'start'
  | 'action'
  | 'security-checkpoint'
  | 'decision'
  | 'error'
  | 'success'
  | 'ux-friction';

export interface UXNote {
  title: string;
  description: string;
  type: 'consideration' | 'best-practice' | 'common-mistake' | 'security-tip';
  references?: string[];
}

export interface NodeData {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  userAction?: string;
  systemResponse?: string;
  commonErrors?: string[];
  uxNotes?: UXNote[];
  estimatedTime?: string;
  securityLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export interface FlowMetadata {
  id: string;
  title: string;
  category: FlowCategory;
  description: string;
  walletTypes: WalletType[];
  experienceLevel: ExperienceLevel[];
  securityModel: SecurityModel[];
  tags: string[];
  version: string;
}

export interface WalletFlow {
  metadata: FlowMetadata;
  nodes: NodeData[];
  edges: {
    id: string;
    source: string;
    target: string;
    label?: string;
    type?: 'default' | 'error' | 'alternative';
  }[];
}

export interface FilterState {
  walletTypes: WalletType[];
  experienceLevels: ExperienceLevel[];
  securityModels: SecurityModel[];
  categories: FlowCategory[];
  searchQuery: string;
}
