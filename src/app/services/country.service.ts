import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, Observable, catchError, concatMap, map, of, tap } from 'rxjs';
import { CountryInfoType } from '../models/country-info.model';
import { environment } from '@src/environment';

export type ErrorType = { name: string, message: string }

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  knownCountries: CountryInfoType[] = []
  error: ErrorType = { name: "", message: "" }

  baseUrl = environment.INFO_API_BASE_URL

  constructor(private readonly httpClient: HttpClient) { }

  getCountryInfo(country: string): Observable<CountryInfoType> {

    console.log(this.knownCountries);
    const existing = this.knownCountries.find((c) => c.commonName === country)
    if (existing) {
      console.log("exists already", existing.commonName);
      return of(existing)
    }

    return this.httpClient.get<CountryInfoType>(`${this.baseUrl}${country}?fullText=true`)
      .pipe(


        map((res: any) => res[0]),
        map((res: any) => ({
          commonName: res.name.common,
          offName: res.name.official,
          capital: res.capital,
          currencies: res.currencies,
          region: res.region,
          subregion: res.subregion,
          languages: res.languages,
          map: res.maps.googleMaps,
          population: res.population,
          timezone: res.timezones,
          flag: res.flags.svg,
        })),
        tap((res: CountryInfoType) => { if (!this.knownCountries.map(x => x.commonName).includes(res.commonName)) this.knownCountries.push(res) }),
        catchError((err) => {
          console.log("error inside service", err); //add error handling!!

          if (err instanceof HttpErrorResponse) {
            this.error = { message: err.error.message, name: "Http error " + err.error.status }
            console.log("inside service error", this.error);
          }

          else this.error = { name: "unknown", message: "unknown" }

          return EMPTY
        })
      )


  }


  handleError(error: any) {
    console.log("there is an error to handle: ", error.statusText);
    this.error = { name: error.name, message: error.statusText }
  }





  getCountryImages(country: string) {

  }


}
