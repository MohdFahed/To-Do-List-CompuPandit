import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dailog',
  templateUrl: './edit-dailog.component.html',
  styleUrls: ['./edit-dailog.component.css'],
})
export class EditDailogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Data kya mila Mujhe..', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
