import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirm-distance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './confirm-distance.component.html',
  styleUrl: './confirm-distance.component.scss'
})
export class ConfirmDistanceComponent {
  distanceCovered: number;

  constructor(private _dialogRef: MatDialogRef<ConfirmDistanceComponent>) {
  }

  proceed() {
    this._dialogRef.close(this.distanceCovered);
  }
}
