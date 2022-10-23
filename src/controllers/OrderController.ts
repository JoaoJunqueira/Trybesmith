import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

export default class OrderController {
  constructor(readonly service = new OrderService()) { }

  getAllOrders = async (req: Request, res: Response): Promise<Response> => {
    const orders = await this.service.getAllOrders();
    return res.status(200).json(orders);
  };
}