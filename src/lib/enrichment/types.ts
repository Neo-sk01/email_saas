export class EnrichmentError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'EnrichmentError';
  }
}

export interface CompanyProfile {
  name: string;
  domain: string;
  description: string;
  linkedin: string;
  twitter: string;
  location: string;
  // Add other relevant fields
}

export interface FundingHistory {
  date: string;
  amount: number;
  stage: string;
  investors: string[];
}

export interface CompanyNewsArticle {
  title: string;
  url: string;
  source: string;
  publishedDate: string;
}

export interface TechStack {
  technology: string;
  category: string;
}

export interface WebScrapeResult {
  url: string;
  content: string;
  metadata: Record<string, any>;
}

export type EnrichmentResult<T> =
  | { success: true; data: T }
  | { success: false; error: EnrichmentError };
