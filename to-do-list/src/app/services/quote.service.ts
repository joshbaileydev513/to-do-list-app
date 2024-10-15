import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = 'http://api.quotable.io/random';  // Quotable API endpoint

  constructor(private http: HttpClient) {}

  getQuote(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Make the GET request to the Quotable API
  }
}
