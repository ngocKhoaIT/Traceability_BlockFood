import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadService.isloading.next(true)
    let authService = this.inject.get(AuthService)
    let jwtToken = req.clone({
      setHeaders:{
        Authorization: 'bearer ' + authService.GetToken(),
      }
    })
    return next.handle(jwtToken)
    .pipe(
      finalize(
        () => {
          this.loadService.isloading.next(false)
        }
      )
    );
  }
  constructor(private inject: Injector, public loadService: LoaderService) { }
}
