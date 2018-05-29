import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-starter-footer',
  templateUrl: './starter-footer.component.html',
  styleUrls: ['./starter-footer.component.css']
})
export class StarterFooterComponent implements OnInit {

 
  loggedUser;
  loggedIn:Observable<boolean>; 
  constructor(private auth:AuthenticationService){
  
    this.loggedIn=this.auth.loggedIn; 
    this.auth.getUser();
    this.auth.data.subscribe(res=>{
      this.loggedUser = res;
    });
  }

  ngOnInit() {
  }

}
