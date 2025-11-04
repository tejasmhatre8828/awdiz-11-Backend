import express from 'express';
import dotenv from 'dotenv';
import MainRouter from './routes/index.js';
import mongoose from 'mongoose';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { tokenDecoder } from './middlewares/tokenMiddleware.js';

const app = express();
dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

var users = [];

app.get("/", (req, res) => {
  res.send("Server is running now");
});

app.use('/api/v1', tokenDecoder, MainRouter)

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Tejas, your DB connected!"))

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000")
});