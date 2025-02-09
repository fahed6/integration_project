import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService,
    private router:Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }
    
        const token = this.userAuthService.getToken();
    
        // Handle the case where token is null
        if (!token) {
            // Handle this case according to your application logic
            // For example, you might want to redirect the user to the login page
            this.router.navigate(['/login']);
            // Returning throwError here is just an example. You might want to handle it differently.
            return throwError('Token is null');
        }
    
        req = this.addToken(req, token);
    
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err.status);
                if (err.status === 401) {
                    this.router.navigate(['/login']);
                } else if (err.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
                return throwError("Something is wrong");
            })
        );
    }
    


  private addToken(request:HttpRequest<any>, token:string) {
      return request.clone(
          {
              setHeaders: {
                  Authorization : `Bearer ${token}`
              }
          }
      );
  }
}