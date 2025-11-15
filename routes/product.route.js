import { Router } from "express";
import { createProduct, getAllProducts, getFilterAllProducts, getSingleProduct } from "../Controllers/product.controllers.js";

const productRouter = Router();

productRouter.post("/create-product", createProduct);

productRouter.get("/get-products", getAllProducts);

productRouter.get("/get-products/:id", getSingleProduct);

productRouter.get("/filter-products/:category", getFilterAllProducts);


export default productRouter;