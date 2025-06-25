import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { db } from '../../db';
import { enrichCompanyProfile } from '../../../lib/enrichment';

export const enrichmentRouter = createTRPCRouter({
  createEnrichmentJob: protectedProcedure
    .input(z.object({ domains: z.array(z.string().min(1)) }))
    .mutation(async ({ ctx, input }) => {
      const job = await db.enrichmentJob.create({
        data: {
          userId: ctx.auth.userId,
          status: 'pending',
        },
      });

      // TODO: Start background job processing here
      // void processEnrichmentJob(job.id, input.domains);

      return { jobId: job.id };
    }),

  getEnrichmentJobStatus: protectedProcedure
    .input(z.object({ jobId: z.string() }))
    .query(async ({ ctx, input }) => {
      const job = await db.enrichmentJob.findFirst({
        where: {
          id: input.jobId,
          userId: ctx.auth.userId,
        },
      });

      if (!job) {
        throw new Error('Job not found or access denied');
      }

      return {
        status: job.status,
        progress: job.progress,
        results: job.results,
        error: job.error,
      };
    }),

  cancelEnrichmentJob: protectedProcedure
    .input(z.object({ jobId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const job = await db.enrichmentJob.findFirst({
        where: {
          id: input.jobId,
          userId: ctx.auth.userId,
        },
      });

      if (!job) {
        throw new Error('Job not found or access denied');
      }

      if (job.status !== 'pending' && job.status !== 'processing') {
        throw new Error(`Job cannot be cancelled in its current state: ${job.status}`);
      }
      
      await db.enrichmentJob.update({
          where: { id: input.jobId },
          data: { status: 'cancelled' },
      });

      // TODO: Add logic to gracefully stop the background job if it's processing

      return { success: true, message: 'Job cancellation initiated.' };
    }),

  enrichCompanyProfile: protectedProcedure
    .input(z.object({ domain: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const result = await enrichCompanyProfile(input.domain);
      
      if (!result.success) {
        throw new Error(result.error.message);
      }
      
      // Optionally, we can save the enriched data to our database here
      await db.companyProfile.upsert({
        where: { domain: input.domain },
        update: result.data,
        create: {
          name: result.data.name,
          domain: input.domain,
          description: result.data.description,
          linkedin: result.data.linkedin,
          twitter: result.data.twitter,
          location: result.data.location,
        },
      });

      return result.data;
    }),

  exportEnrichmentData: protectedProcedure
    .input(z.object({ jobId: z.string() }))
    .query(async ({ ctx, input }) => {
      const job = await db.enrichmentJob.findFirst({
        where: {
          id: input.jobId,
          userId: ctx.auth.userId,
        },
        include: {
          companyProfiles: true, // Include the enriched company profiles
        },
      });

      if (!job) {
        throw new Error('Job not found or access denied');
      }

      // Here you could format the data into CSV if needed,
      // but for now, we'll return the raw JSON data.
      return job.companyProfiles;
    }),

  importEmailList: protectedProcedure
    .input(z.object({ emails: z.array(z.string().email()) }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Implement the logic to process the imported email list.
      // This could involve:
      // 1. Finding or creating EmailAddress records.
      // 2. Associating them with the user's account.
      // 3. Potentially creating a new enrichment job for them.

      console.log(`User ${ctx.auth.userId} imported ${input.emails.length} emails.`);

      return {
        success: true,
        message: `${input.emails.length} emails imported successfully.`,
      };
    }),
}); 