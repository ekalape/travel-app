import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HoverDirective } from './directives/hover.directive';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { unsplInterceptor } from './interceptors/unspl-interceptor.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MainPageComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',


  /*   animations: [
      trigger('changeBg', [
        state('notHovered, void', style({ background: 'linear-gradient(70deg, #7C3537 0%, #FFA229 100%)' })),
        state('hovered', style({ background: 'linear-gradient(230deg,  #7C3537 0%, #FFA229 100%)' })),
        transition(
          'notHovered <=> hovered, void => notHovered, void => hovered',
          animate('500ms')
        ),
      ]),
    ], */
})
export class AppComponent {
  title = 'Let\'s travel';
  hovered = false;

  /*   onMouseEnter() {
      this.hovered = true;
      console.log("entered");
    }
    onMouseLeave() {
      this.hovered = false;
      console.log("entered");
    } */

}
