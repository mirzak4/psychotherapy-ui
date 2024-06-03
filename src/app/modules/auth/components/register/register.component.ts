import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Gender, UserRole } from '../../../../viewmodels/enums';
import { AuthService } from '../../services/auth.service';
import { RegisterPatientRequest } from '../../../../viewmodels/classes';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: UntypedFormGroup;

  Gender = Gender;

  constructor(private _formBuilder: UntypedFormBuilder, private _authService: AuthService, private _router: Router) {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      // gender: [undefined, Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      let request = new RegisterPatientRequest({
        type: null,
        name: formValue.firstName + ' ' + formValue.lastName,
        email: formValue.email,
        password: formValue.password,
        userId: null,
        roleId: this._authService.getAllSystemRoles().find(r => r.name === UserRole.Patient)?.roleId
      })
      this._authService.registerPatient(request, formValue.age).subscribe(() => this._router.navigate(['sign-in']));
    }
  }
}
