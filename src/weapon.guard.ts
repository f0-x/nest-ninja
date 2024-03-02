import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { MyCustomException } from './exceptions/custom.exception';

@Injectable()
export class WeaponGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
     const request = context.switchToHttp().getRequest();
    // Your logic here...
    // if (/* Some condition */) {
      throw new MyCustomException('Access denied due to custom reason.');
    // }
    // return true;
  }
}
