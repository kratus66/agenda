import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from "cookie-parser";
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('🌍 Variables env en runtime:', process.env.CLERK_SECRET_KEY);
  // ✅ Habilita validaciones globales para DTOs
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Permite leer cookies si decides usarlas (no afecta si no se usan)
  /* app.use(cookieParser()); */

  // ✅ Configuración de CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:3000', // frontend
    credentials: true,              // necesario si se usan headers o cookies
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Servidor corriendo en puerto: ${process.env.PORT ?? 3001}`);
}

bootstrap();
