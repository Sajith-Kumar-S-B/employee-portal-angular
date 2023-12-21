import { Component } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
       email:string=""
       password:string=""
       constructor(private api:AdminApiService,private router:Router,private toaster:ToasterService){

       }

       login(){
        if(this.email && this.password){
         this.api.authenticate().subscribe({
          next:(res:any)=>{
          //  console.log(res);
           const{email,password} = res
           if(email===this.email && password===this.password){
            // save admin details
            localStorage.setItem("admin_name",res.name)

            localStorage.setItem("admin_password",res.password)
            this.toaster.showSuccess('login success')
            // navigate to dashboard
            this.router.navigateByUrl("dashboard")

           }else{
         this.toaster.showError("incorrect email/password")
           }
        
          },
          error:(res:any)=>{
            console.log(res);
            
          }
        })
          
          
        }else{
          this.toaster.showWarning("please fill the form")
        }
       }
}
