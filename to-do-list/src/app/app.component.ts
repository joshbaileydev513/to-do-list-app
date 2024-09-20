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
  newDueDate: string = '';   // New property for due date
  newDueTime: string = '';   // New property for due time
  editMode: boolean = false;
  currentTodoId: number | null = null;
  filterText: string = '';
  statusFilter: string = 'all';

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
    if (this.newTitle && this.newDescription && this.newDueDate && this.newDueTime) {
      const newTodo = {
        title: this.newTitle,
        description: this.newDescription,
        dueDate: this.newDueDate,
        dueTime: this.newDueTime
      };

      this.todoService.addTodo(newTodo).subscribe((todo) => {
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
      const updatedTodo = {
        title: this.newTitle,
        description: this.newDescription,
        dueDate: this.newDueDate,
        dueTime: this.newDueTime
      };

      this.todoService.updateTodo(this.currentTodoId, updatedTodo)
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

  // Filter todos by both title and status
  filteredTodos() {
    return this.todos.filter(todo => 
      todo.title.toLowerCase().includes(this.filterText.toLowerCase()) &&
      (this.statusFilter === 'all' || todo.status === this.statusFilter)
    );
  }

  // Method to update the status filter when user selects from dropdown
  filterTodos(status: string) {
    this.statusFilter = status;
  }

  resetForm() {
    this.newTitle = '';
    this.newDescription = '';
    this.newDueDate = '';
    this.newDueTime = '';
    this.editMode = false;
    this.currentTodoId = null;
  }
}
