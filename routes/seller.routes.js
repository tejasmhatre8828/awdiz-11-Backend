import { Router } from "express";
import { AddProduct, getProductsForSeller, getSingleProductSeller, SoftDeleteProduct, UpdateProduct, } from "../controllers/seller.controllers.js";
import { tokenDecoder } from "../middlewares/tokenMiddleware.js";

const sellerRouter = Router();

sellerRouter.post("/add-product", AddProduct);

sellerRouter.get("/get-seller-products", getProductsForSeller);

sellerRouter.delete("/delete-product/:id", tokenDecoder, SoftDeleteProduct);

sellerRouter.put("/edit-product/:id", tokenDecoder, UpdateProduct);

sellerRouter.get("/get-seller-product/:id", tokenDecoder, getSingleProductSeller);


export default sellerRouter;