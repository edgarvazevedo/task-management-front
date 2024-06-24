import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';


interface Task {
  _id?: string;
  name: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  status: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatInputModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['']
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
        completed: false,
        status: 'Pending'
      };

      this.taskService.addTask(newTask).subscribe(
        response => {
          console.log('Task added successfully', response);
          this.taskForm.reset();
        },
        error => {
          console.error('There was an error adding the task!', error);
        }
      );
    }
  }
}