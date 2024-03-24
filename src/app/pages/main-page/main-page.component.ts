import { Component } from '@angular/core';
import { PresentationComponent } from '../../shared-components/presentation/presentation.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [PresentationComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
