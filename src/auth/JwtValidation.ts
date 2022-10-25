import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Payload from '../interfaces/payload.interface';
import UserModel from '../models/UserModel';

export default class JwtValidation {
  constructor(
    readonly model = new UserModel(),
  ) { }

  validator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;
      if (token === undefined) return res.status(401).json({ message: 'Token not found' });
      const decoded = jwt.verify(token, 'senha') as Payload;
      const users = await this.model.getAllUsers();
      const thereIsAUser = users.find((user) => user.id === decoded.id);
      // console.log(JSON.parse(JSON.stringify(thereIsAUser)));
      if (!thereIsAUser) {
        console.log('try');
        return res.status(401).json({ message: 'Invalid token' });
      }
      next();
    } catch (error) {
      console.log('catch', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}