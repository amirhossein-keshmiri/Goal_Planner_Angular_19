import { Injectable, signal } from '@angular/core';
import { ILoginResponse } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class UserLocalStorageService {
 private readonly USER_KEY = 'user';
 private currentUser = signal<ILoginResponse | null>(null);

  constructor() { 
    this.LoadUserFromLocalStorage();
  }

  private LoadUserFromLocalStorage(){
    const user = localStorage.getItem(this.USER_KEY);
    if(user){
      this.currentUser.set(JSON.parse(user));
    }
  }

  setUser(user: ILoginResponse){
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
  
  ClearUser(){
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
  }

  getCurrentUser(){
    return this.currentUser();
  }
}
