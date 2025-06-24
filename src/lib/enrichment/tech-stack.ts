import { productAgent } from '../../../fire-enrich/lib/services/specialized-agents';
import {
  TechStack,
  EnrichmentError,
  EnrichmentResult,
} from './types';

export async function enrichTechStack(
  domain: string
): Promise<EnrichmentResult<TechStack[]>> {
  try {
    const result = await productAgent.run(
      `Find the technology stack used by the company at domain: ${domain}. Return a list of technologies and their categories.`
    );

    // It's important to validate the structure of the result from the agent
    const techStack = (result.finalOutput as any[]).map(item => ({
      technology: item.technology || 'Unknown Technology',
      category: item.category || 'Uncategorized',
    }));

    return { success: true, data: techStack };
  } catch (error) {
    const enrichmentError = new EnrichmentError(
      'Failed to enrich tech stack',
      { cause: error instanceof Error ? error : new Error(String(error)) }
    );
    return { success: false, error: enrichmentError };
  }
}
