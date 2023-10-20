import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDailogComponent } from '../dailogBox/edit-dailog/edit-dailog.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent {
  todoForm!: FormGroup;
  renderList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private localStroge: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.createForm();
    this.getList();
    this.deleteFromDropDown();
  }

  createForm() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['To Do'],
      search: [''],
      deleteOption: [],
    });
  }

  getList() {
    let itemList = this.localStroge.getStorgeData();
    if (itemList && itemList.length) {
      this.renderList = itemList;
    }
  }
  addItem() {
    let todoItem = this.todoForm.value;
    todoItem.id = this.renderList.length + 1;
    this.renderList.push(todoItem);
    this.localStroge.saveLocalStorgeData(this.renderList);
    this.getList();
    this.resetFormInput();
  }
  resetFormInput() {
    this.todoForm.get('title')?.reset();
    this.todoForm.get('description')?.reset();
    this.todoForm.get('endDate')?.reset();
  }
  deleteItem(id: any) {
    this.renderList = this.renderList.filter((element) => {
      return element.id !== id;
    });
    this.localStroge.saveLocalStorgeData(this.renderList);
    this.todoForm.get('search')?.reset();
  }
  editItem(item: any) {
    let dialogRef = this.dialog.open(EditDailogComponent, {
      height: '400px',
      width: '600px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getList();
      this.todoForm.get('search')?.reset();
    });
  }
  deleteFromDropDown() {
    this.todoForm.get('deleteOption')?.valueChanges.subscribe((res: any) => {
      if (res && res !== null) {
        this.deleteAll(res);
      }
    });
  }

  deleteAll(status: string) {
    this.renderList = this.renderList.filter((element) => {
      return element.status !== status;
    });
    this.localStroge.saveLocalStorgeData(this.renderList);
  }
}
