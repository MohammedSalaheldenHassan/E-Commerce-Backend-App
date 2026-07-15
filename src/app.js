import express from 'express';
import productRoute from './routes/productRoute.js';
import authRoute from "./routes/authRoute.js"
import cartRoute from './routes/cartRoute.js';
import cartRoute from './routes/cartRoute.js';
import cartRoute from './routes/cartRoute.js';
import cartRoute from './routes/cartRoute.js';
import cartRoute from './routes/cartRoute.js';
import adminRoute from './routes/adminRoute.js';
import userRoute from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import orderRoute from './routes/orderRout.js';

const app = express();

app.use(express.json());

app.use("/product", productRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute)
app.use("/order", orderRoute)
app.use("/category", categoryRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)


export default app;