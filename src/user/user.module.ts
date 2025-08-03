// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entities/user.entity';

/**
 * Defines the UserModule.
 * This module encapsulates the user-related components: the controller, service, and entity repository.
 * TypeOrmModule.forFeature() registers the User entity with the TypeORM connection for this module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export the service if other modules need to use it
})
export class UserModule {}
