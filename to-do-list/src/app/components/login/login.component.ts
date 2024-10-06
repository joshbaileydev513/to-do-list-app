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
    // Mock authentication (replace with actual logic later)
    if (this.username === 'user' && this.password === 'password') {
      localStorage.setItem('authToken', 'mockToken'); // Mock token for now
      this.router.navigate(['/todos']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
