import { Injectable } from '@angular/core';
import { Role } from '../../../viewmodels/viewmodels';
import { BehaviorSubject, Observable, Subject, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessToken$ = new BehaviorSubject<string>(null);

  constructor() { }

  set accessToken(token: string) {
    this._accessToken$.next(token);
  }

  get accessToken$() {
    return this._accessToken$.asObservable();
  }

  get currentUserRole$(): Observable<Role> {
    return this.accessToken$.pipe(
      map((token) => this.getRoleFromToken(token))
    )
  }

  private getRoleFromToken(token: string): Role {
    return token ? Role.Psychologist : Role.None;
  }

  signIn(email: string, password: string): Observable<any> {
    return of(1).pipe(
      tap(() => this.accessToken = 'test')
    )
  }
}
