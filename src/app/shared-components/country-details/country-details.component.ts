import { Component, Input } from '@angular/core';
import { CountryInfoType } from '@src/app/models/country-info.model';
import { PopulationRounderPipe } from '@src/app/pipes/population-rounder.pipe';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [PopulationRounderPipe],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent {

  @Input() country: CountryInfoType | undefined

  languages: (string | undefined)[] = [];
  currencies: (string | undefined)[] = [];


  ngOnInit() {
    if (this.country?.languages)
      this.languages = Object.keys(this.country?.languages).map((key) => this.country?.languages[key]);

    if (this.country?.currencies)
      this.currencies = Object.keys(this.country?.currencies).map((key) => this.country?.currencies[key]?.name);
  }
}
