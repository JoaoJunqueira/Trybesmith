// import { ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/product.interface';
import IMessage from '../interfaces/message.interface';
import ProductModel from '../models/ProductModel';

export default class ProductService {
  model: ProductModel;

  noMistake: IMessage;

  constructor() {
    this.model = new ProductModel();
    this.noMistake = { status: 201, message: 'There is no problem' };
  }

  nameValidations = (product: IProduct): IMessage => {
    const { name } = product;
    if (!name) return { status: 400, message: '"name" is required' };
    if (typeof name !== 'string') return { status: 422, message: '"name" must be a string' };
    if (name.length < 3) {
      return { status: 422, message: '"name" length must be at least 3 characters long' };
    }
    return this.noMistake;
  };

  amountValidations = (product: IProduct): IMessage => {
    const { amount } = product;
    if (!amount) return { status: 400, message: '"amount" is required' };
    if (typeof amount !== 'string') return { status: 422, message: '"amount" must be a string' };
    if (amount.length < 3) {
      return { status: 422, message: '"amount" length must be at least 3 characters long' };
    }
    return this.noMistake;
  };

  async validateProduct(product: IProduct): Promise<(IProduct | IMessage)> {
    const nameValidation = this.nameValidations(product);
    const amountValidation = this.amountValidations(product);
    if (amountValidation !== this.noMistake) return amountValidation;
    if (nameValidation !== this.noMistake) return nameValidation;
    const newProduct = await this.model.createProduct(product);
    return newProduct as IMessage;
  }

  async getAllProduct(): Promise<IProduct[]> {
    const newProduct = await this.model.getAllProduct();
    return newProduct;
  }
}