import { Component, Inject, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient/patient.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISession } from '../../../../viewmodels/viewmodels';

@Component({
  selector: 'app-psychologist-sessions',
  standalone: true,
  imports: [],
  templateUrl: './psychologist-sessions.component.html',
  styleUrl: './psychologist-sessions.component.scss'
})
export class PsychologistSessionsComponent implements OnInit {
  sessions: ISession[] = [];
  
  constructor(
    private _patientService: PatientService,
    private _matDialogRef: MatDialogRef<PsychologistSessionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  ngOnInit(): void {
    this._patientService.getSessionsForPsychologist(this.data.psychologistId).subscribe((result) => console.log(result));
  }
}
