import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Goal, IGoalResponse } from '../../models/goal';
import { GoalService } from '../../services/goal/goal.service';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLocalStorageService } from '../../services/user-local-storage/user-local-storage.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-list',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css',
})
export class GoalListComponent implements OnInit, OnDestroy {
  goalService = inject(GoalService);
  toastr = inject(ToastrService);
  userLocalStorageService = inject(UserLocalStorageService);

  // goalList= IGoalResponse[] = [];
  goalList = signal<IGoalResponse[]>([]);
  subscriptionList: Subscription[] = [];
  goalForm: FormGroup = new FormGroup({});

  constructor() {
    this.initializeForm();
    this.createNewMileStoneForm();
    this.goalForm.get('userId')?.setValue(this.currentUser?.userId);
  }

  ngOnInit(): void {
    this.getAllGoalsCreatedByMe();
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
        this.getAllGoalsCreatedByMe();
      },
      error: (err) => {
        this.toastr.error('An error occurred while saving the goal');
        // this.toastr.error(err.error.title);
      },
    });
  }
  getAllGoalsCreatedByMe() {
    if (this.currentUser?.userId) {
      const newSub = this.goalService.getAllGoalsByUser(this.currentUser.userId).subscribe({
        next: (goals: IGoalResponse[]) => {
          // this.goalList = goals
          this.goalList.set(goals);
        },
        error: (err) => {
          this.toastr.error('Error fetching goals');
        },
      });
      this.subscriptionList.push(newSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(element =>{
      element.unsubscribe();
    })
  }
}
