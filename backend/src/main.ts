import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
   app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
  console.log(process.env.PORT )
}
bootstrap();
