import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  allSkills;
  dropdownSettings;
  registerForm;
  selectedItems = [];

  constructor(private http:HttpClient, private router:Router,
              private auth:AuthenticationService,
              private toastr:ToastrService) {}

passwordConfirming (group: FormGroup) {
  let password = group.controls['pwd'].value;
  let confirmPassword = group.controls['confirmPwd'].value;
  if (password !== confirmPassword){
   return {notSamePassword: true};
  }
  return null;
}


get select() { return this.registerForm.get('select'); }; 
get username() { return this.registerForm.get('username'); };
get password() { return this.registerForm.get('password'); };
get firstname() { return this.registerForm.get('firstname'); };
get lastname() { return this.registerForm.get('lastname'); };
get mobile() { return this.registerForm.get('mobile'); };
get email() { return this.registerForm.get('email'); };
get gender() { return this.registerForm.get('gender'); };

ngOnInit() {
  this.registerForm= new FormGroup ({
    skills: new FormControl(''),
    role: new FormControl ('user'),
    username: new FormControl ('',Validators.required),
  
    password: new FormGroup ({
      pwd: new FormControl ('',[Validators.required]),
      confirmPwd: new FormControl ('', [Validators.required])
    },this.passwordConfirming),
  
    firstname: new FormControl ('',Validators.required),
    lastname: new FormControl (''),
    mobile: new FormControl ('',[Validators.pattern("^[7-9][0-9]{9}$"), Validators.required]),
    email: new FormControl ('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.required]),
    gender: new FormControl ('Male'),
  });
  this.allSkills = [
    { item_id: 1, item_text: 'Java' },
    { item_id: 2, item_text: 'Angular' },
    { item_id: 3, item_text: 'Node Js' },
    { item_id: 4, item_text: 'Express Js' },
    { item_id: 5, item_text: 'React Js' }
  ];
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };   
}


filesToUpload: Array<File> = [];
formData: any = new FormData();
file:any;
upload() {
  // let data={id:form.id,firstname:form.fname,lastname:form.lname,avatar:this.file}
  const files: Array<File> = this.filesToUpload;
  this.formData.append("uploads[]", files[0], files[0]['name']);
}

filepath:any;
fileChangeEvent(fileInput: any) {
  console.log(fileInput.target.files[0]);
  this.filesToUpload = <Array<File>>fileInput.target.files;
  this.file =fileInput.target.files[0]['name'];
  this.upload();
  console.log(this.file);
}

onSubmit(){
let form=this.registerForm.value;
let selected=[];
for(let i=0;i<form.select;i++) {
  selected.push(form.select[i].item_text);
}

let  credentials= { role:form.role, skills: selected,
  username: form.username, password: form.password.pwd,
  firstname: form.firstname, lastname: form.lastname,
  email: form.email, mobile:form.mobile, gender: form.gender, profile:this.file,   
  };
  console.log(form);
// this.registerForm.reset();

// this.formData.append("jsondata",JSON.stringify(credentials));

//   this.auth.register(this.formData).subscribe((res) => {
//   if(res){
//   console.log(res);
//   this.toastr.success('Register Successfully');
//     this.router.navigateByUrl('/login');
//   }
// });
}
}
