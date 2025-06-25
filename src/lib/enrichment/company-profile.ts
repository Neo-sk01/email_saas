import { companyProfileAgent } from '../../../fire-enrich/lib/services/specialized-agents';
import { handleEnrichmentError } from './errorHandler';
import {
  CompanyProfile,
  EnrichmentResult,
} from './types';

export async function enrichCompanyProfile(
  domain: string
): Promise<EnrichmentResult<CompanyProfile>> {
  try {
    const result = await companyProfileAgent.process({ domain });
    return { success: true, data: result };
  } catch (error) {
    return handleEnrichmentError(error, 'Failed to enrich company profile');
  }
}
