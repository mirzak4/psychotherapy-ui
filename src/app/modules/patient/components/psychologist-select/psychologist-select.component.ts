import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PatientService } from '../../services/patient/patient.service';
import { IUser } from '../../../../viewmodels/viewmodels';
import { MatDialog } from '@angular/material/dialog';
import { PsychologistSessionsComponent } from '../psychologist-sessions/psychologist-sessions.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-psychologist-select',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ScrollingModule,
    MatIconModule
  ],
  templateUrl: './psychologist-select.component.html',
  styleUrl: './psychologist-select.component.scss'
})
export class PsychologistSelectComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  currentScrollIndex: number = 0;
  psychologists: IUser[] = [];

  items = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor(
    private _patientService: PatientService,
    private _matDialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._patientService.getAllPsychologists().subscribe((result: IUser[]) => this.psychologists = result);
    const googleApiToken = this._route.snapshot.queryParamMap.get('code');
    if (googleApiToken) {
      this._patientService.authenticateGoogleApi(googleApiToken).subscribe();
    }
  }

  scrollToNext() {
    this.currentScrollIndex+= 3;
    if (this.currentScrollIndex >= this.items.length) {
      this.currentScrollIndex = this.items.length - 3;
    }
    this.viewport.scrollToIndex(this.currentScrollIndex, 'smooth');
  }

  scrollToPrevious() {
    this.currentScrollIndex -= 3;
    if (this.currentScrollIndex < 0) {
      this.currentScrollIndex = 0;
    }
    this.viewport.scrollToIndex(this.currentScrollIndex, 'smooth');
  }

  openPsychologistSessions(psychologistId: string) {
    const dialogRef = this._matDialog.open(PsychologistSessionsComponent, {
      data: {
        psychologistId: psychologistId
      },
      disableClose: true,
      panelClass: 'psychologist-sessions-container'
    });

    dialogRef.afterClosed().subscribe(() => this._router.navigate(['/articles']));
  }
}
