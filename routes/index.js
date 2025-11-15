import { Router } from "express";
import authRouter from "./auth.route.js";
import productRouter from "./product.route.js";
import paymentRouter from "./payment.routes.js";
import { isRoleSeller } from "../middlewares/isRoleSeller.js";
import sellerRouter from "./seller.routes.js";
import userRouter from "./user.routes.js";
import CartRouter from "./cart.route.js";



const MainRouter = Router();

MainRouter.use('/auth', authRouter);

MainRouter.use("/seller", isRoleSeller, sellerRouter);

MainRouter.use("/products", productRouter);

MainRouter.use("/users", userRouter)

MainRouter.use("/carts", CartRouter)


MainRouter.use("/payment", paymentRouter)

export default MainRouter;