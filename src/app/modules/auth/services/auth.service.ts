import { Injectable, inject } from '@angular/core';
import { ITokenUser } from '../../../viewmodels/viewmodels';
import { BehaviorSubject, Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { LoginResponse } from '../../../viewmodels/classes';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../../../viewmodels/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _accessToken$ = new BehaviorSubject<string>(this.accessToken);
  private _authenticated: boolean = false;

  constructor() { }

  // Token helper methods
  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
    this._accessToken$.next(token);
  }

  get accessToken$() {
    return this._accessToken$.asObservable();
  }

  get accessToken(): string {
    return localStorage.getItem('access_token');
  }

  get authenticated(): boolean {
    if (this._authenticated) {
      return true;
    }
    if (this.accessToken && this.isTokenValid(this.accessToken)) {
      return true;
    }
    return false;
  }

  role$(): Observable<UserRole> {
    return this._accessToken$.asObservable().pipe(
      map((token) => this.getRoleFromToken(token))
    );
  }

  get currentUserName(): string {
    const decodedToken = this.decodeToken(this.accessToken);
    return decodedToken.name;
  }

  get currentUserId(): string {
    const decodedToken = this.decodeToken(this.accessToken);
    return decodedToken.sub;
  }

  get currentUserRole(): UserRole {
    return this.getRoleFromToken(this.accessToken);
  }

  private getRoleFromToken(token: string): UserRole {
    let decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.role : UserRole.None;
  }

  private isTokenValid(token: string) {
    const decodedToken = this.decodeToken(token);
    const expiration = decodedToken.exp;

    let diff = expiration * 1000 - new Date().valueOf();

    return diff > 0;
  }

  private decodeToken(token: string): ITokenUser {
    if (!token) {
      console.log(token);
    }
    return jwtDecode<ITokenUser>(token);
  }


  // Common auth methods
  signIn(email: string, password: string): Observable<any> {
    return this._http.post<LoginResponse>(environment.apiUrl + 'userservice/login', {
      email: email,
      password: password
    }).pipe(
      tap((response: LoginResponse) => this.accessToken = response.accessToken)
    )
  }

  signOut() {
    localStorage.removeItem('access_token');
    this._authenticated = false;
    return of(true);
  }
}
