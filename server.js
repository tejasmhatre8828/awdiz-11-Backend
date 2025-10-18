import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());

var users = [];

app.get("/", (req, res) => {
  res.send(`Hello world I am ${process.env.MY_NAME}. `);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.send("Please enter email")
  }
  if (!password) {
    return res.send("Please fill password")
  }
  console.log(email, "email");
  res.send(email, password);
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send("All fields are required.")
  }
  const userExist = users.find(user => user.email === email);
  if (userExist) {
    return res.status(401).send("User already exists with this email")
  }
  const newUser = { ...req.body };
  users.push(newUser);
  return res.send("User register successfully", users = newUser);
});

let userData = [
  { id: 1, name: "Ram", age: 20 },
  { id: 2, name: "Virat", age: 32 },
  { id: 3, name: "Rohit", age: 27 },
]

app.put("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  if(!userId){
    return res.status(400).json({error: "Enter a valid userId"})
  }

  const user = userData.find((singleuser) => singleuser.id=== userId);
  res.send(true);
})
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000")
});