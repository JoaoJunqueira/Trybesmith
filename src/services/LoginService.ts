import jwt from 'jsonwebtoken';
import { IUser, IRegistration } from '../interfaces/login.interface';
import UserModel from '../models/UserModel';
import IMessage from '../interfaces/message.interface';

export default class LoginService {
  noMistake: IMessage;

  constructor(readonly model = new UserModel()) {
    this.noMistake = { status: 201, message: 'There is no problem' };
  }

  public async login(username: string, password: string) {
    const user = await this.model.getUserByUsernameAndPassword(username, password);
    if (user === undefined) return 'Username or password invalid';
    const token = this.generateToken(user);
    return token as string;
  }

  usernameValidations = (user: IRegistration): IMessage => {
    const { username } = user;
    if (!username) return { status: 400, message: '"username" is required' };
    if (typeof username !== 'string') {
      return { status: 422, message: '"username" must be a string' };
    }
    if (username.length < 3) {
      return { status: 422, message: '"username" length must be at least 3 characters long' };
    }
    return this.noMistake;
  };

  classeValidations = (user: IRegistration): IMessage => {
    const { classe } = user;
    if (!classe) return { status: 400, message: '"classe" is required' };
    if (typeof classe !== 'string') {
      return { status: 422, message: '"classe" must be a string' };
    }
    if (classe.length < 3) {
      return { status: 422, message: '"classe" length must be at least 3 characters long' };
    }
    return this.noMistake;
  };

  levelValidations = (user: IRegistration): IMessage => {
    const { level } = user;
    if (level === undefined) return { status: 400, message: '"level" is required' };
    if (typeof level !== 'number') {
      return { status: 422, message: '"level" must be a number' };
    }
    if (Number(level) < 1) {
      return { status: 422, message: '"level" must be greater than or equal to 1' };
    }
    return this.noMistake;
  };

  passwordValidations = (user: IRegistration): IMessage => {
    const { password } = user;
    if (!password) return { status: 400, message: '"password" is required' };
    if (typeof password !== 'string') {
      return { status: 422, message: '"password" must be a string' };
    }
    if (password.length < 8) {
      return { status: 422, message: '"password" length must be at least 8 characters long' };
    }
    return this.noMistake;
  };

  public async registration(user: IRegistration) {
    const usernameValidation = this.usernameValidations(user);
    const classeValidation = this.classeValidations(user);
    const levelValidation = this.levelValidations(user);
    const passwordValidation = this.passwordValidations(user);
    if (usernameValidation !== this.noMistake) return usernameValidation;
    if (classeValidation !== this.noMistake) return classeValidation;
    if (levelValidation !== this.noMistake) return levelValidation;
    if (passwordValidation !== this.noMistake) return passwordValidation;
    const newUser = await this.model.createUser(user);
    const token = this.generateToken(newUser);
    const registrationResponse = { status: 201, message: token };
    return registrationResponse as IMessage;
  }

  private generateToken = (user: IUser): string => {
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, 'senha');
    return token;
  };
}