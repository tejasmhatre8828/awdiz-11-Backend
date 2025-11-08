import { Router } from "express";
import { AddProduct } from "../controllers/seller.controllers.js";
import { getAllSellerProducts } from "../Controllers/product.controllers.js";

const sellerRouter = Router();

sellerRouter.post("/add-product", AddProduct);

sellerRouter.get("/products", getAllSellerProducts);

export default sellerRouter;