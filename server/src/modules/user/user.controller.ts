import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const response = await this.userService.getUser(id);
    return response;
  }

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const response = await this.userService.createUser(email, password);
    return response;
  }
}
