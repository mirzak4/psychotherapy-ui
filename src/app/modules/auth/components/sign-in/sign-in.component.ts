import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

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
    RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder, 
    private _authService: AuthService,
    private _router: Router
  ) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signIn() {
    if (this.signInForm.valid) {
      this._authService.signIn(this.signInForm.get('email')?.value, this.signInForm.get('password')?.value)
        .subscribe(() => {
          this._router.navigate(['patient/psychologist-select']);
        });
    }
  }
}
