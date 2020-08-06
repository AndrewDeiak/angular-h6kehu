import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { MarketingDashboardComponent } from './marketing_dashboard.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";


import { MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    MatFormFieldModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatOptionModule,
    MatSelectModule],
  declarations: [ AppComponent, MarketingDashboardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

