import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let ok:string;
    const authnReq = request.clone({
      setHeaders: {
        Authorization: String(sessionStorage.getItem('Authorization')),
        username:String(sessionStorage.getItem("userID"))
      }
    });
    console.log("aaa");
    return next.handle(authnReq).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) => {
          ok = event instanceof HttpResponse ? 'succeeded' : '';
          
          if(event instanceof HttpResponse)
          {
            console.log(event)
            if( event.headers.get("Authorization"))
            {
              console.log(event.headers);
              sessionStorage.setItem("Authorization",String(event.headers.get("Authorization")));
            }
          }
        },
        // Operation failed; error is an HttpErrorResponse
        error: (error) => (ok = 'failed')
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        console.log(ok);
      })
    );
  }

}
