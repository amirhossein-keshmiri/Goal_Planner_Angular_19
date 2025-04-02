import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserLocalStorageService } from '../../services/user-local-storage/user-local-storage.service';
import { ReminderService } from '../../services/reminder/reminder.service';
import { IReminderResponse, ReminderRequest } from '../../models/reminder';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-reminders',
  imports: [FormsModule, AsyncPipe, DatePipe],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css',
})
export class RemindersComponent {
  reminderService = inject(ReminderService);
  toastr = inject(ToastrService);
  userLocalStorageService = inject(UserLocalStorageService);

  newReminder: ReminderRequest = new ReminderRequest();
  @ViewChild('reminderModal') reminderModal!: ElementRef;

  reminderList$: Observable<IReminderResponse[]> = new Observable<IReminderResponse[]>();

  constructor() {
    if (this.currentUser?.userId) {
      this.newReminder.userId = this.currentUser?.userId;
      this.reminderList$ = this.reminderService.getRemindersByUser(this.newReminder.userId)
    }
  }

  get currentUser() {
    return this.userLocalStorageService.getCurrentUser();
  }

  openReminderModal() {
    if (this.reminderModal) {
      this.reminderModal.nativeElement.style.display = 'block';
    }
  }

  closeReminderModal() {
    if (this.reminderModal) {
      this.reminderModal.nativeElement.style.display = 'none';
    }
  }

  onSaveReminder() {
    this.reminderService.createReminder(this.newReminder).subscribe({
      next: (res: ReminderRequest) => {
        this.toastr.success('Reminder Create Successful');
        this.closeReminderModal();
        this.newReminder = new ReminderRequest();
        if (this.currentUser?.userId) {
          this.newReminder.userId = this.currentUser?.userId;
          this.reminderList$ = this.reminderService.getRemindersByUser(this.newReminder.userId)
        }
      },
      error: (err) => {
        this.toastr.error('An error occurred while saving the task');
      },
    });
  }
}
