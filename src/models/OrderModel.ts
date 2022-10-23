import { RowDataPacket, Pool } from 'mysql2/promise';
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
}