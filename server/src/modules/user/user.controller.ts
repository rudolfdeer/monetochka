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
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserId } from '../../utils/userId.decorator';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async getLoggedInUser(@UserId() userId: string) {
    try {
      const response = await this.userService.getUser(userId);
      return response;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

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

  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  @HttpCode(200)
  async signIn(@Request() req) {
    try {
      const response = await this.userService.signIn(req.user);
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
    @Body('name') name: string,
  ) {
    try {
      const response = await this.userService.changeCategory(
        userId,
        categoryId,
        color,
        icon,
        expenses,
        name,
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

  @Post(':userId/share')
  @HttpCode(200)
  async shareExpenses(
    @Param('userId') userId: string,
    @Body('email') email: string,
    @Body('sum') sum: number,
  ) {
    try {
      const response = await this.userService.shareExpenses(userId, email, sum);
      return response;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Put('/:userId/currency')
  async changeCurrency(
    @Param('userId') userId: string,
    @Body('currency') currency: string,
    @Body('exchangeRate') exchangeRate: string,
  ) {
    try {
      const response = await this.userService.changeCurrency(
        userId,
        currency,
        exchangeRate,
      );
      return response;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
