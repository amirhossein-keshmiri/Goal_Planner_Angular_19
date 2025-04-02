import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal, IGoalResponse } from '../../models/goal';
@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private readonly API_URL = 'https://api.freeprojectapi.com/api/GoalTracker/';

  constructor(private http: HttpClient) { }

  createGoalWithMilestones(goalObj: Goal){
    return this.http.post(this.API_URL + 'createGoalWithMilestones', goalObj);
  }
  
  getAllGoalsByUser(userId: number){
    return this.http.get<IGoalResponse[]>(this.API_URL + 'getAllGoalsByUser?userId=' + userId);
  }
}
