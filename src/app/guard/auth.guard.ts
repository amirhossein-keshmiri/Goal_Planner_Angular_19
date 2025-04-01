import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserLocalStorageService } from '../services/user-local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userLocalStorageService = inject(UserLocalStorageService);
  const currentUser = userLocalStorageService.getCurrentUser();
  if(currentUser){
    return true;
  } else {
    router.navigateByUrl('home');
    return false;
  }
};
