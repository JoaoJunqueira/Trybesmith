import express from 'express';
import ProductController from './controllers/ProductController';

const app = express();

app.use(express.json());

const productController = new ProductController();
app.post('/products', productController.createUserController);

export default app;
