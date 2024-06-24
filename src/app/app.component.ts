import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from "./tasks/tasks.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MyTasksComponent } from "./my-tasks/my-tasks.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TasksComponent, NavbarComponent, MyTasksComponent]
})
export class AppComponent {
  title = 'task_management_front';
}
