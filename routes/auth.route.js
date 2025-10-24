import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    res.send("login page")
})

authRouter.post("/register", (req, res) => {
    res.send("register page")
})

export default authRouter;