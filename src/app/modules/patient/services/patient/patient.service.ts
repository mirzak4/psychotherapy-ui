import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environment';
import { ISession, IUser } from '../../../../viewmodels/viewmodels';
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
    return this._http.get<IUser[]>(environment.apiUrl + 'userservice/users').pipe(
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
      'appointmentservice/api/sessions/getAllAvailableSessions/' + psychologistId);
  }
}
