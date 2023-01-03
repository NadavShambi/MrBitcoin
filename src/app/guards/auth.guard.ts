import { Injectable } from '@angular/core';
import { of, from } from 'rxjs';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const auth = this.authService.checkLoggedIn();
    if (!auth) {
      this.router.navigateByUrl('/login');
    }
    
    return auth;
  }
}
