import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { TasksComponent } from './tasks/tasks.component'; 

export const routes: Routes = [
  { path: '', component: MyTasksComponent },
  { path: 'my-tasks', component: MyTasksComponent },
 // { path: 'tasks', component: TasksComponent }
];
