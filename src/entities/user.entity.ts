// src/entities/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Defines the User entity.
 * The @Entity() decorator tells TypeORM that this class is an entity
 * that corresponds to a database table.
 */
@Entity()
export class User {
  /**
   * The primary key of the user table.
   * @PrimaryGeneratedColumn() automatically generates a unique ID for each new entry.
   * By default, it's an integer and auto-increments.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Defines a column for the user's first name.
   * The @Column() decorator maps this property to a database column.
   * TypeORM automatically infers the database type (e.g., VARCHAR) from the TypeScript type.
   */
  @Column()
  firstName: string;

  /**
   * Defines a column for the user's last name.
   */
  @Column()
  lastName: string;

  /**
   * Defines a boolean column to indicate if the user is active.
   * The default value is set to 'true'.
   * The 'default' option is useful for setting initial values for new records.
   */
  @Column({ default: true })
  isActive: boolean;
}
