import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
      MongooseModule.forFeature([{name: Person.name, schema: PersonSchema}]),
      MongooseModule.forRoot('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      AuthModule,
      UsersModule,
      RegisterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
