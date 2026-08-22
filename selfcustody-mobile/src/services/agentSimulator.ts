import mitt from 'mitt';
import type { AgentAction } from '../types/agents';
import { MOCK_AGENT_ACTIONS } from '../mocks/agents.mock';

type AgentEvents = {
  action: AgentAction;
};

export const agentEmitter = mitt<AgentEvents>();

let started = false;

export function startAgentSimulator() {
  if (started) return;
  started = true;

  // T+15s: Portfolio intelligence rebalance suggestion
  setTimeout(() => {
    agentEmitter.emit('action', MOCK_AGENT_ACTIONS[0]);
  }, 15000);

  // T+30s: SOL liquid staking opportunity
  setTimeout(() => {
    agentEmitter.emit('action', MOCK_AGENT_ACTIONS[3]);
  }, 30000);

  // T+45s: Threat monitor alert
  setTimeout(() => {
    agentEmitter.emit('action', MOCK_AGENT_ACTIONS[1]);
  }, 45000);

  // T+90s: Staking yield info
  setTimeout(() => {
    agentEmitter.emit('action', MOCK_AGENT_ACTIONS[2]);
  }, 90000);
}

export function stopAgentSimulator() {
  started = false;
}
