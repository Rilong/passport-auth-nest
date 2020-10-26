import {join} from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import * as session from 'express-session';
import flash = require('connect-flash')
import passport = require('passport')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(session({
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: false
  }))
  app.use(flash())

  app.use(passport.initialize())
  app.use(passport.session())

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')
  app.set('view options', { layout: 'layouts/main' })

  await app.listen(3000);
}

bootstrap();
