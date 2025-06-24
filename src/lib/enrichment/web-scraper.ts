import FirecrawlApp from '@mendable/firecrawl-js';
import {
  WebScrapeResult,
  EnrichmentError,
  EnrichmentResult,
} from './types';

const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;

if (!firecrawlApiKey) {
  console.warn('FIRECRAWL_API_KEY is not set. Web scraper will not work.');
}

const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });

export async function enrichWithWebScrape(
  url: string
): Promise<EnrichmentResult<WebScrapeResult>> {
  if (!firecrawlApiKey) {
    return {
      success: false,
      error: new EnrichmentError('Firecrawl API key is not configured.'),
    };
  }

  try {
    const result = await firecrawl.scrape(url);

    if (result.success) {
      return {
        success: true,
        data: {
          url,
          content: result.data.content,
          metadata: result.data.metadata,
        },
      };
    } else {
      return {
        success: false,
        error: new EnrichmentError(`Failed to scrape URL: ${result.error}`),
      };
    }
  } catch (error) {
    const enrichmentError = new EnrichmentError(
      'An unexpected error occurred during web scraping',
      { cause: error instanceof Error ? error : new Error(String(error)) }
    );
    return { success: false, error: enrichmentError };
  }
}
