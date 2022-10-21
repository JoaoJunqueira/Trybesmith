import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/login.interface';
import UserModel from '../models/UserModel';

export default class LoginService {
  constructor(readonly model = new UserModel()) {}

  public async login(username: string, password: string) {
    const user = await this.model.getUserByUsernameAndPassword(username, password);
    if (user === undefined) return 'Username or password invalid';
    const token = this.generateToken(user);
    return token as string;
  }

  private generateToken = (user: IUser): string => {
    // console.log(typeof user.id);
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, 'senha');
    return token;
  };
}