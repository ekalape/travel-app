import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { CountryImageResult, CountryImageRoot } from '../models/country-image.model';
import { ErrorType } from './country.service';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {
  baseUrl = environment.US_API_BASE_URL;
  constructor(private httpClient: HttpClient, private errorService: ErrorHandlingService) {
    console.log("inside service", this.baseUrl);

  }

  getRandomImage(country: string = 'random'): Observable<Object> {


    let currentUrl = this.baseUrl

    if (country === 'random')
      currentUrl += 'photos/random?orientation=landscape&count=1&query=city';
    else
      currentUrl += `search/photos?query=${country}&order_by=relevant&orientation=landscape`


    const result = this.httpClient.get(currentUrl)
      .pipe(
        tap((res) => console.log("if random, inside service ->", res)),
        map((res) => {
          if (country !== 'random') {
            const urls = (res as CountryImageRoot).results.map((x) => x.urls.regular)
            return urls
          } else return res
        }),
        catchError((e) => {
          if (e instanceof HttpErrorResponse)
            this.errorService.setError({ name: "Http error " + e.status, message: e.message })
          else this.errorService.setError({ name: 'Unknown', message: "Unknown Error" })

          return ""
        })
      )

    return result;


  }




}

