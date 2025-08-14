import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';

dotenv.config(); // Move this to the top

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();

//api end point
app.use('/api/user',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRoute)

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});