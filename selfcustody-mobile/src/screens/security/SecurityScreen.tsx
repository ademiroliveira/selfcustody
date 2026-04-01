import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SecurityStackParams } from '../../navigation/navigationTypes';
import { useCustodyHealth } from '../../hooks/useCustodyHealth';
import { Card, Button, Alert as HeroAlert, Separator } from 'heroui-native';
import CustodyHealthBar from '../../components/security/CustodyHealthBar';
import KeyStatusRow from '../../components/security/KeyStatusRow';
import SectionHeader from '../../components/common/SectionHeader';
import { colors } from '../../theme';
import { formatDistanceToNow } from 'date-fns';

type Nav = NativeStackNavigationProp<SecurityStackParams, 'Security'>;

export default function SecurityScreen() {
  const nav = useNavigation<Nav>();
  const custody = useCustodyHealth();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Security</Text>

        {custody.activeThreats > 0 && (
          <HeroAlert status="danger">
            <HeroAlert.Indicator />
            <HeroAlert.Content>
              <HeroAlert.Title>
                {custody.activeThreats} active threat{custody.activeThreats > 1 ? 's' : ''} detected
              </HeroAlert.Title>
              <HeroAlert.Description>{custody.flags.join(' · ')}</HeroAlert.Description>
            </HeroAlert.Content>
          </HeroAlert>
        )}

        <Card>
          <Card.Body>
            <CustodyHealthBar score={custody.overallScore} />
          </Card.Body>
        </Card>

        <View>
          <SectionHeader title="Signing Keys" />
          <Card>
            {custody.keys.map((key, i) => (
              <View key={key.id}>
                <Card.Body>
                  <KeyStatusRow keyStatus={key} />
                </Card.Body>
                {i < custody.keys.length - 1 && <Separator />}
              </View>
            ))}
          </Card>
        </View>

        <View>
          <SectionHeader title="Backup Status" />
          <Card>
            <Card.Body style={styles.backupBody}>
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
            </Card.Body>
            <Card.Footer>
              <Button variant="outline" onPress={() => {}} style={{ width: '100%' }}>
                Test Recovery (Demo)
              </Button>
            </Card.Footer>
          </Card>
        </View>

        <Button variant="outline" onPress={() => nav.navigate('Settings')}>
          Settings
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 20, paddingBottom: 32 },
  heading: { color: colors.text.primary, fontSize: 28, fontWeight: '800' },
  backupBody: { gap: 0 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  label: { color: colors.text.secondary, fontSize: 14 },
  value: { color: colors.text.primary, fontSize: 14, fontWeight: '500' },
});
