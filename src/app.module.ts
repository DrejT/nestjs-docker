// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import * as dotenv from 'dotenv';
import { envPath } from './lib/utils/constants/config';
// Load environment variables from a .env file

dotenv.config({ path: envPath.devPath });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      username: process.env.DB_USERNAME || 'your_username',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_DATABASE || 'your_database',
      entities: [User],
      // Important: `synchronize: true` should only be used in a development environment.
      // Use TypeORM migrations for production databases.
      synchronize: true,
    }),
    // The UserModule is now imported and available in the application
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
