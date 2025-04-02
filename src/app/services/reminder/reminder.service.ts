import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReminderResponse, ReminderRequest } from '../../models/reminder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private readonly API_URL = 'https://api.freeprojectapi.com/api/GoalTracker/';

  constructor(private http: HttpClient) { }

  createReminder(reminderObj: ReminderRequest): Observable<IReminderResponse>{
    return this.http.post<IReminderResponse>(this.API_URL + 'createReminder', reminderObj);
  }

  getRemindersByUser(userId: number){
    return this.http.get<IReminderResponse[]>(this.API_URL + 'getReminders?userId=' + userId);
  }

  //All Api that get id as their parameter wasn't work so I cannot use delete or update or get by id endpoint 
}
