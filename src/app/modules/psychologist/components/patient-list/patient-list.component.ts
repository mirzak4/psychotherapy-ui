import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReportPatientComponent } from '../report-patient/report-patient.component';
import { ConformationDialogComponent } from '../conformation-dialog/conformation-dialog.component';
import { PsychologistService } from '../../services/psychologist.service';
import { CreateAppointmentComponent } from '../create-appointments/create-appointments.component';
@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  displayedColumns: string[] = ['name', 'age', 'time', 'action'];
 
  patients: any[] = []; 
  freeAppointments: any[] = []; 
  weeklyReportExistence: { [key: string]: boolean } = {};
  constructor(private sessionService: PsychologistService, private dialog: MatDialog) {}
  displayedColumnsFreeAppointments: string[] = ['day', 'time', 'action'];
  ngOnInit(): void {
    this.sessionService.getAllSessionsForPsychologist().subscribe((sessions: any[]) => {
      this.patients = sessions.map(session => ({
        day: session.day,
        name: session.user.name,
        age: session.patient.age,
        userId: session.patient.userId,
        time: session.time,
        sessionId: session.sessionId 
      }));
    });
    this.patients.forEach(patient => {
      this.checkIfWeeklyReportExists(patient.id);
    });
    this.sessionService.getAllFreeSessions().subscribe((freeSessions: any[]) => {
      this.freeAppointments = freeSessions.map(session => ({
        day: session.day,
        time: session.time
      }));
    });
  }

  onViewClick(patient: any) {
    alert(`Viewing details for ${patient.name}`);
  }

  onReportClick(patient: any) {
    const dialogRef = this.dialog.open(ReportPatientComponent, {
      width: '750px',
      height: '500px',
      panelClass: 'article-modal-container',
      data: { 
        dailyReports: this.getDailyReports(patient),
        hasWeeklyReport: this.checkIfWeeklyReportExists(patient),
        patientId: patient.userId
      }
    });
    console.log(this.sessionService.checkIfPatientHasWeeklyReportForThisWeek(this.patients[0].userId));
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Weekly report saved:', result);
      }
    });
  }
  checkIfWeeklyReportExists(patientId: string): void {
    this.sessionService.checkIfPatientHasWeeklyReportForThisWeek(patientId).subscribe(hasReport => {
      this.weeklyReportExistence[patientId] = hasReport;
      console.log(`Patient ${patientId} has weekly report:`, hasReport);
    });
  }
  hasWeeklyReport(patientId: string): boolean {
    return this.weeklyReportExistence[patientId] ?? false;
  }
  onDeleteClick(psychologistId: string, day: string, time:string) {
    const dialogRef = this.dialog.open(ConformationDialogComponent, {
      width: '400px',
      data: { psychologistId, day, time }
    });
    console.log(psychologistId);
    console.log(day);
    console.log(time);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  openCreateAppointmentDialog(): void {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      width: '400px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The create appointment dialog was closed');
      // Handle any result from dialog if needed
      this.ngOnInit();
    });
  }
  getDailyReports(patient: any) {
    // Fetch daily reports for the patient from the backend
    return [
      { created_at: '2023-06-01', content: 'Daily report content 1' },
      { created_at: '2023-06-02', content: 'Daily report content 2' }
      // Add more daily reports here
    ];
  }
}
