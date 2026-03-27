export type MessageRole = 'user' | 'assistant' | 'system';

export interface Citation {
  title: string;
  url: string;
  source: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  citations?: Citation[];
  relatedActionId?: string;
  error?: string;
}

export interface ConversationSession {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  context: 'general' | 'asset-specific' | 'agent-action';
  contextId?: string;
}
