import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  filesToUpload: Array<File> = [];
  formData: any = new FormData();
  id:string;
  fname:string;
  lname:string;
  file:any;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              private httpClient:HttpClient) { }
              
	uploadForm = new FormGroup ({
    role: new FormControl ('user'),
    username: new FormControl ('',Validators.required),
    password: new FormControl ('',Validators.required),
    firstname: new FormControl ('',Validators.required),
    lastname: new FormControl (''),
    mobile: new FormControl ('',[Validators.pattern("^[7-9][0-9]{9}$") ,Validators.required]),
    email: new FormControl ('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]),
    gender: new FormControl ('Male'),
  });
  

get username() { return this.uploadForm.get('username'); };
get password() { return this.uploadForm.get('password'); };
get firstname() { return this.uploadForm.get('firstname'); };
get lastname() { return this.uploadForm.get('lastname'); };
get mobile() { return this.uploadForm.get('mobile'); };
get email() { return this.uploadForm.get('email'); };
get gender() { return this.uploadForm.get('gender'); };


filepath:any;
fileChangeEvent(fileInput: any) {
  console.log(fileInput.target.files[0]);
  this.filesToUpload = <Array<File>>fileInput.target.files;
  this.file =fileInput.target.files[0]['name'];
  const files: Array<File> = this.filesToUpload;
  this.formData.append("uploads[]", files[0], files[0]['name']);
  console.log(this.file);
}

  onClick(){
    let form=this.uploadForm.value;
    let  credentials= { role:form.role,
      username: form.username, password: form.password,
      firstname: form.firstname, lastname: form.lastname,
      email: form.email, mobile:form.mobile, gender: form.gender, profile:this.file,   
      };
      // this.registerForm.reset();
      
      this.formData.append("jsondata",JSON.stringify(credentials));
      
   this.dialogRef.close(this.formData);
  }
  onClickClose(){
    this.dialogRef.close();
  }

}
