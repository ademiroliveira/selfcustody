import { create } from 'zustand';

interface WalletState {
  isSetup: boolean;
  walletName: string;
  primaryAddress: string;
  setup: (name: string, address: string) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isSetup: false,
  walletName: '',
  primaryAddress: '',
  setup: (name, address) => set({ isSetup: true, walletName: name, primaryAddress: address }),
  reset: () => set({ isSetup: false, walletName: '', primaryAddress: '' }),
}));
