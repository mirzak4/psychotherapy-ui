import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient/patient.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISession } from '../../../../viewmodels/viewmodels';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddPatientToSessionRequest } from '../../../../viewmodels/classes';
import { AuthService } from '../../../auth/services/auth.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusSnackbarComponent } from '../../../common/components/status-snackbar/status-snackbar.component';

@Component({
  selector: 'app-psychologist-sessions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './psychologist-sessions.component.html',
  styleUrl: './psychologist-sessions.component.scss'
})
export class PsychologistSessionsComponent implements OnInit, AfterViewInit {
  sessions: ISession[] = [];
  dataSource: MatTableDataSource<ISession> = new MatTableDataSource([]);
  displayedColumns = ['dayOfWeek', 'time', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _patientService: PatientService,
    private _matDialogRef: MatDialogRef<PsychologistSessionsComponent>,
    private _authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router: Router,
    private _matSnackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this._patientService.getSessionsForPsychologist(this.data.psychologistId).subscribe((result) => {
      this.sessions = result
      this.dataSource.data = this.sessions;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  addPatientToSession(session: ISession) {
    if (!session.patientId) {
      this._patientService.tryCreateGoogleCalendarEvent(this._authService.currentUserEmail, session.day, session.time).pipe(
        switchMap((response) => {
          if ('entries' in response) {
            const request = new AddPatientToSessionRequest({
              psychologistId: this.data.psychologistId,
              patientId: this._authService.currentUserId,
              day: session.day,
              time: session.time
            });
            return this._patientService.addPatientToSession(request).pipe(
              tap(() => {
                this._matSnackbar.openFromComponent(StatusSnackbarComponent, {
                  duration: 3000,
                  data: {
                      success: true,
                      message: `Session assigned`,
                  },
                  verticalPosition: 'top',
                  horizontalPosition: 'end',
                });
                this._matDialogRef.close();
              })
            );
          }
          else {
            return of(false).pipe(
              tap(() => window.location.href = response.googleUrl)
            );
          }
        })
      )
      .subscribe();
    }
  }

  getSessionStatus(session: ISession) {
    return session.patientId ? 'Reserved' : 'Available';
  }

}
