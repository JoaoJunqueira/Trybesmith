import express from 'express';
import ProductController from './controllers/ProductController';
import LoginController from './controllers/LoginController';

const app = express();

app.use(express.json());

const productController = new ProductController();
app.post('/products', productController.createUserController);
app.get('/products', productController.getAllProduct);

const loginController = new LoginController();
app.post('/login', loginController.login);

export default app;
