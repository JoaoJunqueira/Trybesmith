import express from 'express';
import ProductController from './controllers/ProductController';
import LoginController from './controllers/LoginController';
import OrderController from './controllers/OrderController';

const app = express();

app.use(express.json());

const productController = new ProductController();
app.post('/products', productController.createUserController);
app.get('/products', productController.getAllProduct);

const loginController = new LoginController();
app.post('/login', loginController.login);
app.post('/users', loginController.registration);

const orderController = new OrderController();
app.get('/orders', orderController.getAllOrders);

export default app;
