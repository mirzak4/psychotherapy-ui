import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PsychologistService } from '../../services/psychologist.service';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-appointments.component.html',
  styleUrls: ['./create-appointments.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppointmentComponent>, private psychologistService: PsychologistService
  ) {
    this.appointmentForm = this.fb.group({
      day: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;

      this.psychologistService.createSession({
        psychologistId: 'null', // Replace with actual ID or retrieve from AuthService
        day: formData.day,
        time: formData.time
      }).subscribe(
        response => {
          console.log('Session created successfully:', response);
          // Handle success if needed
          this.dialogRef.close(); // Close dialog upon successful creation
        },
        error => {
          console.error('Error creating session:', error);
          // Handle error if needed
        }
      );
    } else {
      // Handle form validation errors if necessary
    }
  }
}
