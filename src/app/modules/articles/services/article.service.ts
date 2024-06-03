import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  IArticle,
  IPsychologistArticleMap,
} from '../../../viewmodels/viewmodels';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private currentArticleSource = new BehaviorSubject<any>(null);
  private _articles: BehaviorSubject<IPsychologistArticleMap[]> =
    new BehaviorSubject<IPsychologistArticleMap[]>([]);
  currentArticle$ = this.currentArticleSource.asObservable();
  private _http = inject(HttpClient);

  get articles$(): Observable<IPsychologistArticleMap[]> {
    return this._articles.asObservable();
  }

  constructor() {}

  setCurrentArticle(article: any) {
    this.currentArticleSource.next(article);
    // this.currentArticleSource.complete
  }

  getAllArticles() {
    return this._http
      .get<IPsychologistArticleMap[]>(environment.apiUrl + 'articles/all')
      .pipe(
        tap((result) => {
          this._articles.next(result);
        })
      );
  }
}
