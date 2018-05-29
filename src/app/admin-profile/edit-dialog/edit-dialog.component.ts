import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, private httpClient:HttpClient,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }
 
               
	uploadForm = new FormGroup ({
    firstname:new FormControl(this.data.firstname),
    lastname: new FormControl(this.data.lastname),
    role: new FormControl (this.data.role),
    username: new FormControl (this.data.username),
    password: new FormControl (),
    mobile: new FormControl (this.data.mobile,[Validators.pattern("^[7-9][0-9]{9}$")]),
    email: new FormControl (this.data.email,[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    gender: new FormControl (this.data.gender),
  });
 
  get username() { return this.uploadForm.get('username'); };
  get password() { return this.uploadForm.get('password'); };
  get firstname() { return this.uploadForm.get('firstname'); };
  get lastname() { return this.uploadForm.get('lastname'); };
  get mobile() { return this.uploadForm.get('mobile'); };
  get email() { return this.uploadForm.get('email'); };
  get gender() { return this.uploadForm.get('gender'); };

  file:any;
  file2:any;

  filesToUpload: Array<File> = [];
  formData: any = new FormData();
  upload() {
    this.file=this.file2;
    const files: Array<File> = this.filesToUpload;
    this.formData.append("uploads[]", files[0], files[0]['name']);
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.file2 = fileInput.target.files[0]['name'];
    console.log(this.file2);
    this.upload();
  }

  onClick(){
    let form=this.uploadForm.value;
    let  credentials
    if(!form.password){
     credentials= { role:form.role,
      username: form.username,
      firstname: form.firstname, lastname: form.lastname,
      email: form.email, mobile:form.mobile, gender: form.gender, profile:this.file,   
      };
    }
    else{
       credentials= { role:form.role,
        username: form.username, password: form.password,
        firstname: form.firstname, lastname: form.lastname,
        email: form.email, mobile:form.mobile, gender: form.gender, profile:this.file,   
        };
    }
      // this.registerForm.reset();
      
    this.formData.append("jsondata",JSON.stringify(credentials));
      this.dialogRef.close(this.formData);
  }
  
  onClickClose(){
    this.dialogRef.close();
  }


}
