import { WalletFlow } from '../types/flow';
import { walletCreationFlow } from './walletCreationFlow';
import { sendingFlow } from './sendingFlow';

export const flows: WalletFlow[] = [
  walletCreationFlow,
  sendingFlow
];

export { walletCreationFlow, sendingFlow };
