import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  article: any;
  paragraphs: string[];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.currentArticle$.subscribe((article) => {
      this.article = article;
      if (this.article?.text.content) {
        this.paragraphs = this.article.text.content.split('\n\n');
      }
    });
  }
}
