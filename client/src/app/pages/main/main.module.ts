import { MainPageRoutingModule } from './main-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPage } from './main.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule, MainPageRoutingModule, MatToolbarModule, MatIconModule, MatButtonModule
  ],
  declarations: [MainPage]
})
export class MainPageModule { }
