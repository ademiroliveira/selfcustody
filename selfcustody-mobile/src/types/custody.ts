import type { Chain } from './portfolio';

export type KeyLocation =
  | 'device-secure-enclave'
  | 'icloud-keychain'
  | 'hardware-wallet'
  | 'multisig';
export type BackupStatus = 'backed-up' | 'not-backed-up' | 'stale';
export type HealthLevel = 'excellent' | 'good' | 'warning' | 'critical';

export interface KeyStatus {
  id: string;
  label: string;
  location: KeyLocation;
  lastVerifiedAt: number;
  backupStatus: BackupStatus;
  publicKeyFingerprint: string;
  associatedChains: Chain[];
}

export interface CustodyHealth {
  overallScore: number;
  level: HealthLevel;
  keys: KeyStatus[];
  lastBackupAt: number;
  recoveryTestPassedAt?: number;
  activeThreats: number;
  flags: string[];
}
