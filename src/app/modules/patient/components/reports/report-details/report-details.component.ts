import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReport } from '../../../../../viewmodels/viewmodels';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss'
})
export class ReportDetailsComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IReport
  ) {

  }
}
