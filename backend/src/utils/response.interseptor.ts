import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {

    return next.handle().pipe(

      // SUCCESS
      map((data) => {
        data.success = true;
        return data;
      }),

      // ERROR
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}