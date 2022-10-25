import express from 'express';
import ProductController from './controllers/ProductController';
import LoginController from './controllers/LoginController';
import OrderController from './controllers/OrderController';
import JwtValidation from './auth/JwtValidation';

const app = express();

app.use(express.json());

const productController = new ProductController();
app.post('/products', productController.createUserController);
app.get('/products', productController.getAllProduct);

const loginController = new LoginController();
app.post('/login', loginController.login);
app.post('/users', loginController.registration);

const orderController = new OrderController();
const jwtValidation = new JwtValidation();
app.get('/orders', orderController.getAllOrders);
app.post('/orders', jwtValidation.validator, orderController.orderReg);
// app.post('/orders', orderController.orderReg);

export default app;
