import express from 'express';
import { createAccount, login, logout } from '../controllers/authController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import  {  registerValidation } from '../validators/authValidators.js';
import { changePassword, deleteProfile, getProfile, updateProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const userRoute = express();

userRoute.get("/",authMiddleware,getProfile);
userRoute.put("/update-profile",authMiddleware,updateProfile);
userRoute.delete("/delete-profile",authMiddleware,deleteProfile);
userRoute.put("/change-password",authMiddleware,changePassword);

export default userRoute;