import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerTransaction } from './models/customer-transaction.model';



@Injectable({
  providedIn: 'root'
})
export class CustomerTransactionService {
  private apiUrl1 = 'https://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getCustomerTransactions1(): Observable<CustomerTransaction[]> {
    return this.http.get<CustomerTransaction[]>(this.apiUrl1);
  }

  deleteCustomerTransaction1(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/${id}`);
  }
}


