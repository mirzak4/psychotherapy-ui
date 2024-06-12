import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../../services/reports/report.service';
import { IQuestion } from '../../../../../viewmodels/viewmodels';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { Report } from '../../../../../viewmodels/classes';
import { AuthService } from '../../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-daily-report',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    MatButtonModule
  ],
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.scss'
})
export class DailyReportComponent implements OnInit {
  questions: IQuestion[] = [];
  @ViewChild('sliderInput') sliderInput: ElementRef;
  coverImageUrls = [
    'assets/emotions.png', 
    'https://st2.depositphotos.com/1008939/8477/i/450/depositphotos_84771180-stock-photo-different-moods.jpg',
    'https://cdn.stockmediaserver.com/smsimg35/pv/IsignstockContributors/ISS_28352_19298.jpg?token=LIRxsb630gtuEFMEGYjfFKOznBbg1MVFvyH7t0nOc20&class=pv&smss=53&expires=4102358400',
    'https://www.beanbagsrus.com.au/media/amasty/blog/uploads/2023/04/different-room-colors.jpeg',
    'https://study.com/cimages/multimages/16/450_worshipping-god-21013477852499734828091853.jpg'
  ]

  constructor(
    private reportService: ReportService,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.reportService.getDailyReportQuestions().subscribe((questions: IQuestion[]) => {
      this.questions = questions;
    });
  }

  formatEmotionSlider(value: number): string {
    if (value >= 90) {
      return value + '(really happy)';
    }
    if (value >= 65 && value < 90) {
      return value + '(happy)';
    }
    if (value >= 50 && value < 65) {
      return value + '(neutral)'
    }
    if (value >= 35 && value < 50) {
      return value + '(sad)';
    }
    return value + '(really sad)';
  }

  get sliderEmoji() {
    if (this.sliderInput) {
      const sliderValue = parseInt(this.sliderInput.nativeElement.value);
      if (sliderValue >= 90) {
        return 'assets/emojis/really_happy.png';
      }
      if (sliderValue >= 65 && sliderValue < 90) {
        return 'assets/emojis/happy.png';
      }
      if (sliderValue >= 50 && sliderValue < 65) {
        return 'assets/emojis/neutral.png';
      }
      if (sliderValue >= 35 && sliderValue < 50) {
        return 'assets/emojis/sad.png';
      }
      return 'assets/emojis/really_sad.png';
    }
    return '';
  }

  submitDailyReport() {
    const reportContent = this.buildReportContent();
    const report = new Report({
      patientId: this._authService.currentUserId,
      weeklyReportId: null,
      content: reportContent,
      createdAt: ''
    });
    this.reportService.createDailyReport(report).subscribe(
      () => this._router.navigate(['../'], { relativeTo: this._route })
    );
  }

  private buildReportContent(): string {
    const sliderValue = parseInt(this.sliderInput.nativeElement.value)
    let content = '';
    this.questions.forEach(q => {
      content+= `${q.question}\nAnswer: ${q.selectedAnswer}\n\n`
    });
    content+= `\nOverall emotion score: ${this.formatEmotionSlider(sliderValue)}`;
    return content;
  }
}
