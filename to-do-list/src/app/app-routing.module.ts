import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';  // Import your new TodoComponent
import { AuthGuard } from './guards/auth.guard';  // Import AuthGuard (if using)

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Login route
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuard] },  // Protect the todos route
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Default to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
