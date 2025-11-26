import { Router } from "express";
import { AddCart, getCartProducts } from "../Controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/add-cart", AddCart);

userRouter.get("/get-cart", getCartProducts);


export default userRouter;