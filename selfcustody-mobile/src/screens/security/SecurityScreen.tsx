import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SecurityStackParams } from '../../navigation/navigationTypes';
import { useCustodyHealth } from '../../hooks/useCustodyHealth';
import CustodyHealthBar from '../../components/security/CustodyHealthBar';
import KeyStatusRow from '../../components/security/KeyStatusRow';
import Card from '../../components/common/Card';
import SectionHeader from '../../components/common/SectionHeader';
import Button from '../../components/common/Button';
import { colors } from '../../theme';
import { formatDistanceToNow } from 'date-fns';

type Nav = NativeStackNavigationProp<SecurityStackParams, 'Security'>;

export default function SecurityScreen() {
  const nav = useNavigation<Nav>();
  const custody = useCustodyHealth();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Security</Text>

        {custody.activeThreats > 0 && (
          <Card variant="alert" style={styles.threatBanner}>
            <Text style={styles.threatText}>⚠ {custody.activeThreats} active threat{custody.activeThreats > 1 ? 's' : ''} detected</Text>
            {custody.flags.map((f, i) => <Text key={i} style={styles.flagText}>· {f}</Text>)}
          </Card>
        )}

        <Card style={styles.card}>
          <CustodyHealthBar score={custody.overallScore} />
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Signing Keys" />
          <Card style={styles.card}>
            {custody.keys.map((key) => (
              <KeyStatusRow key={key.id} keyStatus={key} />
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Backup Status" />
          <Card style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Last backup</Text>
              <Text style={styles.value}>{formatDistanceToNow(custody.lastBackupAt, { addSuffix: true })}</Text>
            </View>
            {custody.recoveryTestPassedAt && (
              <View style={styles.row}>
                <Text style={styles.label}>Recovery test</Text>
                <Text style={[styles.value, { color: colors.accent.green }]}>
                  Passed {formatDistanceToNow(custody.recoveryTestPassedAt, { addSuffix: true })}
                </Text>
              </View>
            )}
            <Button label="Test Recovery (Demo)" onPress={() => {}} variant="secondary" style={styles.testBtn} />
          </Card>
        </View>

        <Button label="Settings" onPress={() => nav.navigate('Settings')} variant="secondary" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16, paddingBottom: 32 },
  heading: { color: colors.text.primary, fontSize: 28, fontWeight: '800' },
  threatBanner: {},
  threatText: { color: colors.accent.rose, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  flagText: { color: colors.text.secondary, fontSize: 13 },
  card: {},
  section: { gap: 0 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  label: { color: colors.text.secondary, fontSize: 14 },
  value: { color: colors.text.primary, fontSize: 14, fontWeight: '500' },
  testBtn: { marginTop: 12 },
});
