import express from 'express';
import dotenv from 'dotenv';
import MainRouter from './routes/index.js';

const app = express();
dotenv.config();
app.use(express.json());

var users = [];

app.get("/", (req, res) => {
  res.send("Server is running now");
});

app.use('/api/v1', MainRouter)

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000")
});