import { Injectable } from '@angular/core';
import { Role } from '../../../../viewmodels/viewmodels';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable, map } from 'rxjs';

export interface NavigationConfig {
  label: string;
  link: string;
  roles: Role[];
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _config: NavigationConfig[] = [
    {
      label: 'Articles',
      link: '/articles',
      roles: [Role.Psychologist, Role.Patient],
    },
  ];
  constructor(private _authService: AuthService) {}

  getNavigationData$(): Observable<NavigationConfig[]> {
    return this._authService.currentUserRole$.pipe(
      map((role) => {
        return this._config.filter((c) => c.roles.includes(role));
      })
    );
  }
}
