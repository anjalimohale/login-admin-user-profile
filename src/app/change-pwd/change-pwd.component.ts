import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
    payLoad:any; 
    correctPass:boolean=false;
    
  constructor(public dialogRef: MatDialogRef<ChangePwdComponent>,private auth:AuthenticationService,
         @Inject(MAT_DIALOG_DATA) public data: any,private http :HttpClient) { 
      console.log(this.data);
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
    
  changePassForm= new FormGroup ({
    oldpass: new FormControl ('',[Validators.required],this.OldPassCheck.bind(this)),
    password: new FormGroup ({
      pwd: new FormControl ('',[Validators.required]),
      confirmPwd: new FormControl ('', [Validators.required])
    },this.passwordConfirming)
  });
    
  get oldpass() { return this.changePassForm.get('oldpass'); };
  get password() { return this.changePassForm.get('password'); };


  OldPassCheck(control: FormControl) : Observable<ValidationErrors> {
    return Observable.timer(500).switchMap(()=>{
      return this.auth.checkPass(this.data._id,control.value)
        .map( (res:any) => {
        console.log(res.status);
        if(res.status=="match"){
          return null;
        }
       return  {match: true};
      });
    });
  }

  onClick(){
    let form=this.changePassForm.value;
    console.log(form);
      this.dialogRef.close(form.password.pwd);
  }

  onClickClose(){
    this.dialogRef.close();
  }
}
