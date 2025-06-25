import FirecrawlApp from '@mendable/firecrawl-js';
import { handleEnrichmentError } from './errorHandler';
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
    const response = await firecrawl.crawl(url, {
      limit: 1,
      scrapeOptions: { formats: ['markdown'] }
    });

    if (response.success && response.data && response.data.length > 0) {
      const scrapedData = response.data[0];
      return {
        success: true,
        data: {
          url: scrapedData.url || url,
          content: scrapedData.markdown || '',
          metadata: scrapedData.metadata || {},
        },
      };
    } else {
      const errorMessage = response.error || 'Failed to scrape URL for an unknown reason.';
      return handleEnrichmentError(new Error(errorMessage), 'Failed to scrape URL');
    }
  } catch (error) {
    return handleEnrichmentError(
      error,
      'An unexpected error occurred during web scraping'
    );
  }
}
