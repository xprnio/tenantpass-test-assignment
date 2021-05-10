import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserData, UserEntity } from '../entities/user.entity';

@Controller('/users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  async getUsers(): Promise<{ users: UserEntity[] }> {
    const users = await this.users.list();
    return { users };
  }

  @Get('/by-id/:id')
  async getById(@Param('id') id: string): Promise<{ user: UserEntity }> {
    const user = await this.users.findById(id);
    if (user) return { user };

    throw new NotFoundException('User not found');
  }

  @Get('/by-username/:username')
  async getByUsername(@Param('username') username: string): Promise<{ user: UserEntity }> {
    const user = await this.users.findByUsername(username);
    if (user) return { user };

    throw new NotFoundException('User not found');
  }

  @Post()
  async createUser(@Body() data: UserData): Promise<{ user: UserEntity }> {
    if (await this.users.findByUsername(data.username)) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.users.create(data);
    return { user };
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserData,
  ): Promise<{ user: UserEntity }> {
    const user = await this.users.update(id, data);
    if (user) return { user };

    throw new NotFoundException('User not found');
  }
}
