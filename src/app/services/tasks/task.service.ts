import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITaskResponse, TaskRequest } from '../../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API_URL = 'https://api.freeprojectapi.com/api/GoalTracker/';

  constructor(private http: HttpClient) { }

  createTask(taskObj: TaskRequest): Observable<ITaskResponse> {
    return this.http.post<ITaskResponse>(this.API_URL + 'createTask', taskObj);
  }

  getAllTasksByUser(userId: number){
    return this.http.get<ITaskResponse[]>(this.API_URL + 'getAllTasks?userId=' + userId);
  }
}
