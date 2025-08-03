// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Handles incoming HTTP requests for the user resource.
 * The controller exposes RESTful API endpoints for CRUD operations.
 */
@Controller('users') // Base route for this controller will be '/users'
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Handles POST requests to create a new user.
   * @param createUserDto The data transfer object for creating a user.
   * @returns A promise that resolves to the newly created user.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Handles GET requests to retrieve all users.
   * @returns A promise that resolves to an array of users.
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Handles GET requests to retrieve a single user by ID.
   * @param id The ID of the user to find.
   * @returns A promise that resolves to the user.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  /**
   * Handles PATCH requests to update a user.
   * @param id The ID of the user to update.
   * @param updateUserDto The data transfer object with updated user information.
   * @returns A promise that resolves to the updated user.
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Handles DELETE requests to remove a user.
   * @param id The ID of the user to remove.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
