import { HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ErrorHandlingService } from '../services/error-handling.service';

const baseUrl = environment.US_API_BASE_URL

export const unsplInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('inside interceptor baseUrl :>> ', baseUrl);

  const url = req.url;
  console.log('url :>> ', url);
  let modifiedReq = req
  const errorService = inject(ErrorHandlingService)

  if (baseUrl && url.includes(baseUrl)) {
    modifiedReq = req.clone({
      headers: new HttpHeaders({
        Authorization: `Client-ID ${environment.US_API_KEY}`
      }),
      url: url.includes('random') ? req.url + '?orientation=landscape&count=1&query=city' : req.url
    })
  }

  //return next(modifiedReq);
  return next(modifiedReq).pipe(
    map((event) => {
      console.log("Interceptor event --> ", event);
      if (event.type === HttpEventType.Response && event.status >= 200 && event.status < 300) {
        errorService.clearError();
        console.log("event.status = ", event.status);
        const resp = event.body as any;
        if (url.includes("unsplash") && url.includes("random")) {

          return event.clone({
            body: resp[0].urls.full
          })
        }

      }
      else {
        if (event instanceof HttpResponse) {
          errorService.setError({ name: "Http error " + event.status, message: event.statusText });
          console.log("error inside interceptor");
        }
        else {
          errorService.setError({ name: "Http error ", message: "Unknown Error" });
        }
      }
      return event
    }
    ))
};
