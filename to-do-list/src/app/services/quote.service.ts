import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = '/api/image';  // Use the proxy endpoint

  constructor(private http: HttpClient) {}

  getQuoteImage(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Get the image data
  }
}
