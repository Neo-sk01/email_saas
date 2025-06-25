import { productAgent } from '../../../fire-enrich/lib/services/specialized-agents';
import { handleEnrichmentError } from './errorHandler';
import {
  TechStack,
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
    return handleEnrichmentError(error, 'Failed to enrich tech stack');
  }
}
