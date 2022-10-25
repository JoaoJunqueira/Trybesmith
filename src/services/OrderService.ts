import jwt from 'jsonwebtoken';
import OrderModel from '../models/OrderModel';
import Payload from '../interfaces/payload.interface';

export default class OrderService {
  constructor(readonly model = new OrderModel()) { }
    
  async getAllOrders() {
    const orders = await this.model.getAllOrders();
    return orders;
  }

  orderReg = async (productsIds: number[], token: string) => {
    if (productsIds === undefined) return { status: 400, message: '"productsIds" is required' };
    const isArray = Array.isArray(productsIds);
    if (!isArray) return { status: 422, message: '"productsIds" must be an array' };
    if (productsIds.length === 0) {
      return { status: 422, message: '"productsIds" must include only numbers' };
    }
    const decoded = jwt.verify(token, 'senha') as Payload;
    const orderResponse = await this.model.orderResgistrationOne(productsIds, decoded.id);
    return orderResponse;
  };
}