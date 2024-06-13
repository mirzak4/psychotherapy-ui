import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/common/components/sidebar/sidebar.component';
import { AuthService } from './modules/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './modules/common/loading/services/loading.service';
import { LoadingSpinnerComponent } from './modules/common/loading/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HttpClientModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'psychotherapy';
  loading: boolean = false;

  constructor(
    private _authService: AuthService, 
    private loadingService: LoadingService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
      this._cdr.detectChanges();
    });
  }

  isSignedIn(): boolean {
    return this._authService.authenticated;
  }
}
