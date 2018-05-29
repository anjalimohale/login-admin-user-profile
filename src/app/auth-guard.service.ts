import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    let payLoad = window.localStorage.getItem('log-details');
    if(payLoad){
    this.auth.loggedIn.next(true);
    // this.auth.userSource=JSON.parse(payLoad);
    }
    if (!this.auth.loggedIn.value) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
