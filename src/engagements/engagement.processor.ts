import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

import { SnsService } from '../core/sns/sns.service';
import { EngagementEntity } from './engagement.entity';
import { EngagementsService } from './engagements.service';

@Processor('engagement')
export class EngagementProcessor {
  constructor(
    private snsService: SnsService,
    private engagementsService: EngagementsService,
  ) {}

  @Process('sendSms')
  async sendSms(job: Job<{ engagement: EngagementEntity }>) {
    const { engagement } = job.data;

    try {
      const phoneNumbers: string[] = [];

      for (const contact of engagement.contacts) {
        phoneNumbers.push(contact.phoneNumber);
      }

      await this.snsService.sendSms(engagement.message, phoneNumbers);

      await this.engagementsService.update(engagement.id, {
        status: 'Completed',
      });
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
  async onFailed(job: Job<{ engagement: EngagementEntity }>, err: Error) {
    console.log(`Processing job ${job.id} of type ${job.name} failed`);
    console.log(err);

    const { engagement } = job.data;

    await this.engagementsService.update(engagement.id, {
      status: 'Failed',
    });
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: unknown) {
    console.log(`Completed: job ${job.id} -> result: ${result}`);
  }
}
