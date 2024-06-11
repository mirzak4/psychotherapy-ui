import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Article, ExpendedArticle } from '../../../../viewmodels/classes';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input() expandedArticle: ExpendedArticle;

  constructor(private articleService: ArticleService, private router: Router) {}

  onViewClick(): void {
    this.router.navigate([
      '/articles/article',
      this.expandedArticle.article.id,
    ]);
    this.articleService.setCurrentArticle(this.expandedArticle);
  }
}
