import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { SnsService } from '../core/sns/sns.service';
import { EngagementEntity } from './engagement.entity';

@Processor('engagement')
export class EngagementProcessor {
  private readonly logger = new Logger(EngagementProcessor.name);

  constructor(private snsService: SnsService) {}

  @Process('sendSms')
  async sendSms(job: Job<{ engagement: EngagementEntity }>) {
    try {
      const { engagement } = job.data;
      const phoneNumbers: string[] = [];

      for (const contact of engagement.contacts) {
        phoneNumbers.push(contact.phoneNumber);
      }

      await this.snsService.sendSms(engagement.message, phoneNumbers);
    } catch (error) {
      throw error;
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueError()
  onError(error: Error) {
    console.log(`Queue error ${error}`);
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    console.log(`Processing job ${job.id} of type ${job.name} failed`);
    console.log(err);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: unknown) {
    console.log(`Completed: job ${job.id} -> result: ${result}`);
  }
}
