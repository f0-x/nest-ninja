import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const get_user = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
