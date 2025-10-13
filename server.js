import express from 'express'

const app = express()

app.get("/", (req, res) => {
  res.send('hello world')
})

app.get("/greeting", (req, res) => {
  res.send('Hi, Tejas Mhatre')
})

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000")
})