import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0 && !disabled;

  const handleSend = () => {
    if (!canSend) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Ask about your portfolio…"
        placeholderTextColor={colors.text.tertiary}
        multiline
        maxLength={500}
        returnKeyType="send"
        onSubmitEditing={handleSend}
        editable={!disabled}
        accessibilityLabel="Message input"
      />
      <TouchableOpacity style={[styles.sendBtn, !canSend && styles.sendDisabled]} onPress={handleSend} disabled={!canSend} accessibilityRole="button" accessibilityLabel="Send message" accessibilityState={{ disabled: !canSend }}>
        <Text style={styles.sendText}>↑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, paddingVertical: 12, gap: 10, borderTopWidth: 1, borderTopColor: colors.border.subtle, backgroundColor: colors.bg.secondary },
  input: { flex: 1, backgroundColor: colors.bg.card, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, color: colors.text.primary, fontSize: 15, maxHeight: 100, borderWidth: 1, borderColor: colors.border.default },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.accent.indigo, alignItems: 'center', justifyContent: 'center' },
  sendDisabled: { opacity: 0.4 },
  sendText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
