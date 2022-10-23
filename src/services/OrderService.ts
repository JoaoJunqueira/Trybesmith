import OrderModel from '../models/OrderModel';

export default class OrderService {
  constructor(readonly model = new OrderModel()) { }
    
  async getAllOrders() {
    const orders = await this.model.getAllOrders();
    return orders;
  }
}