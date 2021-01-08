/* eslint-disable no-undef */
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost/amazona',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

  app.use('/api/users', userRouter);
  app.use('/api/uploads',uploadRouter)
  app.use('/api/products', productRouter);
  app.use('/api/orders', orderRouter);
  app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
  app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

app.get('/',(req,res)=>{
    res.send('Server is ready')
});
// eslint-disable-next-line no-unused-vars
app.use((err ,req, res, next)=>{
res.status(500).send({message: err.message});
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
});