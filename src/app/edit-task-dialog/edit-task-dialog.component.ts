import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

interface Task {
  _id?: string;
  name: string;
  description: string;
  dueDate: Date;
}

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  templateUrl: './edit-task-dialog.component.html',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class EditTaskDialogComponent {
  editTaskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private fb: FormBuilder
  ) {
    this.editTaskForm = this.fb.group({
      _id: [data.task._id],
      name: [data.task.name, Validators.required],
      description: [data.task.description],
      dueDate: [data.task.dueDate, Validators.required]
    });
  }

  onSave(): void {
    if (this.editTaskForm.valid) {
      this.dialogRef.close(this.editTaskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
