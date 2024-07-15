import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomerTransactionComponent } from './customer-transaction/customer-transaction.component';
import { CustomerTransactionService } from './customer-transaction.service';

import { SearchPipe } from './search.pipe';
import { Chart } from 'chart.js/auto';

@NgModule({
  declarations: [AppComponent, CustomerTransactionComponent, SearchPipe],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [CustomerTransactionService],
  bootstrap: [AppComponent,Chart]
})


export class AppModule {}