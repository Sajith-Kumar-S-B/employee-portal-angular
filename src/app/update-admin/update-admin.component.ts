import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit{


  profileImage:string = "./assets/Images/userimage.png"
editAdminStatus:boolean = false
adminDetails:any = {}
@Output() onAdminChange = new EventEmitter()

constructor(private api:AdminApiService, private toaster:ToasterService){

}
ngOnInit(): void {
  this.api.authenticate().subscribe((res:any)=>{
     this.adminDetails = res
     if(res.picture){
      this.profileImage = res.picture
     }
  })
}
  editAdminClick(){
       this.editAdminStatus = true
      //  edit admin details
  }

  getFile(event:any){
    let file = event.target.files[0]
    let fr = new FileReader()

    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      this.profileImage = event.target.result
      this.adminDetails.picture = this.profileImage
    }
  }

  updateAdmin(){
    this.api.updateAdmin(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.toaster.showSuccess("Admin Details Updated Success")

        // save admin details
        localStorage.setItem("admin_name",res.name)

        localStorage.setItem("admin_password",res.password)
        this.editAdminStatus = false
        this.onAdminChange.emit(res.name)
      },
      error:(res:any)=>{
        this.toaster.showError("Updation Failed")
      }
    })
  }

  cancel(){
    this.editAdminStatus = false
  }
}
