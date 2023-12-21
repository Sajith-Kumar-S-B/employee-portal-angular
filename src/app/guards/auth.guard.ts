import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toastr.service';

export const authGuard: CanActivateFn = () => {
  const authStatus = inject(AuthService)
  const toaster = inject(ToasterService)
  const router = inject(Router)
  if(authStatus.isLoggedIn()){
    return true;

  }else{
    toaster.showWarning("Operation Denied !! Please Login")
    router.navigateByUrl("")
    return false;
  }
};
