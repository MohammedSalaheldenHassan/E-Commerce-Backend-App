import express from 'express';
import { cancelOrder, createOrder, getMyOrders, getOrderById } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';


const orderRoute = express();
orderRoute.post("/", authMiddleware, createOrder);
orderRoute.get("/my-orders", authMiddleware, getMyOrders);
orderRoute.get("/:orderId", authMiddleware, getOrderById);
orderRoute.put("/cancel/:orderId", authMiddleware, cancelOrder);




export default orderRoute;