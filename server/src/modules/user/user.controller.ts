import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    try {
      const response = await this.userService.getUser(id);
      return response;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post('/sign-up')
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const response = await this.userService.createUser(email, password);
      return response;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  @Post('/sign-in')
  @HttpCode(200)
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const response = await this.userService.signIn(email, password);
      return response;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
