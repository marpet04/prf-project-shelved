import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-element-add-modal',
  templateUrl: './element-add-modal.component.html',
  styleUrls: ['./element-add-modal.component.scss']
})
export class ElementAddModalComponent implements OnInit {
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ElementAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data?.form) {
      this.form = this.data.form;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
