import { ResultSetHeader, RowDataPacket, Pool } from 'mysql2/promise';
import { IUser, IRegistration } from '../interfaces/login.interface';
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

  async createUser(user: IRegistration) {
    const { username, classe, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username,classe,level,password) VALUES (?,?,?,?)',
      [username, classe, level, password],
    );
    // console.log(newUser);
    return { id: insertId, username: user.username } as IUser;
  }
}