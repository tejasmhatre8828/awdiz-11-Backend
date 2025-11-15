import { Router } from "express";
import { getCurrentUser, Login, logout, Register } from "../Controllers/auth.controllers.js";
import { getProductsForSeller } from "../controllers/seller.controllers.js";

const authRouter = Router();

authRouter.post("/login", Login);

authRouter.post("/register", Register);

authRouter.get("/get-current-user", getCurrentUser);

authRouter.get("/get-all-products", getProductsForSeller);

authRouter.get("/logout", logout); 

export default authRouter;