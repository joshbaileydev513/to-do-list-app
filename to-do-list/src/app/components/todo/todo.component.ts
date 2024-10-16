import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';  // Import your service
import { QuoteService } from '../../services/quote.service';  // Import the QuoteService
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTitle: string = '';
  newDescription: string = '';
  newDueDate: string = '';   // Property for due date
  newDueTime: string = '';   // Property for due time
  editMode: boolean = false;
  currentTodoId: number | null = null;
  filterText: string = '';
  statusFilter: string = 'all';

  quoteText: string | null = null;  // Property to hold the quote text
  quoteAuthor: string | null = null;  // Property to hold the quote text

  constructor(
    private todoService: TodoService, 
    private quoteService: QuoteService,
    private router: Router, 
    private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodos();
    this.loadQuote();  // Fetch the Stoic quote on initialization
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  loadQuote() {
    this.quoteService.getQuote().subscribe(
      (data: any) => {
        this.quoteText = data.content;  // The quote text is in 'content'
        this.quoteAuthor = data.author;  // The quote author
        console.log('Quotable Quote:', this.quoteText);
      },
      (error) => {
        console.error('Error fetching quote:', error);
      }
    );
  }
  
  addTodo() {
    if (this.newTitle && this.newDescription && this.newDueDate && this.newDueTime) {
      const newTodo = {
        title: this.newTitle,
        description: this.newDescription,
        dueDate: this.newDueDate,
        dueTime: this.newDueTime,
        status: 'pending'  // Set default status to 'pending' for new todos
      };
  
      this.todoService.addTodo(newTodo).subscribe((todo) => {
        this.loadTodos();  // Refresh the list after adding a new to-do
        this.resetForm();
      });
    }
  }
  
  editTodo(todo: any) {
    console.log('Editing todo:', todo);  // Log to check the todo being edited
    this.newTitle = todo.title;
    this.newDescription = todo.description;
    this.newDueDate = todo.due_date ? todo.due_date : '';  // Set default if null
    this.newDueTime = todo.due_time ? todo.due_time : '';  // Set default if null
    this.editMode = true;
    this.currentTodoId = todo.id;
  }
  
  updateTodo() {
    if (this.currentTodoId !== null) {
      const currentTodo = this.todos.find(todo => todo.id === this.currentTodoId);
  
      if (!currentTodo) {
        console.error(`Todo with id ${this.currentTodoId} not found.`);
        return;
      }
  
      const updatedTodo = {
        title: this.newTitle,
        description: this.newDescription,
        dueDate: this.newDueDate,
        dueTime: this.newDueTime,
        status: currentTodo.status  // Keep the current status (whether 'pending', 'completed', etc.)
      };
  
      this.todoService.updateTodo(this.currentTodoId, updatedTodo)
        .subscribe(() => {
          this.loadTodos();  // Refresh the list after updating the to-do
          this.resetForm();
        }, (error) => {
          console.error('Error updating todo:', error);  // Log any errors during the update
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

  formatTime(dueTime: string): string {
    if (dueTime) {
      return dueTime.substring(0, 5); // Extract the HH:mm part from HH:mm:ss
    }
    return ''; // Return an empty string if dueTime is null or undefined
  }
  
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
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
