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
  disableTextbox: boolean = true;
  renderList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private localStroge: LocalStorageService,
    public dialog: MatDialog
  ) {
    // localStorage.clear();
    this.createForm();
    this.getList();
  }
  createForm() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['To Do'],
    });
  }

  getList() {
    let itemList = this.localStroge.getStorgeData();
    if (itemList && itemList.length) {
      this.renderList = itemList;
      console.log('fdsfsd');
    }
  }
  addItem() {
    let todoItem = this.todoForm.value;
    console.log('Kya');
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
  deleteItem(index: any) {
    console.log(index);
    if (index > -1) {
      this.renderList.splice(index, 1);
      this.localStroge.saveLocalStorgeData(this.renderList);
    }
  }
  editItem(index: any, record: any) {
    console.log('Edit', index, record);
    let dialogRef = this.dialog.open(EditDailogComponent, {
      height: '400px',
      width: '600px',
      data: { index: index, record: record },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getList();
    });
  }
}
