import type { ChatMessage, Citation } from '../types/chat';
import type { Portfolio } from '../types/portfolio';
import { getMockChatResponse } from '../mocks/chat.mock';

const SYSTEM_PROMPT = `You are a crypto-native wealth advisor for a high-net-worth individual using a self-custody wallet. You have access to their portfolio context. Be concise, precise, and honest about uncertainty. Never give financial advice; frame everything as analysis. Today's date: ${new Date().toLocaleDateString()}.`;

function buildPortfolioContext(portfolio: Portfolio): string {
  const positions = portfolio.positions
    .map((p) => `  - ${p.asset.symbol}: ${p.balance.toLocaleString()} tokens, $${p.balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${p.allocationPct.toFixed(1)}%), 24h: ${p.price24hChangePct > 0 ? '+' : ''}${p.price24hChangePct.toFixed(1)}%`)
    .join('\n');
  return `Portfolio context:\nTotal value: $${portfolio.totalValueUSD.toLocaleString()}\n24h change: ${portfolio.change24hPct > 0 ? '+' : ''}${portfolio.change24hPct.toFixed(2)}%\nPositions:\n${positions}`;
}

export async function streamChatResponse(
  messages: ChatMessage[],
  portfolio: Portfolio,
  onChunk: (delta: string) => void,
  onComplete: (fullText: string, citations?: Citation[]) => void,
  onError: (error: Error) => void,
): Promise<void> {
  const apiKey = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;

  if (!apiKey) {
    // Mock fallback
    const userMsg = messages[messages.length - 1]?.content ?? '';
    const response = getMockChatResponse(userMsg);
    const words = response.split(' ');
    let accumulated = '';
    for (const word of words) {
      await new Promise((r) => setTimeout(r, 30));
      const chunk = accumulated.length === 0 ? word : ' ' + word;
      accumulated += chunk;
      onChunk(chunk);
    }
    onComplete(accumulated);
    return;
  }

  try {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey });

    const portfolioContext = buildPortfolioContext(portfolio);
    const apiMessages = messages
      .filter((m) => m.role !== 'system')
      .map((m, i) => {
        if (i === 0 && m.role === 'user') {
          return { role: 'user' as const, content: `${portfolioContext}\n\n${m.content}` };
        }
        return { role: m.role as 'user' | 'assistant', content: m.content };
      });

    let fullText = '';
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: apiMessages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        fullText += event.delta.text;
        onChunk(event.delta.text);
      }
    }

    onComplete(fullText);
  } catch (err) {
    onError(err instanceof Error ? err : new Error('Unknown error'));
  }
}
