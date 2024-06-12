import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IQuestion, IReport } from '../../../../viewmodels/viewmodels';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _http = inject(HttpClient);

  constructor() { }

  getDailyReportQuestions(): Observable<IQuestion[]> {
    return this._http.get<IQuestion[]>('assets/data/questions.json').pipe(
      map((questions: IQuestion[]) => {
        let commonQuestions = questions.slice(0,3);
        const otherQuestions = questions.slice(3);
        const rand1 = Math.round(Math.random() * (otherQuestions.length - 1));
        let rand2 = Math.round(Math.random() * (otherQuestions.length - 1));
        while (rand1 === rand2) {
          rand2 = Math.round(Math.random() * (otherQuestions.length - 1));
        }
        commonQuestions.push(otherQuestions[rand1]);
        commonQuestions.push(otherQuestions[rand2]);

        return commonQuestions;
      })
    );
  }

  createDailyReport(report: IReport) {
    return this._http.post(environment.apiUrl + 'appointmentservice/api/daily-reports', report);
  }

  getDailyReportsForPatient(patientId: string) {
    const params = new HttpParams().set('patientId', patientId);
    return this._http.get<IReport[]>(environment.apiUrl + 'appointmentservice/api/daily-reports', { params: params });
  }
}
