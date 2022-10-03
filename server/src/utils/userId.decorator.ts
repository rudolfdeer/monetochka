import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(ctx);
    const request = ctx.switchToHttp().getRequest();
    return request.user.id;
  },
);
