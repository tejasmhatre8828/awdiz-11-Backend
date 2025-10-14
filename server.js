import express from 'express';
import dotenv  from 'dotenv';

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send(`Hello world I am ${process.env.MY_NAME}. `)
})

app.get("/greeting", (req, res) => {
  res.send('Hi', process.env.MY_NAME)
})

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000")
})