import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { EventsGateway } from './user.gateway';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../utils/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../utils/strategies/jwt.strategy';
import { TOKEN } from '../../constants/auth';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: TOKEN.SECRET,
      signOptions: { expiresIn: TOKEN.LIFE },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, EventsGateway, LocalStrategy, JwtStrategy],
})
export class UserModule {}
