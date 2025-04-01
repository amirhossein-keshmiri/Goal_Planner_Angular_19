import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GoalListComponent } from './pages/goal-list/goal-list.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { NewGoalComponent } from './pages/new-goal/new-goal.component';
import { AuthenticatedLayoutComponent } from './layout/authenticated-layout.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthenticatedLayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'dashboard',
                canActivate: [authGuard],
                component: DashboardComponent
            },
            {
                path:'goals',
                canActivate: [authGuard],
                component: GoalListComponent
            },
            {
                path: 'tasks',
                canActivate: [authGuard],
                component: TaskListComponent
            },
            {
                path:'reminders',
                canActivate: [authGuard],
                component: RemindersComponent
            },
            {
                path: 'new-goal',
                canActivate: [authGuard],
                component: NewGoalComponent
            }
        ]
    },
];
