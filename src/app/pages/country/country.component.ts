import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryInfoType } from '@src/app/models/country-info.model';
import { CountryService } from '@src/app/services/country.service';
import { RandomImageService } from '@src/app/services/random-image.service';
import { Subscription, tap } from 'rxjs';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {

  currentCountry: CountryInfoType | undefined;
  error = "";
  sub: Subscription | undefined
  sub2: Subscription | undefined
  mainImgSrc = ""

  constructor(private readonly route: ActivatedRoute,
    private readonly countryService: CountryService,
    private readonly imageService: RandomImageService
  ) {

  }

  ngOnInit() {

    const country = this.route.snapshot.paramMap.get('country');
    if (country) {
      console.log(country);
      console.log("response inside component0 ->", this.currentCountry);
      this.sub = this.countryService.getCountryInfo(country)
        .pipe(
          tap((res) => console.log("response inside tap ->", this.currentCountry))
        )
        .subscribe((res) => {
          this.currentCountry = res;
          console.log("response inside component ->", res);
          console.log("response inside component1 ->", this.currentCountry);

          this.error = this.countryService.error.message;
          console.log("error ->", this.countryService.error);

        })

      this.sub2 = this.imageService.getRandomImage(country).subscribe((res) => this.mainImgSrc = res as string)

    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
    this.sub2?.unsubscribe()
  }

}
