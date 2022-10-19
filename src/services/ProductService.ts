// import { ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/product.interface';
import ProductModel from '../models/ProductModel';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  async validateProduct(product: IProduct): Promise<IProduct> {
    const newProduct = await this.model.createProduct(product);
    return newProduct;
  }
}