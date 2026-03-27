import { useEffect } from 'react';
import { agentEmitter } from '../services/agentSimulator';
import { useAgentStore } from '../store/agentStore';

export function useAgentEvents() {
  const addAction = useAgentStore((s) => s.addAction);

  useEffect(() => {
    agentEmitter.on('action', addAction);
    return () => agentEmitter.off('action', addAction);
  }, [addAction]);
}
