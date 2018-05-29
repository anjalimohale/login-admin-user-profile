import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject} from 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthenticationService{
    loggedIn = new BehaviorSubject<boolean>(false);
    user:any=JSON.parse(window.localStorage.getItem('log-details'));

    private userSource = new BehaviorSubject<any>('temp message');
    data = this.userSource.asObservable();

    constructor(private http:HttpClient, private router:Router,private toastr:ToastrService){

    }
// id;

    logout(): void {
    this.loggedIn.next(false);
    // this.data=null;
    window.localStorage.removeItem('log-token');
    window.localStorage.removeItem('log-details');
    window.localStorage.removeItem('log-id');
    this.router.navigateByUrl('/');
    this.toastr.success('Logout Successfully');
    }

    getUser(){
        // console.log("getuser");
        let user=JSON.parse(window.localStorage.getItem('log-details'));
        this.http.get('http://localhost:3300/users/'+user._id).subscribe(
           (resp:any)=>
           {
            //console.log(resp);
            this.userSource.next(resp);
           }
       )
    }

    setUser(user) {
      this.userSource.next(user);
      this.userSource.subscribe(log=>{
          this.user=log;
       });
    }

    login(log){
        return this.http.post('http://localhost:3300/users/login',log)
    }

    register(credentials){
        console.log(credentials);
        return this.http.post('http://localhost:3300/users/register',credentials);
    }

    getUsers(page,size,sort_field,sort_dir,tab){
        let params = new HttpParams();
        params = params.set('page', page).set('size', size).set('sort_field', sort_field).set('role',tab);
       
        if(sort_dir=='asc'){
        params = params.set('sort_dir','1' );
        }
        else if (sort_dir=='desc'){
        params = params.set('sort_dir','-1');
        }

        return this.http.get('http://localhost:3300/users',{params:params});
    }

    addUser(data){
        return this.http.post('http://localhost:3300/users/register',data);
    }

    editUser(id,data){
        return this.http.put('http://localhost:3300/users/'+id,data);
    }

    deleteUser(id){
        return this.http.delete('http://localhost:3300/users/'+id);
    }

    checkPass(id,oldpass): Observable<any>{
      let params =new HttpParams();
      params= params.set('id', id).set('oldpass', oldpass);
        return this.http.get('http://localhost:3300/users/checkPass',{params:params});
    }

    forgotPass(email){
        let params =new HttpParams();
        params= params.set('email', email);  
        return this.http.get('http://localhost:3300/users/forgotPass',{params:params});
    }
    findById(id){
        return this.http.get('http://localhost:3300/users/'+id);
    }
}