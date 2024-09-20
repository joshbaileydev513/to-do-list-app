import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { AppComponent } from './app.component';
import { TodoService } from './todo.service';  // Import the service

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Add HttpClientModule here
    FormsModule        // Add FormsModule here
  ],
  providers: [TodoService],  // Register the service
  bootstrap: [AppComponent]
})
export class AppModule { }
