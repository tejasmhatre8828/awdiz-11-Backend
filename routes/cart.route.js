
import { Router } from "express";
import {
    addToCart,
    getUserCart,
    removeFromCart,
} from "../controllers/cart.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const CartRouter = Router();

CartRouter.post("/add", verifyToken, addToCart);

CartRouter.get("/get-cart", verifyToken, getUserCart);

CartRouter.post("/remove", verifyToken, removeFromCart);

export default CartRouter;