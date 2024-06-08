import { injectable } from 'inversify';
import { createLogger, format, LogCallback, transports } from 'winston';

const { colorize, combine, label, printf, timestamp } = format;

@injectable()
export class Logger {
  constructor(private readonly loggerLabel: string = 'ExpressApplication') {}

  private readonly consoleTransport = new transports.Console({
    format: combine(
      colorize({
        all: true,
        colors: {
          info: 'bold blue',
          warn: 'italic yellow',
          error: 'bold red',
          debug: 'green',
        },
      })
    ),
  });

  private logger = createLogger({
    level: 'debug',
    format: combine(
      label({ label: `[${this.loggerLabel}]` }),
      timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      printf(function (info) {
        return `\x1B[33m\x1B[3[${info.label}\x1B[23m\x1B[39m \x1B[32m${info.timestamp}\x1B[39m ${info.level} : ${info.message}`;
      })
    ),
    transports: [this.consoleTransport],
    exceptionHandlers: [this.consoleTransport],
  });

  public info(message: any, callback?: LogCallback) {
    this.logger.info(message, callback);
  }

  public warn(message: any, callback?: LogCallback) {
    this.logger.warn(message, callback);
  }

  public error(message: any, callback?: LogCallback) {
    this.logger.error(message, callback);
  }

  public debug(message: any, callback?: LogCallback) {
    this.logger.debug(message, callback);
  }
}
