import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';
  request = request.clone({
    headers: request.headers.set('Value', `Bearer ${token}`),
  });
  return next(request);
};
