import { Router } from "express";

const productRouter = Router();

productRouter.post("/create-product", (req, res) => {
    res.send("create product route")
})

export default productRouter;