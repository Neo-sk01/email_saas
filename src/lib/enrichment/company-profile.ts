import { companyProfileAgent } from '../../../fire-enrich/lib/services/specialized-agents';
import {
  CompanyProfile,
  EnrichmentError,
  EnrichmentResult,
} from './types';

export async function enrichCompanyProfile(
  domain: string
): Promise<EnrichmentResult<CompanyProfile>> {
  try {
    const result = await companyProfileAgent.process({ domain });
    return { success: true, data: result };
  } catch (error) {
    const enrichmentError = new EnrichmentError(
      'Failed to enrich company profile',
      { cause: error instanceof Error ? error : new Error(String(error)) }
    );
    return { success: false, error: enrichmentError };
  }
}
