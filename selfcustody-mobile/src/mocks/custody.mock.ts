import type { CustodyHealth } from '../types/custody';

export const MOCK_CUSTODY_HEALTH: CustodyHealth = {
  overallScore: 94,
  level: 'excellent',
  lastBackupAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  recoveryTestPassedAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  activeThreats: 1,
  flags: ['Stale token approval detected on Ethereum address'],
  keys: [
    {
      id: 'key-01',
      label: 'Primary Signing Key',
      location: 'device-secure-enclave',
      lastVerifiedAt: Date.now() - 1000 * 60 * 60 * 2,
      backupStatus: 'backed-up',
      publicKeyFingerprint: '3A8F...C291',
      associatedChains: ['ethereum', 'arbitrum', 'optimism', 'avalanche'],
    },
    {
      id: 'key-02',
      label: 'Bitcoin Key',
      location: 'hardware-wallet',
      lastVerifiedAt: Date.now() - 1000 * 60 * 60 * 24,
      backupStatus: 'backed-up',
      publicKeyFingerprint: 'B72E...1F04',
      associatedChains: ['bitcoin'],
    },
    {
      id: 'key-03',
      label: 'Solana Key',
      location: 'icloud-keychain',
      lastVerifiedAt: Date.now() - 1000 * 60 * 60 * 6,
      backupStatus: 'backed-up',
      publicKeyFingerprint: '9D1A...88CC',
      associatedChains: ['solana'],
    },
  ],
};
