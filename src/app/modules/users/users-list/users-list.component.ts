import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../users.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
    allUsers:UserModel[]=[]
  constructor(private api:UserApiService){}
  ngOnInit(): void {
    this.getallusers()
  }
    getallusers(){
      this.api.getAllUserAPI().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.allUsers = res
          
        },
        error:(err:any)=>{
          alert(err.message)
        }
      })
    }

    removeUser(id:any){
      this.api.deleteUserAPI(id).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert("User Deleted")
          this.getallusers()
          
        },
        error:(err:any)=>{
          alert(err.message)
        }
      })
    }
}
