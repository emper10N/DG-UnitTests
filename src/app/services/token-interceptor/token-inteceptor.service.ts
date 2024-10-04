import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { IRequest } from '../../interfaces/request.interface';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private apiService: ApiService) {}

  intercept(
    req: HttpRequest<IRequest>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let tokenizedReq = req.clone({
      setHeaders: {
        Auth: 'Bearer MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQA0c5yHV1AsEzbYy79X6XY57WfXrWR',
      },
    });
    return next.handle(tokenizedReq);
  }
}
