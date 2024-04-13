import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable, map, tap } from 'rxjs';
import { CountryImageResult, CountryImageRoot } from '../models/country-image.model';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {
  baseUrl = environment.US_API_BASE_URL
  constructor(private httpClient: HttpClient) {
    console.log("inside service", this.baseUrl);

  }

  getRandomImage(country: string = 'random'): Observable<Object> {


    let currentUrl = this.baseUrl

    if (country === 'random')
      currentUrl += 'photos/random?orientation=landscape&count=1&query=city';
    else
      currentUrl += `search/photos?query=${country}&order_by=relevant&orientation=landscape`


    console.log('this.baseUrl inside service:>> ', currentUrl);
    const result = this.httpClient.get(currentUrl)
      .pipe(
        tap((res) => console.log("if random, inside service ->", res)),
        map((res) => {
          if (country !== 'random') {
            return (res as CountryImageRoot).results[0].urls.full
          } else return res
        })
      )


    return result;

  }

}
