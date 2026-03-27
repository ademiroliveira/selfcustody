import type { Transaction } from '../types/transactions';
import { MOCK_PORTFOLIO } from './portfolio.mock';

const btc = MOCK_PORTFOLIO.positions[0].asset;
const eth = MOCK_PORTFOLIO.positions[3].asset;
const pendle = MOCK_PORTFOLIO.positions[1].asset;
const sol = MOCK_PORTFOLIO.positions[5].asset;

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-01', txHash: '0xabc1...def1', type: 'receive', asset: btc,
    amountToken: 0.25, amountUSD: 17105, feeUSD: 0,
    fromAddress: '1A1zP1...eP5ng', toAddress: 'bc1q...xyz',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, status: 'confirmed', chain: 'bitcoin', initiatedBy: 'user',
  },
  {
    id: 'tx-02', txHash: '0xabc2...def2', type: 'swap', asset: pendle,
    amountToken: 3000, amountUSD: 13590, feeUSD: 12.40,
    fromAddress: '0xAbc...123', toAddress: '0xDef...456',
    timestamp: Date.now() - 1000 * 60 * 60 * 6, status: 'confirmed', chain: 'ethereum', initiatedBy: 'user',
  },
  {
    id: 'tx-03', txHash: '0xabc3...def3', type: 'stake', asset: eth,
    amountToken: 2.1, amountUSD: 6678, feeUSD: 4.20,
    fromAddress: '0xAbc...123', toAddress: '0xLid...o01',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, status: 'confirmed', chain: 'ethereum', initiatedBy: 'user',
  },
  {
    id: 'tx-04', txHash: '0xabc4...def4', type: 'receive', asset: sol,
    amountToken: 10, amountUSD: 1420, feeUSD: 0,
    fromAddress: 'ABC...xyz', toAddress: 'DEF...uvw',
    timestamp: Date.now() - 1000 * 60 * 60 * 48, status: 'confirmed', chain: 'solana', initiatedBy: 'user',
  },
  {
    id: 'tx-05', txHash: '0xabc5...def5', type: 'send', asset: eth,
    amountToken: 0.5, amountUSD: 1590, feeUSD: 3.80,
    fromAddress: '0xAbc...123', toAddress: '0xGhi...789',
    timestamp: Date.now() - 1000 * 60 * 60 * 72, status: 'confirmed', chain: 'ethereum', initiatedBy: 'user',
  },
  {
    id: 'tx-06', txHash: 'pending-01', type: 'agent-trade', asset: pendle,
    amountToken: 2650, amountUSD: 12004, feeUSD: 8.50,
    fromAddress: '0xAbc...123', toAddress: '0xSwap...001',
    timestamp: Date.now() - 1000 * 60 * 3, status: 'pending', chain: 'ethereum',
    initiatedBy: 'trade-executor', agentActionId: 'action-01',
    notes: 'Rebalance: PENDLE → BTC (pending approval)',
  },
];
