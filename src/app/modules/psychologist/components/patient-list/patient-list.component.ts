import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  displayedColumns: string[] = ['name', 'age', 'time', 'action'];
  patients = [
    {
      name: 'John Doe',
      age: 30,
      time: 'Monday 20:30'
    },
    {
      name: 'Jane Roe',
      age: 25,
      time: 'Tuesday 10:00'
    }
  ];

  onViewClick(patient: any) {
    alert(`Viewing details for ${patient.name}`);
  }
  onReportClick(patient : any){

  }
  onDeleteClick(patient : any){

  }
}
