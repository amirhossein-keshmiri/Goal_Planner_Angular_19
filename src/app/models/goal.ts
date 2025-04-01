export class Goal {
    goalId: number = 0;
    goalName: string = '';
    description: string = '';
    startDate: string = '';
    endDate: string = '';
    isAchieved: boolean = false;
    userId: number = 0;
    milestones: Milestone[] = [];
  }
  
  export class Milestone {
    milestoneId: number = 0;
    milestoneName: string = '';
    description: string = '';
    targetDate: string = '';
    isCompleted: boolean = false;
  }