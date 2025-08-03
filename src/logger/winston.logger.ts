// src/logger/winston.logger.ts

import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file'; // This is needed for daily log rotation

/**
 * Creates a custom Winston logger instance for NestJS.
 * This logger will output to both the console and daily rotating log files.
 * The log level is set to 'info' in production and 'debug' in development.
 */
export const WinstonLogger = WinstonModule.createLogger({
  transports: [
    // Console transport for real-time logging during development
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(({ level, message, timestamp, context }) => {
          return `${timestamp} [${context}] ${level}: ${message}`;
        }),
      ),
    }),

    // Daily rotating file transport for production logging
    // This creates new log files daily and deletes old ones to save space
    new transports.DailyRotateFile({
      level: 'info',
      filename: `logs/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
