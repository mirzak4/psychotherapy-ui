import { Injectable, inject } from '@angular/core';
import { IRegisterPatientRequest, IRole, ITokenUser } from '../../../viewmodels/viewmodels';
import { BehaviorSubject, Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment';
import { LoginResponse, Role } from '../../../viewmodels/classes';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../../../viewmodels/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _accessToken$ = new BehaviorSubject<string>(this.accessToken);
  private _authenticated: boolean = false;
  private _systemRoles: Role[] = [];

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

  registerPatient(request: IRegisterPatientRequest, patientAge: number) {
    const params = new HttpParams().set('age', patientAge);
    return this._http.post(environment.apiUrl + 'userservice/registerPatient', request, { params: params });
  }

  getAllSystemRoles(): Role[] {
    // return this._systemRoles;
    return [
      {
        roleId: '334e6b37-a502-4f77-9aa7-6350bf82bf82',
        name: 'Administrator'
      },
      {
        roleId: '57fc36a7-66fc-4442-a8fd-6c800cdc58e7',
        name: 'Patient'
      },
      {
        roleId: '7cc454ab-65b7-4dbb-9068-76b98589f801',
        name: 'Psychologist'
      }
    ]
  }

  getAllRoles() {
    return this._http.get<IRole[]>(environment.apiUrl + 'userservice/roles').pipe(
      tap((roles: IRole[]) => this._systemRoles = roles)
    );
  }
}
