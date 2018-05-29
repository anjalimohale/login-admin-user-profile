import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material';
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-starter-control-sidebar',
  templateUrl: './starter-control-sidebar.component.html',
  styleUrls: ['./starter-control-sidebar.component.css']
})
export class StarterControlSidebarComponent implements OnInit {

  
  loggedUser=JSON.parse(window.localStorage.getItem("log-details")); token;
 loggedIn:Observable<boolean>; 
  constructor(private auth:AuthenticationService,
              public dialog: MatDialog,
              private toastr:ToastrService){
  
    this.loggedIn=this.auth.loggedIn; 
    this.auth.getUser();
    this.auth.data.subscribe(res=>{
      this.loggedUser = res;
    });
  }
 
  ngOnInit() {
  }

  changePwd(){
    let formData = new FormData();
 
     console.log("ChangePwd called");
     const dialogRef = this.dialog.open(ChangePwdComponent, {width: '330px', height: '390px',data:this.loggedUser});
     dialogRef.afterClosed()
       .subscribe( selection => {
         if(selection){
         console.log(selection);
         let data={ username:this.loggedUser.username,
                    password:selection}
         formData.append("jsondata",JSON.stringify(data));
         this.auth.editUser(this.loggedUser._id,formData)
           .subscribe( (res:any) => {
             console.log(res);
             this.toastr.success(res && res.ok ? `Password changed` : 'Success!');
           });
         }
     });
   }
}
