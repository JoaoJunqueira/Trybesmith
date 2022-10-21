import { RowDataPacket, Pool } from 'mysql2/promise';
import ILogin from '../interfaces/login.interface';
import connection from './connection';

export default class UserModel {
  connection: Pool;
    
  constructor() {
    this.connection = connection;
  }
  
  async getUserByUsernameAndPassword(username: string, password: string) {
    const [[user]] = await this.connection.execute<(ILogin & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?', [username, password]);
    return user as ILogin;
  }
}