import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';

interface Task {
  name: string;
  description: string;
  dueDate: Date;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
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
      dueDate: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate
      };

      this.taskService.addTask(newTask).subscribe(
        (        response: any) => {
          console.log('Task added successfully', response);
          this.taskForm.reset();
        },
        (        error: any) => {
          console.error('There was an error adding the task!', error);
        }
      );
    }
  }
}
