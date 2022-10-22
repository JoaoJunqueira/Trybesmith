import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    if (!username) return res.status(400).json({ message: '"username" is required' });
    if (!password) return res.status(400).json({ message: '"password" is required' });
    const token = await this.service.login(username, password);
    if (token === 'Username or password invalid') {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    return res.status(200).json({ token });
  };

  registration = async (req: Request, res: Response): Promise<Response> => {
    const token = this.service.registration(req.body);
    return res.status(201).json({ token }); 
  };
}