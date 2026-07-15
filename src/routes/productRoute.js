import express from 'express';
import { createProduct, getProduct, getProductByCetagory, productById } from '../controllers/productControllers.js';
import { validation } from '../middlewares/validationMiddleware.js';
import productSchema from '../validators/productValidators.js';
import { authorize } from '../middlewares/productMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const productRoute = express.Router();

productRoute.use(express.json());

productRoute.get("/", getProduct);
productRoute.post("/add",authMiddleware,authorize("admin"), createProduct);
productRoute.delete("/delete",(req,res)=>{});
productRoute.put("/update",(req,res)=>{});
productRoute.get("/category/:categoryId",getProductByCetagory);
productRoute.get("/:productId",productById);

export default productRoute;