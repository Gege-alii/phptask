import { Component, OnInit } from '@angular/core';
import { CustomerTransactionService } from '../customer-transaction.service';
import { CustomerTransaction } from '../models/customer-transaction.model';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {
  customerTransactions: any[] = [];
  customerTotals: { name: string; totalAmount: number;}[] = [];
  filterText: string = '';
  selectedCustomer: string = '';
  chart: any;

  constructor(private customerTransactionService: CustomerTransactionService) {}

  ngOnInit(): void {
    this.customerTransactionService.getCustomerTransactions1().subscribe(
      (data: CustomerTransaction[]) => {
        if (data && Array.isArray(data)) {
          this.customerTransactions = data;
          this.calculateCustomerTotals();
        } else {
          console.error('Invalid API response structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  calculateCustomerTotals(): void {
    if (!this.customerTransactions || this.customerTransactions.length === 0) {
      console.warn('No customer transactions available to calculate totals.');
      return;
    }
    const totalsMap = new Map<string, number>();
    this.customerTransactions.forEach(transaction => {
      if (totalsMap.has(transaction.name)) {
        totalsMap.set(transaction.name, totalsMap.get(transaction.name)! + transaction.amount);
      } else {
        totalsMap.set(transaction.name, transaction.amount);
      }
    });
    this.customerTotals = Array.from(totalsMap.entries()).map(([name, totalAmount]) => ({ name, totalAmount }));
  }

  deleteTransaction(id: number): void {
    this.customerTransactionService.deleteCustomerTransaction1(id).subscribe(
      () => {
        this.customerTransactions = this.customerTransactions.filter(transaction => transaction.id !== id);
        this.calculateCustomerTotals();
      },
      (error) => {
        console.error('Error deleting transaction:', error);
      }
    );
  }

  updateChart(): void {
    if (!this.selectedCustomer) {
      console.warn('No customer selected to update chart.');
      return;
    }
  
    const filteredTransactions = this.customerTransactions.filter(transaction => transaction.name === this.selectedCustomer);
  
    const groupedByDate = filteredTransactions.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += curr.amount;
      return acc;
    }, {} as { [date: string]: number });
  
    const dates = Object.keys(groupedByDate);
    const amounts = Object.values(groupedByDate);
  
    if (this.chart) {
      this.chart.destroy(); 
    }
    const ctx = document.getElementById('canvas') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found.');
      return;
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Total Amount',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
}





 