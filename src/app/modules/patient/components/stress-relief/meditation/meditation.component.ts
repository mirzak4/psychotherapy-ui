import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, interval, takeUntil, tap, timer } from 'rxjs';
import { StressReliefService } from '../../../services/stress-relief/stress-relief.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CreateMeditationLogRequest, UpdateActionDurationTimeRequest } from '../../../../../viewmodels/classes';
import { AuthService } from '../../../../auth/services/auth.service';
import { IMeditation } from '../../../../../viewmodels/viewmodels';

@Component({
  selector: 'app-meditation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
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
  templateUrl: './meditation.component.html',
  styleUrl: './meditation.component.scss'
})
export class MeditationComponent implements OnInit, OnDestroy {
  meditationStarted: boolean = false;
  audio: HTMLAudioElement;
  timerValue: number = 5;
  timer$ = timer(6000);
  meditationStartTime: Date;
  meditation: IMeditation;

  constructor(
    private _stressReliefService: StressReliefService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._stressReliefService.getMeditationAudio().subscribe((result) => {
      const blobURL = URL.createObjectURL(result);
      this.audio = new Audio(blobURL);
    });
  }

  ngOnDestroy(): void {
    this.audio.pause();
  }

  startMeditation() {
    this.meditationStarted = true;
    
    let request = new CreateMeditationLogRequest({
      patientId: this._authService.currentUserId,
      music: true
    });
    this._stressReliefService.createMeditationLog(request)
      .subscribe((meditation: IMeditation) => this.meditation = meditation);
    
    interval(1000).pipe(
    takeUntil(this.timer$),
    tap(() => this.timerValue--),
    finalize(() => {
      this.audio.play();
    })
  ).subscribe(() => this.meditationStartTime = new Date());
  }

  playMusic() {
    this.audio.play();
  }

  pauseMusic() {
    this.audio.pause();
  }

  endMeditationSession() {
    const walkEndTime = new Date();
    const duration = walkEndTime.getTime() - this.meditationStartTime.getTime();
    const durationMinutes = duration / (1000 * 60);
    const request = new UpdateActionDurationTimeRequest({
      stressReliefActionId: this.meditation.stressReliefActionId,
      durationTime: durationMinutes
    });
    this._stressReliefService.updateActionDurationTime(request).subscribe(() => this._router.navigate(['../'], { relativeTo: this._route }));
  }
}
