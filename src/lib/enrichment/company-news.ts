import { companyProfileAgent } from '../../../fire-enrich/lib/services/specialized-agents';
import {
  CompanyNewsArticle,
  EnrichmentError,
  EnrichmentResult,
} from './types';

export async function enrichCompanyNews(
  domain: string
): Promise<EnrichmentResult<CompanyNewsArticle[]>> {
  try {
    const result = await companyProfileAgent.run(
      `Find the latest news and blog posts for the company at domain: ${domain}. Return a list of articles with title, url, source, and published date.`
    );

    // It's important to validate the structure of the result from the agent
    const articles = (result.finalOutput as any[]).map(item => ({
      title: item.title || 'No title found',
      url: item.url || '',
      source: item.source || 'No source found',
      publishedDate: item.publishedDate || new Date().toISOString(),
    }));

    return { success: true, data: articles };
  } catch (error) {
    const enrichmentError = new EnrichmentError(
      'Failed to enrich company news',
      { cause: error instanceof Error ? error : new Error(String(error)) }
    );
    return { success: false, error: enrichmentError };
  }
}
