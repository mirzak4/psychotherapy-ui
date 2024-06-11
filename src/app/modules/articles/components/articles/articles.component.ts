import { Component, OnInit } from '@angular/core';
import {
  Article,
  ExpendedArticle as ExpandedArticle,
  Psychologist,
} from '../../../../viewmodels/classes';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { Image, Text, Video } from '../../../../viewmodels/classes';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { NgModule } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import {
  IArticle,
  IPsychologistArticleMap,
} from '../../../../viewmodels/viewmodels';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,
    ArticleCardComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  allExpandedArticles: ExpandedArticle[] = [];
  articlesAndPsychologist: IPsychologistArticleMap[];

  constructor(
    private _articlesService: ArticleService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._articlesService.getAllArticles().subscribe();
    this._articlesService.articles$.subscribe(
      (articlesPsy: IPsychologistArticleMap[]) => {
        this.articlesAndPsychologist = articlesPsy;
        this.articlesAndPsychologist.forEach((psychologistArticles) => {
          if (psychologistArticles.articles) {
            let articlesWithPsychologistName =
              psychologistArticles.articles.map((article) => {
                return new ExpandedArticle({
                  authorName: psychologistArticles.psychologistDetails.name,
                  article: article,
                });
              });
            this.allExpandedArticles.push(...articlesWithPsychologistName);
          }
        });
        console.log('aaaa');
        console.log(this.allExpandedArticles);
      }
    );
  }

  openNewArticleModal() {
    this._dialog.open(ArticleModalComponent, {
      panelClass: 'article-modal-container',
    });
  }
}
