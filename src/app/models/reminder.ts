export class ReminderRequest {
    reminderId: number = 0;
    title: string = '';
    description: string = '';
    reminderDateTime: string = '';
    isAcknowledged: boolean = false;
    userId: number = 0;
  }

  export interface IReminderResponse {
    reminderId: number
    title: string
    description: string
    reminderDateTime: string
    isAcknowledged: boolean
    userId: number
  }
  