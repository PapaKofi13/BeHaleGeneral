import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public rt: Router, public authS: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authS.adminAuthUser !== null) {
      return true;
    }
    return this.authS.authState.pipe(take(1)).pipe(map(user => !!user)).pipe(tap(loggedIn => {
      if (!loggedIn) {
        console.log('access denied');
        this.rt.navigate(['login']);
      }
    }));
  }
}