import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-edit-dailog',
  templateUrl: './edit-dailog.component.html',
  styleUrls: ['./edit-dailog.component.css'],
})
export class EditDailogComponent implements OnInit {
  todoForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private localStroge: LocalStorageService
  ) {}
  ngOnInit() {
    this.createForm();
    this.setValue();
  }

  createForm() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [''],
    });
  }

  setValue() {
    console.log(this.data);
    this.todoForm.patchValue(this.data);
  }
  Update() {
    let updatedData = this.todoForm.value;
    let list = this.localStroge.getStorgeData();
    list.forEach((element: any) => {
      if (element.id === this.data.id) {
        element.title = updatedData.title;
        element.description = updatedData.description;
        element.endDate = updatedData.endDate;
        element.status = updatedData.status;
        this.localStroge.saveLocalStorgeData([...list]);
        this.onNoClick();
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
