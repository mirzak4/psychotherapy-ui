import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import {
  IArticle,
  IPsychologistArticleMap,
} from '../../../viewmodels/viewmodels';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private currentExpandedArticleSource = new BehaviorSubject<any>(null);

  private _articles: BehaviorSubject<IPsychologistArticleMap[]> =
    new BehaviorSubject<IPsychologistArticleMap[]>([]);

  currentArticle$ = this.currentExpandedArticleSource.asObservable();
  private _http = inject(HttpClient);

  get articles$(): Observable<IPsychologistArticleMap[]> {
    return this._articles.asObservable();
  }

  constructor() {}

  setCurrentArticle(expandedArticle: any) {
    this.currentExpandedArticleSource.next(expandedArticle);
  }

  getAllArticles() {
    return this._http
      .get<IPsychologistArticleMap[]>(
        environment.apiUrl + 'articles/all'
      )
      .pipe(
        tap((result) => {
          this._articles.next(result);
        })
      );
  }

  createArticle(article: IArticle) {
    return this._http
      .post(environment.apiUrl + 'articles/add', article)
      .pipe(switchMap(() => this.getAllArticles()));
  }

  deleteArticle(articleID: string) {
    return this._http
      .delete(
        `${environment.apiUrl}articles/remove/${articleID}`
      )
      .pipe(switchMap(() => this.getAllArticles()));
  }

  updateArticle(articleID: string, updatedArticle: any) {
    const url = `${environment.apiUrl}articles/update/${articleID}`;
    return this._http.put(url, updatedArticle);
  }
}
