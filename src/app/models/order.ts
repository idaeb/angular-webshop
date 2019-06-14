export class Order {
  id: number;
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  status: number;
  orderRows: OrderRow[];
  totalPrice: number;

  constructor(companyId: number,
              created: string,
              createdBy: string,
              paymentMethod: string,
              status: number,
              orderRows: OrderRow[],
              totalPrice: number) {
    this.companyId = companyId;
    this.created = created;
    this.createdBy = createdBy;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.orderRows = orderRows;
    this.totalPrice = totalPrice;
  }
}

export class OrderRow {
  amount: number;
  productId: number;

  constructor(amount: number, productId: number) {
    this.amount = amount;
    this.productId = productId;
  }
}
