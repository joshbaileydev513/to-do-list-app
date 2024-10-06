import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === this.username && u.password === this.password);

    if (user) {
      localStorage.setItem('authToken', 'mockToken');
      this.router.navigate(['/todos']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  // Method to navigate to the registration page
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
