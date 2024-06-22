import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Tasks {
  _id: string;
  name: string;
  description: string;
  dueDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.apiUrl);
  }

  addTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(this.apiUrl, task);
  }


  editTask(task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.apiUrl}/${task._id}`, task);
  }

  deleteTask(id: string): Observable<Tasks> {
    return this.http.delete<Tasks>(`${this.apiUrl}/${id}`);
  }
}
