import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthorizationGuard } from './guard/authorization.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalGuards(
    new AuthenticationGuard(new Reflector()),
    new AuthorizationGuard(new Reflector()),
  );
  await app.listen(3000);
}
bootstrap();
