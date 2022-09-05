import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.az6eu.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'monetochka',
      },
    ),
    UserModule,
  ],
})
export class AppModule {}
