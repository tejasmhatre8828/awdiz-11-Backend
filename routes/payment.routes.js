import { Router } from "express";

const paymentRouter = Router();

paymentRouter.post("/payment-success", (req, res) => {
    res.send("Payment route")
});

export default paymentRouter;