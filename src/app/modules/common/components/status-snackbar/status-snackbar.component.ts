import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-status-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './status-snackbar.component.html',
  styleUrl: './status-snackbar.component.scss'
})
export class StatusSnackbarComponent {
  constructor(
    private _snackRef: MatSnackBarRef<StatusSnackbarComponent>, 
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
  
}
