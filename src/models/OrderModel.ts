import { RowDataPacket, Pool, ResultSetHeader } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';
import connection from './connection';

export default class OrderModel {
  connection: Pool;
    
  constructor() {
    this.connection = connection;
  }

  async getAllOrders() {
    const [orders] = await this.connection.execute<(IOrder & RowDataPacket)[]>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds
        FROM Trybesmith.Orders AS o
        INNER JOIN Trybesmith.Products AS p
        ON o.id = p.orderId
        GROUP BY p.orderId;`);
    return orders;
  }

  // async orderResgistrationOne(productsIds: number[], userId: number) {
  //   const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
  //     'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
  //     [userId],
  //   );
  //   await this.connection.execute<ResultSetHeader>(
  //     'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ? ',
  //     [insertId, productsIds[0]],
  //   );
  //   return { status: 201, 
  //     message: { 
  //       userId,
  //       productsIds,
  //     } };
  // }

  async orderResgistrationOne(productsIds: number[], userId: number) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    await Promise.all(productsIds.map(async (productId) => {
      await this.connection.execute<ResultSetHeader>(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ? ',
        [insertId, productId],
      );
    }));
    return { status: 201, 
      message: { 
        userId,
        productsIds,
      } };
  }

  // async orderResgistrationAll(productsIds: number[], userId: number) {
  //   productsIds.forEach(async (productId) => await this.connection.execute<ResultSetHeader>(
  //     'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ? ',
  //     [insertId, productId],
  //   );)
  // for (let i = 0; i < productsIds.length; i += 1) {
  //   const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
  //     'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
  //     [userId],
  //   );
  // }
  // }
}