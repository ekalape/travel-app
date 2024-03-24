import { Injectable } from '@angular/core';
//import { readdir } from 'fs'

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
    "norvegia",
    "india",
    "egipt",
  ]

  constructor() {

  }
  getRandomPhoto(country: string) {
    const randomImgNum = Math.floor(Math.random() * 3) + 1;
    return ({
      name: country,
      photo: `../../../assets/images/${country}/${randomImgNum}.avif`
    })
  }
}
