import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ITaskResponse, TaskRequest } from '../../models/task';
import { UserLocalStorageService } from '../../services/user-local-storage/user-local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/tasks/task.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, AsyncPipe, DatePipe, NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  taskService = inject(TaskService);
  toastr = inject(ToastrService);
  userLocalStorageService = inject(UserLocalStorageService);

  newTask: TaskRequest = new TaskRequest();
  taskList$: Observable<ITaskResponse[]> = new Observable<ITaskResponse[]>();
  @ViewChild('taskModal') taskModal!: ElementRef;

  constructor() {
    if (this.currentUser?.userId) {
      this.newTask.userId = this.currentUser?.userId;
      this.taskList$ = this.taskService.getAllTasksByUser(this.newTask.userId)
    }
  }

  openTaskModal() {
    if (this.taskModal) {
      this.taskModal.nativeElement.style.display = 'block';
    }
  }

  closeTaskModal() {
    if (this.taskModal) {
      this.taskModal.nativeElement.style.display = 'none';
      this.newTask = new TaskRequest();
    }
  }

  get currentUser() {
    return this.userLocalStorageService.getCurrentUser();
  }

  onSaveTask() {
    this.taskService.createTask(this.newTask).subscribe({
      next: (res: ITaskResponse) => {
        this.toastr.success('Task Create Successful');
        this.closeTaskModal();
        this.newTask = new TaskRequest();
        if (this.currentUser?.userId) {
          this.newTask.userId = this.currentUser?.userId;
          this.taskList$ = this.taskService.getAllTasksByUser(this.newTask.userId)
        }
      },
      error: (err) => {
        this.toastr.error('An error occurred while saving the task');
      },
    });
  }
}
