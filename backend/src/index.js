import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter, usersRouter } from './routers/index.js';

/* Inicializando dotenv */
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'mind-crud';
const MONGODB_USER = process.env.MONGODB_USER || 'root';
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'root';
const MONGODB_HOST = process.env.MONGODB_HOST || 'mongodb';
const MONGODB_URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?authSource=admin`
console.log(MONGODB_URI);
/* Inicializando Mongoose */
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

mongoose.connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB database.');
});

/* Inicializando express */
const app = express();

app.use('/images', express.static('uploads'));

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
// app.use(cors(corsOptions));
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Backend');
});

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on port ${PORT}`);

});
