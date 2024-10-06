import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';  // Import RouterModule
import { AppRoutingModule } from './app-routing.module';  // Import AppRoutingModule

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';  // Import the new TodoComponent
import { LoginComponent } from './components/login/login.component';  // Import the LoginComponent

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,   // Declare TodoComponent
    LoginComponent   // Declare LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    FormsModule,
    AppRoutingModule,  // Import the AppRoutingModule
    RouterModule       // Ensure RouterModule is included
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
