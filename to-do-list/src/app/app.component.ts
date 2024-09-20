import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: any[] = [];
  newTitle: string = '';
  newDescription: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo() {
    if (this.newTitle && this.newDescription) {
      this.todoService.addTodo(this.newTitle, this.newDescription).subscribe((todo) => {
        this.todos.push(todo);
        this.newTitle = '';
        this.newDescription = '';
      });
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }

  updateStatus(id: number, status: string) {
    this.todoService.updateTodoStatus(id, status).subscribe(() => {
      this.loadTodos();
    });
  }
}
