import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-report-patient',
  standalone: true,
  imports: [],
  templateUrl: './report-patient.component.html',
  styleUrl: './report-patient.component.scss'
})
export class ReportPatientComponent {

    articleForm: UntypedFormGroup;
  
    constructor(
      private _matDialogRef: MatDialogRef<ReportPatientComponent>,
      private _formBuilder: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.articleForm = this._formBuilder.group({
        title: [data.title, Validators.required],
        content: [data.content, Validators.required],
        imageUrl: [data.imageUrl, Validators.required],
        videoUrl: [data.videoUrl, Validators.required],
      });
    }
  
    closeModal() {
      this._matDialogRef.close();
    }
  
    createArticle() {}
  }
  

