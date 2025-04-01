import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register, Login, ILoginResponse } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'https://api.freeprojectapi.com/api/GoalTracker/';

  constructor(private http: HttpClient) { }

  register(userObj: Register){
    return this.http.post(this.API_URL + 'register', userObj);
  }

  login(loginObj: Login){
    return this.http.post<ILoginResponse>(this.API_URL + 'login', loginObj);
  }
}
