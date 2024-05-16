import { S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private s3: S3;
  constructor() {
    this.s3 = new S3({
      endpoint: process.env.AWS_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      forcePathStyle: true,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(
    file: Buffer,
    extension: 'png' | 'jpg',
    folder: string = 'default',
  ) {
    const key = `${folder}/${Date.now()}.${extension}`;
    const result = await this.s3.putObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file,
    });
    if (result.$metadata.httpStatusCode === 200) {
      return {
        key,
        success: true,
      };
    }
  }
}
