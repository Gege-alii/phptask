import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerTransaction } from './models/customer-transaction.model';
import { environment } from './environment';


@Injectable({
  providedIn: 'root'
})
export class CustomerTransactionService {
  private apiUrl1 = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomerTransactions1(): Observable<CustomerTransaction[]> {
    return this.http.get<CustomerTransaction[]>(this.apiUrl1);
  }

  deleteCustomerTransaction1(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/${id}`);
  }
}


