import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn; loggedUser; token;
  url;

  constructor(private auth: AuthenticationService, public dialog: MatDialog,
    private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute) {
    this.auth.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    if (this.loggedIn) {
      this.auth.getUser();
      this.auth.data.subscribe(res=>{
        this.loggedUser = res;
      })
    }
  }
  ngOnInit() {

    // this._route.params.forEach(params => {
    //         let userId = params["userId"];
    //         //call your function, like getUserInfo()
    // })


  }


  profileDetails() {
    this.router.navigate(['/profile-details']);
  }

  public logout(): void {
    this.token = '';
    this.auth.loggedIn.next(false);
    // this.auth.userSource = null;
    window.localStorage.removeItem('log-token');
    window.localStorage.removeItem('log-details');
    this.router.navigateByUrl('/');
    this.toastr.success('Logout Successfully');
  }
}