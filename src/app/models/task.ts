export class TaskRequest {
    taskId: number = 0;
    taskName: string = '';
    description: string = '';
    frequency: string = '';
    createdDate: Date = new Date;
    startDate: string = '';
    dueDate: string = '';
    isCompleted: boolean = false
    userId: number = 0
  }

  export interface ITaskResponse {
    taskId: number
    taskName: string
    description: string
    frequency: string
    createdDate: string
    startDate: string
    dueDate: string
    isCompleted: boolean
    userId: number
  }