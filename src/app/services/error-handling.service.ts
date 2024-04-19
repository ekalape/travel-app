import { Injectable } from '@angular/core';
import { ErrorType } from './country.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {


  private errors$ = new BehaviorSubject<ErrorType | null>(null);



  constructor() { }

  getError() {
    return this.errors$.asObservable()
  }

  setError(err: ErrorType) {
    this.errors$.next(err);
  }

  clearError() {
    this.errors$.next(null)
  }

}
