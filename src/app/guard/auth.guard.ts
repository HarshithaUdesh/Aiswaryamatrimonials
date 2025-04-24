import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from 'src/app/services/services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: ServicesService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return new Promise((resolve, reject) => {
        const auth = localStorage.getItem("userid")
          if (auth) {
            resolve(true);
          } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            resolve(false);
          }
        });
  }
  
}
