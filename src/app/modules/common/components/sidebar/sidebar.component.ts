import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { NavigationItem, NavigationService } from '../../services/navigation/navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  navigationItems: NavigationItem[] = [];
  private _unsubscribeAll: Subject<void> = new Subject();
  showSubOptions: boolean = false;

  constructor(
    private _navigationService: NavigationService, 
    private _authService: AuthService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this._navigationService.navigation$().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((config: NavigationItem[]) => {
      this.navigationItems = config;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signOut() {
    this._authService.signOut().subscribe(() => this._router.navigate(['/sign-in']));
  }
}
