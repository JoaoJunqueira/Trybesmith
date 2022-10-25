// import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import IMessage from '../interfaces/message.interface';
import OrderService from '../services/OrderService';
// import UserModel from '../models/UserModel';
// import IUserJwt from '../interfaces/userjwt.interface';

export default class OrderController {
  constructor(
    readonly service = new OrderService(),
    // readonly model = new UserModel(),
  ) { }

  getAllOrders = async (req: Request, res: Response): Promise<Response> => {
    const orders = await this.service.getAllOrders();
    return res.status(200).json(orders);
  };

  // orderRegistration = async (req: Request, _res: Response) => {
  orderReg = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    const token = req.headers.authorization as string;
    const registrationResponse = await this.service.orderReg(productsIds, token) as IMessage;
    if (registrationResponse.status === 201) {
      return res.status(registrationResponse.status).json(registrationResponse.message);
    }
    return res.status(registrationResponse.status).json({ message: registrationResponse.message });
  };
}