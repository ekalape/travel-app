import { Injectable } from '@angular/core';

import { sample } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  countries = [
    "germany",
    "france",
    "italy",
    "usa",
    "kenya",
    "australia",
    "norway",
    "india",
    "egypt",
  ]

  cities = [1, 2, 3, 4]

  constructor() {

  }
  getRandomCountryPhoto(country: string) {
    const randomImgNum = Math.floor(Math.random() * 3) + 1;
    return ({
      name: country,
      photo: `@assets/images/${country}/${randomImgNum}.avif`
    })
  }


  getRandomOrderedCountries() {
    const reorderedCountries = this.countries.sort(() => Math.random() - 0.5)
    const result = reorderedCountries.map((country) => this.getRandomCountryPhoto(country))
    return result;
  }

  getRandomCityImage() {
    const num = sample(this.cities)
    return `../../assets/images/cities/${num}.avif`
  }
}
