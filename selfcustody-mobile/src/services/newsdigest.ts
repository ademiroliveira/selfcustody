import type { DigestResponse } from '../types/news';
import { MOCK_DIGEST } from '../mocks/news.mock';

export interface NewsDigestRequest {
  topic?: string;
  country?: string;
  maxHeadlines?: number;
}

function snakeToCamel(obj: Record<string, unknown>): DigestResponse {
  return {
    generatedAt: obj.generated_at as string,
    topic: obj.topic as string,
    country: obj.country as string,
    scoringMode: (obj.scoring_mode as string | null) ?? null,
    items: (obj.items as Array<Record<string, unknown>>).map((item) => ({
      title: item.title as string,
      description: (item.description as string | null) ?? null,
      url: item.url as string,
      publishedAt: (item.published_at as string | null) ?? null,
      source: (item.source as string | null) ?? null,
      score: (item.score as number | null) ?? null,
      reasoning: (item.reasoning as string | null) ?? null,
    })),
  };
}

export async function fetchNewsDigest(req: NewsDigestRequest = {}): Promise<DigestResponse> {
  const baseUrl = process.env.EXPO_PUBLIC_NEWSDIGEST_URL ?? 'http://localhost:8000';
  const token = process.env.EXPO_PUBLIC_NEWSDIGEST_TOKEN;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${baseUrl}/run`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        topic: req.topic,
        country: req.country,
        max_headlines: req.maxHeadlines,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return snakeToCamel(data);
  } catch {
    return MOCK_DIGEST;
  }
}
