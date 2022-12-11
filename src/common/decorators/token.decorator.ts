import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse(); //ctx - http, 웹소켓, rpc서버를 하나의 서버에서 다 쓸 수 있게 해줌
    return response.locals.jwt; //중복 제거
  },
);
