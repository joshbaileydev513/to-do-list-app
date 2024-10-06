import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = localStorage.getItem('authToken');  // Check if there's an auth token
    if (authToken) {
      return true;  // Allow access to the route
    } else {
      this.router.navigate(['/login']);  // Redirect to the login page if not authenticated
      return false;
    }
  }
}
