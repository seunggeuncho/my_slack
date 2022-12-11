import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class undefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //controller 전 부분 ex) controller가 얼마나 걸렸는지
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data))); //data는 controller에서 return 해주는 data
    //controller에서 사용 된 후 사용
  }
}
