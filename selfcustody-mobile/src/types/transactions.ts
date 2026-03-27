import type { Asset, Chain } from './portfolio';
import type { AgentId } from './agents';

export type TxType = 'send' | 'receive' | 'swap' | 'stake' | 'unstake' | 'approve' | 'agent-trade';
export type TxStatus = 'confirmed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  txHash: string;
  type: TxType;
  asset: Asset;
  amountToken: number;
  amountUSD: number;
  feeUSD: number;
  fromAddress: string;
  toAddress: string;
  timestamp: number;
  blockNumber?: number;
  status: TxStatus;
  chain: Chain;
  initiatedBy: 'user' | AgentId;
  agentActionId?: string;
  notes?: string;
}
