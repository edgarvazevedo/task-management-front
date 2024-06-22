import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

interface Task {
  _id?: string;
  name: string;
  description: string;
  dueDate: Date;
}

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatListModule, MatIconModule, MatDialogModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task._id !== id);
        console.log('Task deleted successfully');
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '400px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result._id) {
        this.taskService.editTask(result._id, result).subscribe(
          () => {
            this.loadTasks();
            console.log('Task updated successfully');
          },
          (error) => {
            console.error('Error updating task:', error);
          }
        );
      }
    });
  }
}
