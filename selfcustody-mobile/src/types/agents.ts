export type AgentId =
  | 'portfolio-intelligence'
  | 'trade-executor'
  | 'chat-assistant'
  | 'threat-monitor';

export type AgentStatus = 'idle' | 'thinking' | 'alert' | 'blocked' | 'executing';

export type ActionType =
  | 'rebalance-suggestion'
  | 'risk-alert'
  | 'trade-queue'
  | 'trade-execute'
  | 'threat-flag'
  | 'info';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export interface AgentAction {
  id: string;
  agentId: AgentId;
  type: ActionType;
  title: string;
  summary: string;
  reasoning: string;
  evidence?: string[];
  suggestedAt: number;
  expiresAt?: number;
  requiresApproval: boolean;
  approvalStatus?: ApprovalStatus;
  approvedAt?: number;
  rejectedAt?: number;
  isReversible: boolean;
  reversibilityNote?: string;
  payload?: Record<string, unknown>;
}

export interface Agent {
  id: AgentId;
  name: string;
  description: string;
  status: AgentStatus;
  lastActionAt?: number;
  lastAction?: string;
  pendingActionCount: number;
  recentActions: AgentAction[];
  isEnabled: boolean;
}
