// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Provides the business logic for managing users.
 * The service interacts with the TypeORM repository to perform database operations.
 */
@Injectable()
export class UserService {
  constructor(
    // Inject the TypeORM repository for the User entity
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user in the database.
   * @param createUserDto The data transfer object containing user information.
   * @returns The newly created user entity.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  /**
   * Finds all users.
   * @returns An array of all user entities.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Finds a single user by their ID.
   * @param id The ID of the user to find.
   * @returns The user entity or null if not found.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  /**
   * Updates an existing user.
   * @param id The ID of the user to update.
   * @param updateUserDto The data transfer object with updated information.
   * @returns The updated user entity.
   */
  async update(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    // Merge the existing user with the new data
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  /**
   * Deletes a user by their ID.
   * @param id The ID of the user to delete.
   */
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    await this.userRepository.remove(user);
  }
}
