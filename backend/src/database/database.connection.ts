import { injectable } from 'inversify';
import mongoose from 'mongoose';

import { env } from '../common/utils/env-config';
import { Logger } from '../config';

@injectable()
export class DatabaseConnection {
  private readonly logger: Logger = new Logger(DatabaseConnection.name);
  private readonly uri = env.DATABASE_URL;

  public async initConnection(): Promise<void> {
    await this.connect();
  }

  public async connect(): Promise<void> {
    this.logger.info(`Mongoose connecting to ${this.uri}`);
    try {
      await mongoose.connect(this.uri, {
        user: env.MONGO_INITDB_ROOT_USERNAME,
        pass: env.MONGO_INITDB_ROOT_PASSWORD,
      });
      this.logger.info(`Mongoose connected to ${this.uri}`);
    } catch (error) {
      this.logger.error(`Mongoose connection error: ${error}`);
    }
  }

  public setAutoReconnect(): void {
    mongoose.connection.on('disconnected', () => {
      this.logger.error('Mongoose connection disconnected. Attempting to reconnect...');
      this.connect();
    });
  }

  public async disconnect(): Promise<void> {
    await mongoose.connection.close();
  }
}
