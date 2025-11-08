import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    category: { type: String, required: false },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("products", ProductSchema);

export default Product;