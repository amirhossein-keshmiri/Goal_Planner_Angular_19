import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal/goal.service';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLocalStorageService } from '../../services/user-local-storage/user-local-storage.service';

@Component({
  selector: 'app-goal-list',
  imports: [ReactiveFormsModule],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css',
})
export class GoalListComponent {
  goalService = inject(GoalService);
  toastr = inject(ToastrService);
  userLocalStorageService = inject(UserLocalStorageService);

  // goalList = signal<Goal[]>([]);

  goalForm: FormGroup = new FormGroup({});

  constructor() {
    this.initializeForm();
    this.createNewMileStoneForm();
    this.goalForm.get('userId')?.setValue(this.currentUser?.userId);
  }

  initializeForm() {
    this.goalForm = new FormGroup({
      goalId: new FormControl(0),
      goalName: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      isAchieved: new FormControl(false),
      userId: new FormControl(0),
      milestones: new FormArray([]),
    });
  }

  get milestoneList(): FormArray {
    return this.goalForm.get('milestones') as FormArray;
  }

  createNewMileStoneForm() {
    const newForm = new FormGroup({
      milestoneId: new FormControl(0),
      milestoneName: new FormControl(''),
      description: new FormControl(''),
      targetDate: new FormControl(''),
      isCompleted: new FormControl(false),
    });
    this.milestoneList.push(newForm);
  }

  removeMileStoneForm(index: number) {
    if (this.milestoneList.length > 1) {
      this.milestoneList.removeAt(index);
    } else {
      this.toastr.warning('At least one milestone is required');
    }
  }

  @ViewChild('goalModal') goalModal!: ElementRef;

  openGoalModal() {
    if (this.goalModal) {
      this.goalModal.nativeElement.style.display = 'block';
    }
  }

  closeGoalModal() {
    if (this.goalModal) {
      this.goalModal.nativeElement.style.display = 'none';
      this.initializeForm();
      this.createNewMileStoneForm();
    }
  }

  get currentUser() {
    return this.userLocalStorageService.getCurrentUser();
  }

  onSaveGoal() {
    this.goalService.createGoalWithMilestones(this.goalForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Goal Create Successful');
        this.closeGoalModal();
      },
      error: (err) => {
        // this.toastr.error('An error occurred while saving the goal');
        this.toastr.error(err.error.title);
      },
    });
  }
}
