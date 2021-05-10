import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';

import { UserData, UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly connection: Connection) {
    this.setupUsers().catch((err) => {
      this.logger.error(err);
    });
  }

  async list(): Promise<UserEntity[]> {
    return this.connection.manager.find(UserEntity);
  }

  async findById(id: string): Promise<UserEntity> {
    return this.connection.manager.findOne(UserEntity, { id });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.connection.manager.findOne(UserEntity, { username });
  }

  async create(data: UserData): Promise<UserEntity> {
    const manager = this.connection.manager;
    const user = manager.create(UserEntity, data);
    return manager.save(user, { reload: true });
  }

  async update(id: string, data: Pick<UserEntity, 'color' | 'username' | 'name'>) {
    const user = await this.findById(id);
    if (user) {
      if (data.username && user.username !== data.username) {
        if (await this.exists(data.username)) {
          throw new ConflictException('Username already exists');
        }

        user.username = data.username.toLowerCase().trim();
      }

      if (data.name && user.name !== data.name) {
        user.name = data.name.trim();
      }

      if (data.color && user.color !== data.color) {
        user.color = data.color.toLowerCase();
      }

      await this.connection.manager.save(user, { reload: true });

      return user;
    }
    return null;
  }

  async exists(username: string): Promise<boolean> {
    return await this.connection.manager.count(UserEntity, { username }) > 0;
  }

  async setupUsers(): Promise<void> {
    const manager = this.connection.manager;
    const users: Pick<UserEntity, 'username' | 'name' | 'color'>[] = [
      { username: 'ragnar', name: 'Ragnar Laud', color: '495BFF' },
      { username: 'jyrgen', name: 'Jürgen Jürgenson', color: '31FFC1' },
      { username: 'jesper', name: 'Jesper Bruno Bramanis', color: '35FF31' },
    ];

    for (const user of users) {
      if (await this.exists(user.username) !== true) {
        const entity = manager.create(UserEntity, {
          username: user.username,
          name: user.name,
          color: user.color,
        });
        await manager.save(entity);
      }
    }
  }
}
