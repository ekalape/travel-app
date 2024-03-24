import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { unsplInterceptor } from './interceptors/unspl-interceptor.interceptor';

/* export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, use: unsplInterceptor, multi: true },
] */

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimations(),
  //  importProvidersFrom(HttpClientModule),
  provideHttpClient(withInterceptors([unsplInterceptor]))]
};
