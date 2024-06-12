import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable, map } from 'rxjs';
import { UserRole } from '../../../../viewmodels/enums';

export interface NavigationItem {
  label: string;
  icon?: string;
  link: string;
  roles: UserRole[];
  subOptions?: NavigationItem[];
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _config: NavigationItem[] = [
    {
      label: 'Articles',
      link: '/articles',
      roles: [UserRole.Psychologist, UserRole.Patient],
    },
    {
      label: 'Your Reports',
      link: 'patient/reports',
      roles: [UserRole.Patient]
    },
    {
      label: 'Stress Relief',
      link: '/patient/stress-relief',
      roles: [UserRole.Patient]
    }
  ];
  constructor(private _authService: AuthService) {}

  public navigation$(): Observable<NavigationItem[]> {
    return this._authService.role$().pipe(
      map((role: UserRole) => {
        return this._config.filter(c => c.roles.includes(role))
      })
    )
  }
}
