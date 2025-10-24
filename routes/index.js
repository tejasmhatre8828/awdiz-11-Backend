import { Router } from "express";
import authRouter from "./auth.route.js";
import productRouter from "./product.route.js";
import cartRouter from "./cart.routes.js";

const MainRouter = Router();

MainRouter.use('/auth', authRouter);

MainRouter.use("/products", productRouter);

MainRouter.use("/cart", cartRouter);

export default MainRouter;