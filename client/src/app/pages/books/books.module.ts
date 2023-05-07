import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { BooksRoutingModule } from './books-routing.module';
import { MatCardModule } from '@angular/material/card';
import { BooksComponent } from './books.component';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class BooksModule { }
