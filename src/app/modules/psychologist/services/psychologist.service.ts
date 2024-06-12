import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { IPatient, ISession, IUser, IWeeklyReport , IDailyReport, ICreateSessionRequest} from '../../../viewmodels/viewmodels';
import { AuthService } from '../../auth/services/auth.service';
import { UserRole } from '../../../viewmodels/enums';
import { Observable } from 'rxjs';
import { forkJoin , of} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PsychologistService {
  private _http = inject(HttpClient);
  private _authService = inject(AuthService);
  constructor() { }
  getAllPatientsForPsychologist() {
    return this._http.get<IPatient[]>(environment.apiUrl + 'appointmentservice/patients/all').pipe(
      map((users: IPatient[]) => {
        return users.filter(u => u.selectedPsychologistId == this._authService.currentUserId);
      })
    );
  }
  getDailyReportsForUser(patientId: string): Observable<IDailyReport[]> {
    return this._http.get<IDailyReport[]>(`${environment.apiUrl}appointmentservice/api/daily-reports?patientId=${patientId}`).pipe(
      map(reports => this.filterReportsLast7Days(reports))
    );
  }
  deleteSession(psychologistId: string, day: string, time: string): Observable<any> {
    const url = `${environment.apiUrl}appointmentservice/api/sessions/deleteSession/{psychologistId}/{day}/{time}?psychologistId=${this._authService.currentUserId}&day=${day}&time=${time}`;
    return this._http.delete(url);
  }
  private filterReportsLast7Days(reports: IDailyReport[]): IDailyReport[] {
    const currentDate = new Date();
    const last7Days = new Date(currentDate.setDate(currentDate.getDate() - 7));

    return reports.filter(report => {
      const createdAtDate = new Date(report.createdAt);
      return createdAtDate >= last7Days;
    });
  }
  createWeeklyReport(weeklyReport: IWeeklyReport): Observable<any> {
    return this._http.post(`${environment.apiUrl}appointmentservice/weekly-reports/create`, weeklyReport);
  }
  getAllSessionsForPsychologist(): Observable<any[]> {
    return this._http.get<ISession[]>(`${environment.apiUrl}appointmentservice/api/sessions/getPsychologistSessions/${this._authService.currentUserId}`).pipe(
      map((sessions: ISession[]) => {
        console.log('Sessions before filtering:', sessions); // Debug log for sessions before filtering
        return sessions.filter(session => session.patientId !== null);
      }),
      switchMap((filteredSessions: ISession[]) => {
        console.log('Filtered Sessions:', filteredSessions); // Debug log for filtered sessions
        const userRequests = filteredSessions.map(session => 
          forkJoin([
            this.getUserByUserId(session.patientId),
            this.getPatientByUserId(session.patientId)
          ]).pipe(
            map(([user, patient]) => ({ ...session, user, patient }))
          )
        );
        return forkJoin(userRequests);
      })
    );
  }
  getAllFreeSessions(): Observable<any[]> {
    return this._http.get<ISession[]>(`${environment.apiUrl}appointmentservice/api/sessions/getPsychologistSessions/${this._authService.currentUserId}`).pipe(
      map((sessions: ISession[]) => {
        console.log('Sessions before filtering:', sessions); // Debug log for sessions before filtering
        return sessions.filter(session => session.patientId == null);
      })
    );
  }
  createSession(request: ICreateSessionRequest): Observable<any> {
    request.psychologistId=this._authService.currentUserId;
    const url = `${environment.apiUrl}appointmentservice/api/sessions/create`;
    return this._http.post<any>(url, request);
  }
  getWeeklyReportsForPsychologist(): Observable<IWeeklyReport[]> {
    return this._http.get<IWeeklyReport[]>(`${environment.apiUrl}appointmentservice/weekly-reports/psychologist/${this._authService.currentUserId}`);
  }
  checkIfPatientHasWeeklyReportForThisWeek(patientId: string): Observable<boolean> {
    return this.getWeeklyReportsForPsychologist().pipe(
      map((reports: IWeeklyReport[]) => {
        console.log('Weekly reports:', reports); // Log the reports
        const currentWeekStart = this.getStartOfCurrentWeek();
        const currentWeekEnd = this.getEndOfCurrentWeek();
        
        return reports.some(report => 
          report.patientId === patientId && 
          new Date(report.createdAt) >= currentWeekStart && 
          new Date(report.createdAt) <= currentWeekEnd
        );
      }),
      catchError(() => of(false)) // In case of error, return false
    );
  }

  private getStartOfCurrentWeek(): Date {
    const now = new Date();
    const startOfWeek = now.getDate() - now.getDay();
    const start = new Date(now.setDate(startOfWeek));
    start.setHours(0, 0, 0, 0);
    return start;
  }

  private getEndOfCurrentWeek(): Date {
    const now = new Date();
    const endOfWeek = now.getDate() + (6 - now.getDay());
    const end = new Date(now.setDate(endOfWeek));
    end.setHours(23, 59, 59, 999);
    return end;
  }

  getUserByUserId(userId: string): Observable<IUser> {
    return this._http.get<IUser>(`${environment.apiUrl}userservice/userId/${userId}`);
  }
  getPatientByUserId(userId: string): Observable<IPatient> {
    return this._http.get<IPatient>(`${environment.apiUrl}appointmentservice/patients/find/${userId}`);
  }
}

