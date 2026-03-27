import { useAgentStore } from '../store/agentStore';

export function useApprovalQueue() {
  return useAgentStore((s) => s.approvalQueue);
}

export function useTotalPendingCount() {
  return useAgentStore((s) => s.approvalQueue.length);
}
