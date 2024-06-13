import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of, switchMap, tap } from 'rxjs';
import { UserRole } from '../../../../viewmodels/enums';
import { PatientService } from '../../../patient/services/patient/patient.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StatusSnackbarComponent } from '../../../common/components/status-snackbar/status-snackbar.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder, 
    private _authService: AuthService,
    private _router: Router,
    private _patientService: PatientService,
    private _matSnackbar: MatSnackBar
  ) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signIn() {
    if (this.signInForm.valid) {
      this._authService.signIn(this.signInForm.get('email')?.value, this.signInForm.get('password')?.value).pipe(
        switchMap(() => {
          const role = this._authService.currentUserRole;
          switch (role) {
            case UserRole.Psychologist: 
              return of(true)
            case UserRole.Patient:
              return this._patientService.checkIfPatientHasChosenPsychologist(this._authService.currentUserId);
            default:
              return of(true);
        }}),
        tap(() => {
          this._matSnackbar.openFromComponent(StatusSnackbarComponent, {
            duration: 4000,
            data: {
                success: true,
                message: `Login successfull`,
            },
            verticalPosition: 'top',
            horizontalPosition: 'end',
          })
        }),
        tap((homeNavigation) => {
          if (homeNavigation) {
            this._router.navigate(['/articles']);
          }
          else {
            this._router.navigate(['/patient/psychologist-select']);
          }
        })
      )
        .subscribe(() => {
          // const role = this._authService.currentUserRole;
          // switch (role) {
          //   case UserRole.Psychologist: 
          //     this._router.navigate(['articles']);
          //     return;
          //   case UserRole.Patient:

          // }
          // this._router.navigate(['patient/psychologist-select']);
        });
    }
  }
}
