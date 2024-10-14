import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Backend URL for to-dos
  private apiUrl = 'http://localhost:3000/api/todos'; 

  constructor(private http: HttpClient) { }

  // Get all to-dos from the backend
  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add a new to-do item
  addTodo(todo: any): Observable<any> {
    return this.http.post(this.apiUrl, todo);
  }

  // Update a to-do item with new data (title, description, status, dueDate, dueTime)
  updateTodo(id: number, updatedTodo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedTodo);
  }

  // Delete a to-do item
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Update the status of a to-do item (e.g., mark as 'completed')
  updateTodoStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { status });
  }

  // Filter to-dos based on status (pending, completed, all)
  filterTodos(status: string): Observable<any> {
    const filterUrl = `${this.apiUrl}?status=${status}`;
    return this.http.get(filterUrl);
  }
}
