import { Component } from '@angular/core';
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

  constructor(private imageService: RandomImageService, private presentationService: PresentationService) {
    this.result = this.imageService.getRandomImage('random');
    // presentationService.countContent();
  }

  ngOnInit() {
    this.imgSrc = this.presentationService.getRandomCityImage();

    console.log("imgSrc", this.imgSrc);

    /*    this.result.subscribe((res: any) => {
         console.log(res);
         this.imgSrc = res
       }) */
    //this.imgSrc = '../../../assets/images/city1-full.jpeg'

  }

}
