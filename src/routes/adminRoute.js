import express from 'express';
import { deleteUser, getAllUsers, getDashboardStats, getUserById, updateUserRole } from '../controllers/adminController';


const adminRoute = express();

adminRoute.get("/dashboard",getDashboardStats);
adminRoute.get("/users/:userId", getUserById);
adminRoute.get("/users", getAllUsers);
adminRoute.put("/users/:userId/userRole", updateUserRole);
adminRoute.delete("/users/:userId", deleteUser);

export default adminRoute;