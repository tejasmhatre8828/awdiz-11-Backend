import { Router } from "express";
import authRouter from "./auth.route.js";
import productRouter from "./product.route.js";
import cartRouter from "./cart.routes.js";
import paymentRouter from "./payment.routes.js";
import { isRoleSeller } from "../middlewares/isRoleSeller.js";
import sellerRouter from "./seller.routes.js";

const MainRouter = Router();

MainRouter.use('/auth', authRouter);

MainRouter.use("/products", productRouter);

MainRouter.use("/seller", isRoleSeller, sellerRouter);

MainRouter.use("/cart", cartRouter);

MainRouter.use("/payment", paymentRouter)

export default MainRouter;