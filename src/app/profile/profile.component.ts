import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../breadcrumb.service';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loggedUser;url;
  bodyClasses = 'hold-transition skin-blue sidebar-collapse sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  objBreadcrumbs: MenuItem[];

  constructor(private auth: AuthenticationService,private router:Router, private breadcrumbService: BreadcrumbService) {
    this.objBreadcrumbs = [];
  
    let payLoad = window.localStorage.getItem('log-details');
    if(payLoad){
    // console.log(JSON.parse(payLoad));
    this.loggedUser=JSON.parse(payLoad)
    }
  
    this.auth.data.subscribe(res=>{
      this.loggedUser = res;
    });
  
  }

  ngOnInit() {
    // location.reload();
        // add the the body classes
        this.body.classList.add('skin-blue');
        this.body.classList.add('sidebar-mini');
        this.body.classList.add('sidebar-collapse');
        this.breadcrumbService.breadcrumbItem.subscribe((val: MenuItem[]) => {
          if (val)
              this.objBreadcrumbs = val;
      });
      this.breadcrumbService.setBreadcrumbs("movieDetail");
    
  }
  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }

}
