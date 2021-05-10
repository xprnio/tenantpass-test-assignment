import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserEntity } from './entities/user.entity';
import { DB_PATH } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: DB_PATH,
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
