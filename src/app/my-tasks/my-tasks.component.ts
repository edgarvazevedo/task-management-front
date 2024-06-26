import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


interface Task {
  _id?: string;
  name: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  status: string;
}

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'dueDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>();

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.dataSource.data = tasks.sort((a, b) => a.completed ? 1 : -1); // Ordena as tarefas, colocando as completas no final
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((newTask: Task) => {
      if (newTask) {
        this.dataSource.data.push(newTask);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  deleteTask(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(id).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter((task) => task._id !== id);
            console.log('Task deleted successfully');
          },
          (error) => {
            console.error('Error deleting task:', error);
          }
        );
      }
    });
  }


  editTask(task: Task): void {
    if (task.status !== 'Pending') {
      this.dialog.open(AlertDialogComponent, {
        width: '300px',
        data: { message: 'Esta tarefa não pode ser editada, pois já se encontra iniciada' }
      });
      return;
    }

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

  markAsCompleted(id: string): void {
    this.taskService.markTaskAsCompleted(id).subscribe(
      (updatedTask) => {
        const task = this.dataSource.data.find(task => task._id === id);
        if (task) {
          task.completed = updatedTask.completed;
          task.status = updatedTask.status;
          this.dataSource.data = [...this.dataSource.data];
        }
        console.log('Task marked as completed successfully');
      },
      (error) => {
        console.error('Error marking task as completed:', error);
      }
    );
  }

  startTask(id: string): void {
    this.taskService.updateTaskStatus(id, 'In Progress').subscribe(
      (updatedTask) => {
        const task = this.dataSource.data.find(task => task._id === id);
        if (task) {
          task.status = updatedTask.status;
          this.dataSource.data = [...this.dataSource.data];
        }
        console.log('Task In Progress successfully');
      },
      (error) => {
        console.error('Error starting task:', error);
      }
    );
  }
}