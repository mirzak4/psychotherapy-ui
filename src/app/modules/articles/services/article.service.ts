import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private currentArticleSource = new BehaviorSubject<any>(null);
  currentArticle$ = this.currentArticleSource.asObservable();

  constructor() {}

  setCurrentArticle(article: any) {
    this.currentArticleSource.next(article);
  }
}
