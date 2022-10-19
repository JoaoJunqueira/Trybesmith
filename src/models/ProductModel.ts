import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/product.interface';
import connection from './connection';

export default class ProductModel {
  connection: Pool;
    
  constructor() {
    this.connection = connection;
  }

  createProduct = async (product: IProduct): Promise<IProduct> => {
    const { name, amount } = product;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`INSERT INTO 
    Trybesmith.Products (name,amount) VALUES (?,?)`, [name, amount]);
    return { id: insertId, ...product };
  };
}