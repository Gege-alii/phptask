export class CustomerTransaction {
    id: number;
    customerName: string;
    transactionDate: string;
    amount: number;
  
  
    
    constructor(id: number, customerName: string, transactionDate: string, amount: number) {
      this.id = id;
      this.customerName = customerName;
      this.transactionDate = transactionDate;
      this.amount = amount;
    }
  }

  export interface CustomerTransaction {
    id: number;
    customer_id: number;
    date: string;
    amount: number;
      name: string;
    
  }


