import { injectable } from 'inversify';
import mongoose from 'mongoose';

import { env } from '../common/utils/env-config';
import { Logger } from '../config';

@injectable()
export class DatabaseConnection {
  private readonly logger: Logger = new Logger(DatabaseConnection.name);

  public async initConnection(): Promise<void> {
    await this.connect(env.DATABASE_URL);
  }

  public async connect(connectionString: string): Promise<void> {
    try {
      mongoose.connect(connectionString);
      this.logger.info(`Mongoose connected to ${connectionString}`);
    } catch (error) {
      this.logger.error(`Mongoose connection error: ${error}`);
    }
  }

  public setAutoReconnect(): void {
    mongoose.connection.on('disconnected', () => {
      this.logger.error('Mongoose connection disconnected. Attempting to reconnect...');
      this.connect(env.DATABASE_URL);
    });
  }

  public async disconnect(): Promise<void> {
    await mongoose.connection.close();
  }
}
