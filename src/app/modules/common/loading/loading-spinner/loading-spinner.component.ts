import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-spinner',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  constructor(private loadingService: LoadingService) {
  }

  get show$(): Observable<boolean> {
    return this.loadingService.loading$;
  }
}
