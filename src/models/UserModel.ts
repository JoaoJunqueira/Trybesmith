import { RowDataPacket, Pool } from 'mysql2/promise';
import { IUser } from '../interfaces/login.interface';
import connection from './connection';

export default class UserModel {
  connection: Pool;
    
  constructor() {
    this.connection = connection;
  }
  
  async getUserByUsernameAndPassword(username: string, password: string) {
    const [[user]] = await this.connection.execute<(IUser & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?', [username, password]);
    console.log(user);
    return user as IUser;
  }
}