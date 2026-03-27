import { useQuery } from '@tanstack/react-query';
import { fetchNewsDigest } from '../services/newsdigest';
import { MOCK_DIGEST } from '../mocks/news.mock';

export function useNewsDigest(topic = 'crypto custody') {
  return useQuery({
    queryKey: ['newsDigest', topic],
    queryFn: () => fetchNewsDigest({ topic, maxHeadlines: 5 }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: MOCK_DIGEST,
  });
}
