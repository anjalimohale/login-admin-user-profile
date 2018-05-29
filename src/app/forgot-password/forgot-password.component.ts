import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import * as jwt from 'jsonwebtoken';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  token;

  private saveToken(token: string,payload: string): void {
    localStorage.setItem('log-token', token);
    localStorage.setItem('log-id', JSON.stringify(payload) );
    this.token = token;
  }

  constructor(  private auth: AuthenticationService,
                private router: Router,
                private toastr: ToastrService) { }

  ngOnInit() {
  }

  forgotForm = new FormGroup ({
    email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.required]),
  });
  
  get email() { return this.forgotForm.get('email'); };

  onSubmit(){
    let form =this.forgotForm.value;
    console.log(form);
    this.auth.forgotPass(form.email).subscribe((res:any)=>{
      this.token = res.token;
      var decoded = jwt.decode(this.token, {complete: true});
      this.saveToken(this.token,decoded.payload);
      this.toastr.success(res && res.id.email ? `Email sent to ${res.id.email}` : 'Email sent!');  
    }, 
    (errorResp) => {
      errorResp.error ? this.toastr.error(errorResp.error.errorMessage) : this.toastr.error('An unknown error has occured.');
    });
  }
}
