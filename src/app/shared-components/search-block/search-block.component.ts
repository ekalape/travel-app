import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-block',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './search-block.component.html',
  styleUrl: './search-block.component.scss'
})
export class SearchBlockComponent {

  countries = ["germany", "france", "italy", "america", "kenya", "australia", "norway", "india", "egypt"];

  currentCountry: string = "";

  constructor(private readonly router: Router,) { }

  onSurpriseMeClick() {
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    this.router.navigate([this.countries[randomIndex]])
  }
  navigateToCountry() {

    if (this.currentCountry.trim()) {
      this.router.navigate([this.currentCountry])
    }

  }

}
