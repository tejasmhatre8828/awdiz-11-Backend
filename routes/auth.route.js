import { Router } from "express";
import { getCurrentUser, Login, Register } from "../Controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", Login);

authRouter.post("/register", Register);

authRouter.get("/get-current-user", getCurrentUser);

export default authRouter;