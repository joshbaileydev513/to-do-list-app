import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos'; // Your backend URL

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addTodo(title: string, description: string): Observable<any> {
    return this.http.post(this.apiUrl, { title, description });
  }

  updateTodoStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { status });
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
