import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RuntimeConfigService {
  private config = {
    production: environment.production,
    baseURL: environment.baseURL,
    useMockResponse: environment.useMockResponse,
  };

  constructor() {
    const storedConfig = localStorage.getItem('runtimeConfig');
    if (storedConfig) {
      this.config = JSON.parse(storedConfig);
    }
  }

  get baseURL(): string {
    return this.config.baseURL;
  }

  set baseURL(url: string) {
    this.config.baseURL = url;
    localStorage.setItem('runtimeConfig', JSON.stringify(this.config));
  }
  get useMockResponse(): boolean {
    return this.config.useMockResponse;
  }

  set useMockResponse(val: boolean) {
    this.config.useMockResponse = val;
    localStorage.setItem('runtimeConfig', JSON.stringify(this.config));
  }
}
