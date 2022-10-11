import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TOKEN } from '../../constants/auth';

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.body.jwt) {
    token = req.body.jwt;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: TOKEN.SECRET,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub };
  }
}
