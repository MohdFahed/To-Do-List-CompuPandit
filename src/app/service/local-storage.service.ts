import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getStorgeData() {
    let itemList = localStorage.getItem('todoList');
    let result = JSON.parse(JSON.stringify(itemList));
    return JSON.parse(result);
  }

  saveLocalStorgeData(data: any) {
    console.log(data, typeof data);
    localStorage.setItem('todoList', JSON.stringify(data));
  }
}
