import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onRegister() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');  // Get existing users
    const userExists = users.find((u: any) => u.username === this.username);  // Check if user already exists

    if (userExists) {
      this.errorMessage = 'User already exists';  // Show error if the user exists
    } else {
      users.push({ username: this.username, password: this.password });  // Add new user
      localStorage.setItem('users', JSON.stringify(users));  // Save users to localStorage
      this.router.navigate(['/login']);  // Redirect to login after registration
    }
  }
}
