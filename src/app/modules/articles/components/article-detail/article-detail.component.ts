import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleModalComponent } from '../edit-article-modal/edit-article-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { UserRole } from '../../../../viewmodels/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [
    CommonModule,
    EditArticleModalComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  expandedArticle: any;
  paragraphs: string[];
  currentUserRole: UserRole;

  constructor(
    private articleService: ArticleService,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._authService.role$().subscribe((role: UserRole) => {
      this.currentUserRole = role;
    });

    this.articleService.currentArticle$.subscribe((expandedArticle) => {
      this.expandedArticle = expandedArticle;
      if (this.expandedArticle.article?.text.content) {
        this.paragraphs =
          this.expandedArticle.article.text.content.split('\n\n');
      }
    });
  }

  deleteArticleModal() {
    this.articleService
      .deleteArticle(this.expandedArticle?.article.id)
      .subscribe(() => {
        this.router.navigate(['/articles']);
      });
    console.log(this.expandedArticle?.article.id);
  }
}
