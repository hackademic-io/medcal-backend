import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/index';
import errorHandler from './middlewares/error-middleware';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use('/user', router);
app.use(errorHandler);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is running on PORT = ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
