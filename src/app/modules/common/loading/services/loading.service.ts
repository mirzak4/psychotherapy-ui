import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading$: Subject<boolean> = new Subject<boolean>();

  setLoadingStatus(status: boolean) {
    this._loading$.next(status);
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  constructor() { }
}