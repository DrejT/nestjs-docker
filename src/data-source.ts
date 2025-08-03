// src/data-source.ts
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';

// Load environment variables from .env file
dotenv.config({ path: '.env.local' });

/**
 * TypeORM Data Source configuration for use with the TypeORM CLI.
 * This is used for running migrations and other CLI commands.
 * It is separate from the NestJS TypeOrmModule.forRoot configuration
 * and is required for tools like the `migration:generate` command.
 */
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt((process.env.DB_PORT as string) || '5432', 10), // Fix: Ensure a string is always passed to parseInt
  username: process.env.DB_USERNAME || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_DATABASE || 'your_database',

  // Set synchronize to false for production to use migrations
  synchronize: false,
  logging: true,

  // Entities and migrations paths are relative to this file
  entities: [User],
  migrations: [__dirname + '/migration/*.ts'],
  subscribers: [],
} as DataSourceOptions);
