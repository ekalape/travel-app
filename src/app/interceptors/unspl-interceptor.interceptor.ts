import { HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const baseUrl = environment.US_API_BASE_URL

export const unsplInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('inside interceptor baseUrl :>> ', baseUrl);

  const url = req.url;
  console.log('url :>> ', url);
  let modifiedReq = req
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
      if (event.type === HttpEventType.Response) {
        const resp = event.body as any;

        return event.clone({
          body: resp[0].urls.full
        })
      }
      return event
    }))
};
