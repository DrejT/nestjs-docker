// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './logger/winston.logger';

/**
 * The main bootstrap function for the NestJS application.
 * It's an async function to allow for asynchronous operations like
 * connecting to the database.
 */
async function bootstrap() {
  // Create an instance of the NestJS application, passing the root module.
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger,
  });

  // Get the port from environment variables or use a default of 3000.
  const port = process.env.PORT || 3000;
  app.enableCors();
  app.setGlobalPrefix('api');

  // Start the application and have it listen for incoming requests on the specified port.
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Call the bootstrap function to start the application.
bootstrap();
