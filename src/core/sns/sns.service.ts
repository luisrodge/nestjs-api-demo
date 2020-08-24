import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SNS } from 'aws-sdk';

import { formatForPublish } from '../../utils/phone-number';

const ACCESS_ENV_KEY_VARIABLE = 'ACCESS_KEY_ID';
const SECRET_ENV_KEY_VARIABLE = 'SECRET_ACCESS_KEY';

@Injectable()
export class SnsService {
  private readonly sns: SNS;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>(ACCESS_ENV_KEY_VARIABLE);
    const secretAccessKey = this.configService.get<string>(
      SECRET_ENV_KEY_VARIABLE,
    );
    this.sns = new SNS({ accessKeyId, secretAccessKey, region: 'us-east-1' });
  }

  async sendSms(message: string, phoneNumbers: string[]) {
    try {
      for (const phoneNumber of phoneNumbers) {
        const formattedPhoneNumber = formatForPublish(phoneNumber);
        const params = {
          Message: message,
          PhoneNumber: formattedPhoneNumber,
        };
        await this.sns.publish(params).promise();
      }
    } catch (error) {
      throw error;
    }
  }
}
