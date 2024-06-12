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
import { Router } from '@angular/router';
import { Article, Video, Text, Image } from '../../../../viewmodels/classes';
import { AuthService } from '../../../auth/services/auth.service';

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
  expandedArticle: any;

  constructor(
    private _matDialogRef: MatDialogRef<EditArticleModalComponent>,
    private _formBuilder: UntypedFormBuilder,
    private articleService: ArticleService,
    private _authService: AuthService,
    private router: Router,
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

  saveArticle(): void {
    this.articleService.currentArticle$.subscribe((expandedArticle) => {
      this.expandedArticle = expandedArticle;
    });

    let editedArticle = new Article({
      id: this.expandedArticle?.article.id,
      title: this.articleForm.get('title')?.value,
      author: this._authService.currentUserId,
      text: new Text({
        content: this.articleForm.get('content')?.value,
      }),
      video: new Video({
        videoUrl: this.articleForm.get('videoUrl')?.value,
      }),
      image: new Image({
        imageUrl: this.articleForm.get('imageUrl')?.value,
      }),
    });

    this.articleService
      .updateArticle(this.expandedArticle?.article.id, editedArticle)
      .subscribe(() => {
        this.closeModal();
        this.router.navigate(['/articles']);
      });
    console.log('editovan clanak');
    console.log(editedArticle);
  }
}
