import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { UsersModule } from './users.module';
import { PORT } from './constants';

(async function bootstrap() {
  const app = await NestFactory.create(UsersModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
})();
