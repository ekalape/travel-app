import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {
  baseUrl = environment.US_API_BASE_URL
  constructor(private httpClient: HttpClient) {
    console.log("inside service", this.baseUrl);

  }

  getRandomImage(theme: string): Observable<Object> {
    const res = this.httpClient.get(this.baseUrl + theme);


    return res;

  }

}
