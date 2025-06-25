import { EnrichmentError, EnrichmentResult } from './types';

export function handleEnrichmentError<T>(
  error: unknown,
  message: string
): EnrichmentResult<T> {
  const enrichmentError = new EnrichmentError(message, {
    cause: error instanceof Error ? error : new Error(String(error)),
  });
  return { success: false, error: enrichmentError };
}
