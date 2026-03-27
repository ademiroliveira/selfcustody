import { MOCK_CUSTODY_HEALTH } from '../mocks/custody.mock';
import type { CustodyHealth } from '../types/custody';

// In a real app this would come from a store/query.
// For the prototype we return mock data directly.
export function useCustodyHealth(): CustodyHealth {
  return MOCK_CUSTODY_HEALTH;
}
