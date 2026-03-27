import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { ChatMessage } from '../../types/chat';
import { colors } from '../../theme';

interface Props {
  message: ChatMessage;
  onRetry?: () => void;
}

export default function ChatBubble({ message, onRetry }: Props) {
  const isUser = message.role === 'user';
  const hasError = !!message.error;
  return (
    <View style={[styles.wrap, isUser ? styles.userWrap : styles.assistantWrap]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble, hasError && styles.errorBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>
          {message.content}
          {message.isStreaming && <Text style={styles.cursor}>▌</Text>}
        </Text>
        {hasError && onRetry && (
          <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryText}>↺ Try again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: 4, marginHorizontal: 16, flexDirection: 'row' },
  userWrap: { justifyContent: 'flex-end' },
  assistantWrap: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', borderRadius: 16, padding: 12 },
  userBubble: { backgroundColor: colors.accent.indigo, borderBottomRightRadius: 4 },
  assistantBubble: { backgroundColor: colors.bg.card, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: colors.border.subtle },
  text: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#fff' },
  assistantText: { color: colors.text.primary },
  cursor: { color: colors.accent.indigo },
  errorBubble: { borderColor: colors.accent.rose },
  retryBtn: { marginTop: 8, alignSelf: 'flex-start' },
  retryText: { color: colors.accent.indigo, fontSize: 13, fontWeight: '600' },
});
