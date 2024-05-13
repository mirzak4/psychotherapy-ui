import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NavigationConfig, NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  navigationItems: NavigationConfig[] = [];
  constructor(private _navigationService: NavigationService) {

  }

  ngOnInit(): void {
    this._navigationService.getNavigationData$().subscribe((config: NavigationConfig[]) => {
      this.navigationItems = config;
    });
  }
}
