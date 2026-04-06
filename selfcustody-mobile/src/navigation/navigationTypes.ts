import type { NavigatorScreenParams } from '@react-navigation/native';

export type OnboardingStackParams = {
  Welcome: undefined;
  SecurityPrimer: undefined;
  SeedPhrase: undefined;
  VerifySeed: undefined;
  WalletReady: undefined;
};

export type DashboardStackParams = {
  Dashboard: undefined;
  AssetDetail: { assetId: string };
};

export type StakeFlowParams = {
  StakeAmount: { assetId: string };
  StakeReview: { assetId: string; amount: number };
  StakeConfirm: { assetId: string; amount: number };
};

export type EarnStackParams = {
  EarnHub: undefined;
};

export type AgentStackParams = {
  AgentHub: undefined;
  Chat: { sessionId?: string; contextActionId?: string };
  ApprovalDetail: { actionId: string };
};

export type ActivityStackParams = {
  ActivityList: undefined;
  TxDetail: { txId: string };
};

export type SecurityStackParams = {
  Security: undefined;
  KeyDetail: { keyId: string };
  Settings: undefined;
};

export type MainTabParams = {
  Portfolio: NavigatorScreenParams<DashboardStackParams>;
  Agents: NavigatorScreenParams<AgentStackParams>;
  Activity: NavigatorScreenParams<ActivityStackParams>;
  Earn: NavigatorScreenParams<EarnStackParams>;
  SecurityTab: NavigatorScreenParams<SecurityStackParams>;
};

export type RootStackParams = {
  Onboarding: NavigatorScreenParams<OnboardingStackParams>;
  SeedPhrase: undefined;
  Main: NavigatorScreenParams<MainTabParams>;
  StakeFlow: NavigatorScreenParams<StakeFlowParams>;
};
