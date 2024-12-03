export interface OrderResponse {
  data: Order[];
  meta: Meta;
}

export interface Order {
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  paidAt: Date | null;
  stripeChargeId: null | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

export enum OrderStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
}
