import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleModalComponent } from '../edit-article-modal/edit-article-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
  article: any;
  paragraphs: string[];

  constructor(
    private articleService: ArticleService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.articleService.currentArticle$.subscribe((article) => {
      this.article = article;
      if (this.article?.text.content) {
        this.paragraphs = this.article.text.content.split('\n\n');
      }
    });
  }

  openEditArticleModal() {
    this._dialog.open(EditArticleModalComponent, {
      panelClass: 'edit-article-modal-container',
      data: {
        title: this.article.title,
        content: this.article.text.content,
        imageUrl: this.article.imageUrl,
        videoUrl: this.article.videoUrl,
      },
    });
  }
}
