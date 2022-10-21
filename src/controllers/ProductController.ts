import { Request, Response } from 'express';
// import IProduct from '../interfaces/product.interface';
import ProductService from '../services/ProductService';

export default class ProductController {
  service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  createUserController = async (req: Request, res: Response): Promise<Response> => {
    const productResponse = await this.service.validateProduct(req.body);
    if (productResponse.status) {
      return res.status(productResponse.status).json({ message: productResponse.message });
    }
    return res.status(201).json(productResponse);
  };

  getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    const allProducts = await this.service.getAllProduct();
    return res.status(200).json(allProducts);
  };
}