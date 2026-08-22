import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import type { ChatMessage } from '../../types/chat';
import { usePortfolioStore } from '../../store/portfolioStore';
import { streamChatResponse } from '../../services/claude';
import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/chat/ChatInput';
import TypingIndicator from '../../components/chat/TypingIndicator';
import { colors } from '../../theme';

const QUICK_PROMPTS = [
  "What's my biggest risk?",
  'Should I rebalance?',
  'Explain my PENDLE position',
  "How's my custody health?",
];

export default function ChatScreen() {
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleSend = async (text: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: Date.now() };
    addMessage(userMsg);

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: ChatMessage = { id: assistantId, role: 'assistant', content: '', timestamp: Date.now(), isStreaming: true };
    addMessage(assistantMsg);
    setIsStreaming(true);

    await streamChatResponse(
      [...messages, userMsg],
      portfolio,
      (chunk) => {
        setMessages((prev) =>
          prev.map((m) => m.id === assistantId ? { ...m, content: m.content + chunk } : m),
        );
      },
      (fullText) => {
        setMessages((prev) =>
          prev.map((m) => m.id === assistantId ? { ...m, content: fullText, isStreaming: false } : m),
        );
        setIsStreaming(false);
      },
      (err) => {
        setMessages((prev) =>
          prev.map((m) => m.id === assistantId ? { ...m, content: 'Sorry, something went wrong.', isStreaming: false, error: err.message } : m),
        );
        setIsStreaming(false);
      },
    );
  };

  const isEmpty = messages.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.contextBar}>
        <Text style={styles.contextText}>Context: {portfolio.name} · ${portfolio.totalValueUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })} · {portfolio.positions.length} assets</Text>
      </View>

      {isEmpty && (
        <View style={styles.quickPromptsWrap}>
          <Text style={styles.quickLabel}>Quick questions</Text>
          <View style={styles.chips}>
            {QUICK_PROMPTS.map((prompt) => (
              <TouchableOpacity key={prompt} style={styles.chip} onPress={() => handleSend(prompt)} accessibilityRole="button" accessibilityLabel={prompt}>
                <Text style={styles.chipText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
            <ChatBubble
              message={item}
              onRetry={item.error ? () => {
                const lastUser = [...messages].reverse().find((m) => m.role === 'user');
                if (lastUser) handleSend(lastUser.content);
              } : undefined}
            />
          )}
        contentContainerStyle={styles.messageList}
        ListFooterComponent={isStreaming ? null : undefined}
      />

      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  contextBar: { backgroundColor: colors.bg.elevated, paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  contextText: { color: colors.text.secondary, fontSize: 12 },
  quickPromptsWrap: { padding: 16 },
  quickLabel: { color: colors.text.tertiary, fontSize: 12, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: colors.bg.card, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: colors.border.default },
  chipText: { color: colors.text.secondary, fontSize: 13 },
  messageList: { paddingVertical: 8 },
});
