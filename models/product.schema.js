import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;