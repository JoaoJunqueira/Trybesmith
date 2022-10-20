import { Request, Response } from 'express';
// import IProduct from '../interfaces/product.interface';
import ProductService from '../services/ProductService';

export default class ProductController {
  service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  createUserController = async (req: Request, res: Response): Promise<Response> => {
    const newProduct = await this.service.validateProduct(req.body);
    return res.status(201).json(newProduct);
  };

  getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    const allProducts = await this.service.getAllProduct();
    return res.status(200).json(allProducts);
  };
}