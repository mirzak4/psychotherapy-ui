import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, interval, takeUntil, tap, finalize, Subject } from 'rxjs';
import { StressReliefService } from '../../../services/stress-relief/stress-relief.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateBreathControlLogRequest, UpdateActionDurationTimeRequest } from '../../../../../viewmodels/classes';
import { AuthService } from '../../../../auth/services/auth.service';
import { IBreathControl } from '../../../../../viewmodels/viewmodels';

@Component({
  selector: 'app-breath-control',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
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
  templateUrl: './breath-control.component.html',
  styleUrl: './breath-control.component.scss'
})
export class BreathControlComponent {
  breathingStarted: boolean = false;
  audio: HTMLAudioElement;
  timerValue: number = 5;
  timer$ = timer(6000);
  exerciseMessage: string;
  breathControlStartTime: Date;
  tempo: number = 5;
  breathControl: IBreathControl;

  private _unsusbscribeAll: Subject<void> = new Subject();

  constructor(
    private _stressReliefService: StressReliefService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._stressReliefService.getBreathControlSignalAudio().subscribe((result) => {
      const blobURL = URL.createObjectURL(result);
      this.audio = new Audio(blobURL);
    });
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this._unsusbscribeAll.next();
    this._unsusbscribeAll.complete();
  }

  startBreathControl() {
    this.breathingStarted = true;

    let request = new CreateBreathControlLogRequest({
      patientId: this._authService.currentUserId,
      tempo: this.tempo
    });
    this._stressReliefService.createBreathControlLog(request)
    .subscribe((breathControl: IBreathControl) => this.breathControl = breathControl);

    interval(1000).pipe(
      takeUntil(this.timer$),
      tap(() => this.timerValue--),
      finalize(() => {
        this.breatheIn();
      })
    ).subscribe(() => this.breathControlStartTime = new Date());
  }

  breatheIn() {
    this.exerciseMessage = 'Breathe in...';
    this.audio.play();
    timer(this.tempo * 1000).pipe(
      takeUntil(this._unsusbscribeAll),
      tap(() => this.breatheOut())
    ).subscribe();
  }

  breatheOut() {
    this.exerciseMessage = 'Breathe out...';
    this.audio.play();
    timer(this.tempo * 1000).pipe(
      takeUntil(this._unsusbscribeAll),
      tap(() => this.breatheIn())
    ).subscribe();
  }

  playMusic() {
    this.audio.play();
  }

  pauseMusic() {
    this.audio.pause();
  }

  endBreathControlSession() {
    const walkEndTime = new Date();
    const duration = walkEndTime.getTime() - this.breathControlStartTime.getTime();
    const durationMinutes = duration / (1000 * 60);
    const request = new UpdateActionDurationTimeRequest({
      stressReliefActionId: this.breathControl.stressReliefActionId,
      durationTime: durationMinutes
    });
    this._stressReliefService.updateActionDurationTime(request).subscribe(() => this._router.navigate(['../'], { relativeTo: this._route }));
  }
}
