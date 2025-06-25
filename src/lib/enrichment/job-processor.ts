import { db } from '../../server/db';
import { enrichCompanyProfile } from './company-profile';
import { enrichCompanyNews } from './company-news';
import { enrichTechStack } from './tech-stack';

export class EnrichmentJobProcessor {
  private activeJobs: Set<string> = new Set();
  
  constructor() {
    // In a more advanced setup, you might pass in dependencies like a logger
  }
  
  async processJob(jobId: string, domains: string[]) {
    if (this.activeJobs.has(jobId)) {
      console.log(`Job ${jobId} is already active.`);
      return;
    }
    this.activeJobs.add(jobId);
    
    try {
      await this.updateJobStatus(jobId, 'processing');
      
      const totalDomains = domains.length;
      for (let i = 0; i < totalDomains; i++) {
        const domain = domains[i];
        
        const job = await db.enrichmentJob.findUnique({ where: { id: jobId } });
        if (job?.status === 'cancelled') {
          console.log(`Job ${jobId} was cancelled.`);
          break;
        }
        
        const profileResult = await enrichCompanyProfile(domain);
        const newsResult = await enrichCompanyNews(domain);
        const techResult = await enrichTechStack(domain);
        
        if (profileResult.success) {
            const companyData: {
              name: string;
              description: string;
              industry: string;
              size: string;
              location: string;
              fundingData: any;
              techStack: any;
            } = {
              name: profileResult.data.name || 'N/A',
              description: profileResult.data.description || 'N/A',
              industry: profileResult.data.industry || 'N/A',
              size: profileResult.data.size || 'N/A',
              location: profileResult.data.location || 'N/A',
              fundingData: newsResult.success ? newsResult.data : { error: newsResult.error.message },
              techStack: techResult.success ? techResult.data : { error: techResult.error.message },
            };

            await db.companyProfile.upsert({
                where: { domain: domain },
                create: {
                    domain: domain,
                    ...companyData,
                    job: { connect: { id: jobId } }
                },
                update: companyData,
            });
        }
        
        const progress = ((i + 1) / totalDomains) * 100;
        await this.updateJobProgress(jobId, progress);
      }
      
      const finalJobStatus = await db.enrichmentJob.findUnique({ where: { id: jobId } });
      if (finalJobStatus?.status !== 'cancelled') {
        await this.updateJobStatus(jobId, 'completed');
      }

    } catch (error) {
      await this.updateJobError(jobId, error);
    } finally {
      this.activeJobs.delete(jobId);
    }
  }
  
  private async updateJobStatus(jobId: string, status: string) {
    await db.enrichmentJob.update({
      where: { id: jobId },
      data: { status }
    });
  }
  
  private async updateJobProgress(jobId: string, progress: number) {
    await db.enrichmentJob.update({
      where: { id: jobId },
      data: { progress }
    });
  }
  
  private async updateJobError(jobId: string, error: unknown) {
    await db.enrichmentJob.update({
      where: { id: jobId },
      data: { 
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
}

// Create a singleton instance to be used throughout the application
export const jobProcessor = new EnrichmentJobProcessor(); 