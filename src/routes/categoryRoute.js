import express from 'express';
import { createCategory, deleteCategory, getcategory, getCategoryById, updateCategory } from '../controllers/categoryController';


const categoryRoute = express();

categoryRoute.post("/", createCategory);
categoryRoute.post("/", getcategory);
categoryRoute.get("/:categoryId", getCategoryById);
categoryRoute.put("/:categoryId", updateCategory);
categoryRoute.delete("/:categoryId", deleteCategory);

export default categoryRoute;