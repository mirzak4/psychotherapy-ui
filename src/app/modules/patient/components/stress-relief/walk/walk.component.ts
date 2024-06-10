import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, interval, takeUntil, tap, finalize, switchMap } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { StressReliefService } from '../../../services/stress-relief/stress-relief.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDistanceComponent } from './confirm-distance/confirm-distance.component';
import { CreateWalkLogRequest, UpdateActionDurationTimeRequest } from '../../../../../viewmodels/classes';
import { AuthService } from '../../../../auth/services/auth.service';
import { IWalk } from '../../../../../viewmodels/viewmodels';

@Component({
  selector: 'app-walk',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Initial state when element is added to the DOM
      state('*', style({ opacity: 1 })),    // State when element is visible
      transition(':enter', [
        animate('{{ duration }}' + 'ms')
      ], { params: { duration: 300 } })
    ]),
  ],
  templateUrl: './walk.component.html',
  styleUrl: './walk.component.scss'
})
export class WalkComponent {
  walkingStarted: boolean = false;
  timerValue: number = 5;
  timer$ = timer(6000);
  exerciseMessage: string;
  walkStartTime: Date;
  walk: IWalk;

  private _unsusbscribeAll: Subject<void> = new Subject();

  constructor(
    private _stressReliefService: StressReliefService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private _matDialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsusbscribeAll.next();
    this._unsusbscribeAll.complete();
  }

  startWalkingSession() {
    this.walkingStarted = true;

    interval(1000).pipe(
      takeUntil(this.timer$),
      tap(() => this.timerValue--),
    ).subscribe(() => this.walkStartTime = new Date());
  }

  endWalkingSession() {
    const dialogRef = this._matDialog.open(ConfirmDistanceComponent, {
      panelClass: 'confirm-distance-container'
    });
    dialogRef.afterClosed().pipe(
      switchMap((distanceCovered: number) => {
        let request = new CreateWalkLogRequest({
          patientId: this._authService.currentUserId,
          kilometers: distanceCovered
        });
        return this._stressReliefService.createWalkLog(request);
      }),
      tap((walk: IWalk) => this.walk = walk),
      switchMap(() => {
        const walkEndTime = new Date();
        const duration = walkEndTime.getTime() - this.walkStartTime.getTime();
        const durationMinutes = duration / (1000 * 60);
        const request = new UpdateActionDurationTimeRequest({
          stressReliefActionId: this.walk.stressReliefActionId,
          durationTime: durationMinutes
        });
        return this._stressReliefService.updateActionDurationTime(request)
      })
    ).subscribe(() => {
      this._router.navigate(['../'], { relativeTo: this._route });
    })
  }
}
