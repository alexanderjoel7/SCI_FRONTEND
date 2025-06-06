import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Spinner } from "../loader/spinner";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public spinnerObservable = new BehaviorSubject<Spinner>(new Spinner());

  constructor() {}
  getSpinner(): Observable<boolean> {
    return this.spinnerObservable
      .asObservable()
      .pipe(
        map((spinner: Spinner) => spinner.show)
      );
  }
  
  show() {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
          this.spinnerObservable.next(new Spinner({ show: true }));
          resolve(true);
      }, 10);
    });
  }
  hide(debounce: number = 10) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        this.spinnerObservable.next(new Spinner({show: false}));
        resolve(true);
      }, debounce);
    });
  }
}