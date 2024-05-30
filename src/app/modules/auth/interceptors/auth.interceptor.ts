import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let newReq = req;

  if (authService.authenticated) {
        newReq = req.clone({
            headers: req.headers.set(
                'Authorization',
                'Bearer ' + authService.accessToken
            ),
            url: req.url
        });
  }

  return next(newReq).pipe(
    catchError((response) => {
      // Catch "401 Unauthorized" responses
      if (response instanceof HttpErrorResponse && response.status === 401) {
        // Sign out
        return authService.signOut().pipe(
          tap(() => router.navigate(['/home']))
        );
      }
      return of(response);
    })
  );
};