import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PsychologistService } from '../../services/psychologist.service';
import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-conformation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './conformation-dialog.component.html',
  styleUrls: ['./conformation-dialog.component.scss']
})
export class ConformationDialogComponent {
  psychologistId: string;
  day: string;
  time: string;
  constructor(public dialogRef: MatDialogRef<ConformationDialogComponent>, private psychologistService: PsychologistService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.psychologistId = data.psychologistId; // Pass this data from the parent component
    this.day = data.day;
    this.time = data.time;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  confirmDeletion(): void {
    this.psychologistService.deleteSession(this.psychologistId, this.day, this.time).subscribe(
      () => {
        console.log(`Session deleted for psychologistId: ${this.psychologistId}, day: ${this.day}, time: ${this.time}`);
        this.dialogRef.close(true); // Close dialog on successful deletion
      },
      error => {
        console.error('Error deleting session:', error);
        // Handle error if necessary
        this.dialogRef.close(false); // Close dialog on error
      }
    );
  }
}
