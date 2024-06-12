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
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-edit-article-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-article-modal.component.html',
  styleUrl: './edit-article-modal.component.scss',
})
export class EditArticleModalComponent {
  articleForm: UntypedFormGroup;

  constructor(
    private _matDialogRef: MatDialogRef<EditArticleModalComponent>,
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

  saveUser(): void {}
}
