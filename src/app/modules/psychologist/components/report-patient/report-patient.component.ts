import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { IWeeklyReport, IDailyReport } from '../../../../viewmodels/viewmodels';
import { AuthService } from '../../../auth/services/auth.service';
import { PsychologistService } from '../../services/psychologist.service';
@Component({
  selector: 'app-report-patient',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './report-patient.component.html',
  styleUrls: ['./report-patient.component.scss']
})
export class ReportPatientComponent implements OnInit {
  dailyReports: any[] = [];
  weeklyReportForm: FormGroup;
  hasWeeklyReport: boolean;
  patientId: string;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReportPatientComponent>,
    public authService: AuthService,
    public psychologistService: PsychologistService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.hasWeeklyReport = data.hasWeeklyReport; // Pass this data from the parent component
    this.patientId = data.patientId;
    this.weeklyReportForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDailyReports();
  }

  loadDailyReports(): void {
    this.psychologistService.getDailyReportsForUser(this.patientId).subscribe(
      (reports: IDailyReport[]) => {
        this.dailyReports = reports;
      },
      error => {
        console.error('Error fetching daily reports:', error);
        // Handle error if needed, e.g., show error message
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createReport(): void {
    if (this.weeklyReportForm.valid) {
      const newReport: IWeeklyReport = {
        weeklyReportId: 'string', // Replace with actual data
        content: this.weeklyReportForm.get('content').value, // Dynamically get content from form
        psychologistId: this.authService.currentUserId, // Assuming you have AuthService for currentUserId
        patientId: this.patientId, // Replace with actual patientId
        createdAt: new Date().toISOString() // Replace with actual data or format
      };
       console.log(newReport);
      this.psychologistService.createWeeklyReport(newReport).subscribe(
        response => {
          console.log('Weekly report created successfully:', response);
          // Handle success if needed, e.g., show success message
        },
        error => {
          console.error('Error creating weekly report:', error);
          // Handle error if needed, e.g., show error message
        }
      );
    } else {
      // Handle form validation errors if necessary
    }
  }
}
