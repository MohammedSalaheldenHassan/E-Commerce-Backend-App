import express from 'express';
import { createAccount, login, logout } from '../controllers/authController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import  {  registerValidation } from '../validators/authValidators.js';


const authRoute = express();

authRoute.post("/register" ,createAccount);

authRoute.post("/login",  login);

authRoute.post("/logout",  logout);

export default authRoute;