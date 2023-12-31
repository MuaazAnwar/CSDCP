import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RuntimeConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {

  constructor(private http: HttpClient, private RuntimeConfig: RuntimeConfigService) {}

  get(endpoint: string): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '69420');
    return this.http.get(this.RuntimeConfig.baseURL + endpoint, { headers });
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(this.RuntimeConfig.baseURL + endpoint, data);
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(this.RuntimeConfig.baseURL + endpoint, data);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(this.RuntimeConfig.baseURL + endpoint);
  }
}
