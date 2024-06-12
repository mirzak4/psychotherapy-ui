import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Article, Image, Text } from '../../../../viewmodels/classes';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-article-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './article-modal.component.html',
  styleUrl: './article-modal.component.scss',
})
export class ArticleModalComponent {
  articleForm: UntypedFormGroup;

  constructor(
    private _matDialogRef: MatDialogRef<ArticleModalComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _articleService: ArticleService,
    private _authService: AuthService
  ) {
    this.articleForm = this._formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['', Validators.required],
      videoUrl: ['', Validators.required],
    });
  }

  closeModal() {
    this._matDialogRef.close();
  }

  createArticle() {
    let article = new Article({
      id: '',
      title: this.articleForm.get('title')?.value,
      author: this._authService.currentUserId,
      text: new Text({
        content: this.articleForm.get('content')?.value,
      }),
      image: new Image({
        imageUrl: this.articleForm.get('imageUrl')?.value,
      }),
    });
    /*this._articleService.createArticle(article).subscribe(() => {
      this.closeModal();
    });*/
    console.log(article);
  }
}
