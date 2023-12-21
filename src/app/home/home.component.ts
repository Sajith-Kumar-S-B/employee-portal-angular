import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../modules/users/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  selected: Date | null = new Date()

  showSidebar:boolean =true

  constructor(private api:UserApiService, private router:Router){

  }
  admin_name:string = ""
  employeeCount:number= 0
ngOnInit(): void {
  if(localStorage.getItem('admin_name')){
    this.admin_name = localStorage.getItem('admin_name') || ""
  }

  this.getTotalEmployeeCount()
}
  menuBtnClick(){
    this.showSidebar = !this.showSidebar

  }

  getTotalEmployeeCount(){
    this.api.getAllUserAPI().subscribe((res:any)=>{
      this.employeeCount = res.length
    })
  }

  logout(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem('admin_password')
    this.router.navigateByUrl("")
  }

  getUpdatedAdmin(event:any){
    this.admin_name = event
  }

}
