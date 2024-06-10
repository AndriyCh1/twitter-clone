import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { injectable } from 'inversify';

import { env } from '../../common/utils/env-config';
import { Logger } from '../../config';

@injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: env.S3_REGION,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_ACCESS_KEY,
      },
    });
  }

  async putObject(bucketName: string, key: string, body: PutObjectCommandInput['Body']) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
    });

    try {
      return await this.s3.send(command);
    } catch (error) {
      this.logger.error(`Error putting object in S3: ${error}`);
      throw error;
    }
  }

  async listObjects(bucketName: string, prefix?: string): Promise<ListObjectsCommandOutput> {
    const command = new ListObjectsCommand({
      Bucket: bucketName,
      Prefix: prefix,
    });

    try {
      return await this.s3.send(command);
    } catch (error) {
      this.logger.error(`Error listing objects in S3: ${error}`);
      throw error;
    }
  }

  async getObject(bucketName: string, key: string) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    try {
      return await this.s3.send(command);
    } catch (error) {
      this.logger.error(`Error getting object from S3: ${error}`);
      throw error;
    }
  }

  async removeObject(bucketName: string, key: string) {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    try {
      return await this.s3.send(command);
    } catch (error) {
      this.logger.error(`Error removing object from S3: ${error}`);
      throw error;
    }
  }
}
