import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {
 
  loggedUser;
  loggedIn:Observable<boolean>; 

  constructor(private auth:AuthenticationService,
              private router:Router, 
              private toastr:ToastrService){
      
    this.loggedIn=auth.loggedIn;
    this.auth.getUser();
    this.auth.data.subscribe(res=>{
      this.loggedUser = res;
    });
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }
}
