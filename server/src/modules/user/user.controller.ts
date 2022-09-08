import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
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

  @Put('/:userId/category/:categoryId')
  async changeCategory(
    @Param('userId') userId: string,
    @Param('categoryId') categoryId: string,
    @Body('color') color: string,
    @Body('icon') icon: string,
    @Body('expenses') expenses: number,
  ) {
    try {
      const response = await this.userService.changeCategory(
        userId,
        categoryId,
        color,
        icon,
        expenses,
      );
      return response;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post('/:userId/category')
  async createCategory(
    @Param('userId') userId: string,
    @Body('name') name: string,
  ) {
    try {
      const response = await this.userService.createCategory(userId, name);
      return response;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete('/:userId/category/:categoryId')
  async deleteCategory(
    @Param('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    try {
      const response = await this.userService.deleteCategory(
        userId,
        categoryId,
      );
      return response;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
