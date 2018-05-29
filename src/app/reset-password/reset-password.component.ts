import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router,  RoutesRecognized  } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  payLoad;
  sub; id; username;
  constructor(private auth:AuthenticationService, private toastr: ToastrService,public router: Router,) { 
    // const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    this.sub= this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
       this.username = data.state.root.firstChild.queryParams.un;
       this.id = data.state.root.firstChild.queryParams.id;
       this.payLoad={username:this.username,_id:this.id};
       console.log(this.id,this.username, this.payLoad);
      }
    });
  }
    ngOnInit() {
  
      
    }

  passwordConfirming (group: FormGroup) {
    let password = group.controls['pwd'].value;
    let confirmPassword = group.controls['confirmPwd'].value;
    if (password !== confirmPassword){
    return {notSamePassword: true};
    }
    return null;
    }

  resetPassForm = new FormGroup ({
    password: new FormGroup ({
      pwd: new FormControl ('',[Validators.required]),
      confirmPwd: new FormControl ('', [Validators.required])
      },this.passwordConfirming)
    });
    get password() { return this.resetPassForm.get('password'); };

    onSubmit(){
      let formData = new FormData();

      let form =this.resetPassForm.value;
      console.log(form);

      let data={ username:this.payLoad.username,
        password:form.password.pwd}
        formData.append("jsondata",JSON.stringify(data));
        this.auth.editUser(this.payLoad._id,formData)
        .subscribe( (res:any) => {
           console.log(res);
           this.toastr.success(res && res.ok ? `Password changed` : 'Success!');
           this.router.navigate(['/login']);
           window.localStorage.removeItem('log-id'); 
           window.localStorage.removeItem('log-token'); 
    });
  } 
}
