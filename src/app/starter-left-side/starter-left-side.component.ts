import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-starter-left-side',
  templateUrl: './starter-left-side.component.html',
  styleUrls: ['./starter-left-side.component.css']
})
export class StarterLeftSideComponent implements OnInit {

 loggedUser=JSON.parse(window.localStorage.getItem("log-details")); token;
 loggedIn:Observable<boolean>; 

 constructor(private auth:AuthenticationService){
    this.loggedIn= this.auth.loggedIn;
    this.auth.getUser();
    this.auth.data.subscribe(res=>{
      this.loggedUser = res;
    });
 }

  ngOnInit() {
  }

}
