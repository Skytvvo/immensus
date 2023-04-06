import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData, REQUEST_USER_KEY } from '@immensus/data-access-services';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
