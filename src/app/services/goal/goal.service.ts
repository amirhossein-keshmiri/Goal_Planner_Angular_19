import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../../models/goal';
@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private readonly API_URL = 'https://api.freeprojectapi.com/api/GoalTracker/';

  constructor(private http: HttpClient) { }

  createGoalWithMilestones(goalObj: Goal){
    return this.http.post(this.API_URL + 'createGoalWithMilestones', goalObj);
  }
  
  // getGoals(){
  //   return this.http.get(this.API_URL + 'getGoals');
  // }
}
