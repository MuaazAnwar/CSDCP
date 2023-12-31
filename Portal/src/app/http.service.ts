import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'ngrok-skip-browser-warning',
      '69420'
    );
    return this.http.get(environment.baseURL + endpoint, { headers });
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(environment.baseURL + endpoint, data);
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(environment.baseURL + endpoint, data);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(environment.baseURL + endpoint);
  }
}
