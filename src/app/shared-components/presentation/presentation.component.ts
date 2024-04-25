import { Component, Input } from '@angular/core';
import { RandomImageService } from '@src/app/services/random-image.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PresentationService } from '../../services/presentation.service';
import { SearchBlockComponent } from '../search-block/search-block.component';
import { CanvasBoxComponent } from '../canvas-box/canvas-box.component';


@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule, SearchBlockComponent, CanvasBoxComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
  providers: [RandomImageService, PresentationService]
})
export class PresentationComponent {
  result: Observable<Object>;
  imgSrc = "";
  presentationText = "travel prowink";
  additiveText = "with"

  @Input() isCountry: boolean = false;
  @Input() countryName: string | undefined = "";
  @Input() offName: string | undefined = "";
  @Input() src = ""

  constructor(private imageService: RandomImageService, private presentationService: PresentationService) {
    this.result = this.imageService.getRandomImage('random');

  }

  ngOnInit() {
    this.imgSrc = this.isCountry ? this.src : this.presentationService.getRandomCityImage();

    console.log("imgSrc", this.imgSrc);


  }

}
