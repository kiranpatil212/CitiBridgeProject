import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: LoginService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    var isLoggedIn: boolean = sessionStorage.getItem("isLoggedIn") === "true" ? true : false;
    if (!isLoggedIn) {
      this.router.navigate(["/login"]);
    }
    return isLoggedIn;
  }

}
