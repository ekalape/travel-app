import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryInfoType } from '@src/app/models/country-info.model';
import { CountryService, ErrorType } from '@src/app/services/country.service';
import { ErrorHandlingService } from '@src/app/services/error-handling.service';
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
  sub: Subscription | undefined
  sub2: Subscription | undefined
  mainImgSrc = ""

  errorSub: Subscription | undefined

  error: ErrorType | null = null

  constructor(private readonly route: ActivatedRoute,
    private readonly countryService: CountryService,
    private readonly imageService: RandomImageService,
    private errorService: ErrorHandlingService
  ) {

  }

  ngOnInit() {

    this.errorSub = this.errorService.getError().subscribe((err) => {
      console.log(err);
      this.error = err
    })

    const country = this.route.snapshot.paramMap.get('country');
    if (country) {
      console.log(country);
      console.log("response inside component0 ->", this.currentCountry);
      this.sub = this.countryService.getCountryInfo(country)
        .pipe(tap((res) => console.log(res)))
        .subscribe((res) => {
          this.currentCountry = res;
          this.mainImgSrc = (res.images as string[])[0];

        })


    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
    this.sub2?.unsubscribe()
    this.errorSub?.unsubscribe()
    this.errorService.clearError()
  }

}
