import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any = {};

  constructor() {}

  // Methods to manipulate and retrieve data

  addData(key: any, data: any): void {
    this.data[key] = data;
  }

  getData(key: any): any {
    return this.data[key];
  }

  removeData(key: any): void {
    delete this.data[key];
  }

  resetData() {
    this.data = {};
  }
}
