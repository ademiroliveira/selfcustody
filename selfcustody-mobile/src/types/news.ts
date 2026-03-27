export interface NewsItem {
  title: string;
  description: string | null;
  url: string;
  publishedAt: string | null;
  source: string | null;
  score: number | null;
  reasoning: string | null;
}

export interface DigestResponse {
  generatedAt: string;
  topic: string;
  country: string;
  scoringMode: string | null;
  items: NewsItem[];
}
