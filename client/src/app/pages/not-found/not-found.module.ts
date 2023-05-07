import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundPageRoutingModule } from './not-found-routing.module';

import { NotFoundPage } from './not-found.page';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    NotFoundPageRoutingModule,
    MatCardModule
  ],
  declarations: [NotFoundPage]
})
export class NotFoundPageModule { }
