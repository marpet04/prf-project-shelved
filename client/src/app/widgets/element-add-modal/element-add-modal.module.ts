import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementAddModalComponent } from './element-add-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ElementAddModalComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  exports: [ElementAddModalComponent],
  entryComponents: [ElementAddModalComponent]
})
export class ElementAddModalModule { }
