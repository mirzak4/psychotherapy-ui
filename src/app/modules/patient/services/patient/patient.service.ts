import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environment';
import { IAddPatientToSessionRequest, ISession, IUser } from '../../../../viewmodels/viewmodels';
import { map } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { UserRole } from '../../../../viewmodels/enums';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private _http = inject(HttpClient);
  private _authService = inject(AuthService);
  
  constructor() { }

  getAllPsychologists() {
    return this._http.get<IUser[]>(environment.apiUrl + '/users/all').pipe(
      map((users: IUser[]) => {
        const psychologistRole = this._authService.getAllSystemRoles().find(
          r => r.name === UserRole.Psychologist
        ).roleId;
        return users.filter(u => u.roleId === psychologistRole);
      })
    );
  }

  getSessionsForPsychologist(psychologistId: string) {
    return this._http.get<ISession[]>(environment.apiUrl + 
      'sessions/getAllAvailableSessions/' + psychologistId);
  }

  addPatientToSession(request: IAddPatientToSessionRequest) {
    return this._http.post(environment.apiUrl + 
      'sessions/addPatient',
      request
    );
  }

  checkIfPatientHasChosenPsychologist(patientId: string) {
    return this._http.get<boolean>(environment.apiUrl +
      'patients/checkIfPatientHasChosenPsychologist/' + patientId
    );
  }

  tryCreateGoogleCalendarEvent(userEmail: string, day: string, time: string) {
    const params = new HttpParams()
      .set('psychologistEmail', userEmail)
      .set('day', day)
      .set('time', time);
    return this._http.get<any>(environment.apiUrl +
      'route/',
      { params: params });
  }

  authenticateGoogleApi(token: string) {
    const params = new HttpParams()
    .set('code', token)
    .set('scope', '');
    return this._http.get(environment.apiUrl +
      'route/token',
      { params: params }
    );
  }
}
