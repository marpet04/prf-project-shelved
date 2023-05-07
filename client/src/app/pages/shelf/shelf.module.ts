import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';
import { ShelfComponent } from './shelf.component';


@NgModule({
  declarations: [ShelfComponent],
  imports: [
    CommonModule,
    ShelfRoutingModule
  ]
})
export class ShelfModule { }
