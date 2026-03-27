import { create } from 'zustand';
import type { Agent, AgentAction, AgentId, AgentStatus } from '../types/agents';
import { MOCK_AGENTS, MOCK_AGENT_ACTIONS } from '../mocks/agents.mock';

interface AgentState {
  agents: Agent[];
  allActions: AgentAction[];
  approvalQueue: AgentAction[];
  addAction: (action: AgentAction) => void;
  approveAction: (id: string) => void;
  rejectAction: (id: string, reason?: string) => void;
  setAgentStatus: (agentId: AgentId, status: AgentStatus) => void;
  expireStaleActions: () => void;
}

function buildQueue(actions: AgentAction[]): AgentAction[] {
  return actions.filter((a) => a.requiresApproval && a.approvalStatus === 'pending');
}

const initial = MOCK_AGENT_ACTIONS;
const initialAgents = MOCK_AGENTS.map((agent) => ({
  ...agent,
  recentActions: initial.filter((a) => a.agentId === agent.id),
  pendingActionCount: initial.filter(
    (a) => a.agentId === agent.id && a.requiresApproval && a.approvalStatus === 'pending',
  ).length,
}));

export const useAgentStore = create<AgentState>((set, get) => ({
  agents: initialAgents,
  allActions: initial,
  approvalQueue: buildQueue(initial),

  addAction: (action) =>
    set((state) => {
      const allActions = [action, ...state.allActions];
      return {
        allActions,
        approvalQueue: buildQueue(allActions),
        agents: state.agents.map((a) =>
          a.id === action.agentId
            ? {
                ...a,
                recentActions: [action, ...a.recentActions].slice(0, 5),
                pendingActionCount: a.pendingActionCount + (action.requiresApproval ? 1 : 0),
                status: action.requiresApproval ? ('thinking' as AgentStatus) : a.status,
                lastAction: action.summary,
                lastActionAt: action.suggestedAt,
              }
            : a,
        ),
      };
    }),

  approveAction: (id) =>
    set((state) => {
      const allActions = state.allActions.map((a) =>
        a.id === id ? { ...a, approvalStatus: 'approved' as const, approvedAt: Date.now() } : a,
      );
      return { allActions, approvalQueue: buildQueue(allActions) };
    }),

  rejectAction: (id, _reason) =>
    set((state) => {
      const allActions = state.allActions.map((a) =>
        a.id === id ? { ...a, approvalStatus: 'rejected' as const, rejectedAt: Date.now() } : a,
      );
      return { allActions, approvalQueue: buildQueue(allActions) };
    }),

  setAgentStatus: (agentId, status) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === agentId ? { ...a, status } : a)),
    })),

  expireStaleActions: () => {
    const now = Date.now();
    set((state) => {
      const allActions = state.allActions.map((a) =>
        a.approvalStatus === 'pending' && a.expiresAt && a.expiresAt < now
          ? { ...a, approvalStatus: 'expired' as const }
          : a,
      );
      return { allActions, approvalQueue: buildQueue(allActions) };
    });
  },
}));
