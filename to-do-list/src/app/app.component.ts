import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: any[] = [];
  newTitle: string = '';
  newDescription: string = '';
  editMode: boolean = false;
  currentTodoId: number | null = null;
  filterText: string = ''; // Property to hold the filter text

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
        this.resetForm();
      });
    }
  }

  editTodo(todo: any) {
    this.newTitle = todo.title;
    this.newDescription = todo.description;
    this.editMode = true;
    this.currentTodoId = todo.id;
  }

  updateTodo() {
    if (this.currentTodoId !== null) {
      this.todoService.updateTodo(this.currentTodoId, { title: this.newTitle, description: this.newDescription })
        .subscribe(() => {
          this.loadTodos();
          this.resetForm();
        });
    }
  }

  deleteTodo(id: number) {
    if (confirm("Are you sure you want to delete this to-do?")) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    }
  }

  // Method to filter todos based on filterText
  filteredTodos() {
    return this.todos.filter(todo => 
      todo.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  resetForm() {
    this.newTitle = '';
    this.newDescription = '';
    this.editMode = false;
    this.currentTodoId = null;
  }
}
