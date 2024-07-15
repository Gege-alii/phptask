import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(CustomerTransaction: any[], filterText: string): any[] {
    if (!filterText) {
      return CustomerTransaction;
    }

    filterText = filterText.toLowerCase();

    return CustomerTransaction.filter(transaction => {
      let customerName = '';
      let transactionAmount = '';

      if (transaction.name) {
        customerName = transaction.name.toLowerCase();
      }

      if (transaction.amount) {
        transactionAmount = transaction.amount.toString().toLowerCase();
      }

      return customerName.includes(filterText) || transactionAmount.includes(filterText);
    });
  }
}