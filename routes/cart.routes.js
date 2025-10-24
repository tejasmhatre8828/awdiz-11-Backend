import { Router } from "express";

const cartRouter = Router();

cartRouter.post("/add-to-cart", (req, res) => {
    res.send("add to cart route");
})

export default cartRouter;