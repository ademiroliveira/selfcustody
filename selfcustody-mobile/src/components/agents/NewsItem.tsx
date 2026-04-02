import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import type { NewsItem as NewsItemType } from '../../types/news';
import { colors } from '../../theme';

interface Props { item: NewsItemType }

export default function NewsItem({ item }: Props) {
  const score = item.score ?? 0;
  const scoreColor = score > 0.85 ? colors.accent.green : score > 0.65 ? colors.accent.amber : colors.text.tertiary;
  return (
    <TouchableOpacity style={styles.row} onPress={() => item.url && Linking.openURL(item.url)} activeOpacity={0.7} accessibilityRole="link" accessibilityLabel={`Read article: ${item.title}. Source: ${item.source ?? 'Unknown'}`}>
      <View style={[styles.scoreBar, { backgroundColor: scoreColor + '33' }]}>
        <View style={[styles.scoreFill, { height: `${score * 100}%` as any, backgroundColor: scoreColor }]} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.meta}>{item.source ?? 'Unknown'} · {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingVertical: 10, gap: 12 },
  scoreBar: { width: 3, borderRadius: 2, overflow: 'hidden', justifyContent: 'flex-end' },
  scoreFill: { width: '100%', borderRadius: 2 },
  content: { flex: 1 },
  title: { color: colors.text.primary, fontSize: 14, lineHeight: 20, fontWeight: '500' },
  meta: { color: colors.text.tertiary, fontSize: 12, marginTop: 3 },
});
