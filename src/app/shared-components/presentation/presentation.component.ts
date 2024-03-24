import { Component } from '@angular/core';
import { RandomImageService } from '../../services/random-image.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PresentationService } from '../../services/presentation.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
  providers: [RandomImageService, /* PresentationService */]
})
export class PresentationComponent {
  result: Observable<Object>;
  imgSrc = ""

  constructor(private imageService: RandomImageService, /* private presentationService: PresentationService */) {
    this.result = this.imageService.getRandomImage('random');
    // presentationService.countContent();
  }

  ngOnInit() {

    /*    this.result.subscribe((res: any) => {
         console.log(res);
         this.imgSrc = res
       }) */
    //this.imgSrc = '../../../assets/images/city1-full.jpeg'
    //this.imgSrc = '../../../assets/images/germany/1.avif'
  }

}
