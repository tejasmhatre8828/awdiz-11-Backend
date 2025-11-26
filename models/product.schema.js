import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    category: { type: String, required: true, trim: true, lowercase: true },
    subCategory: { type: String, required: true, trim: true, lowercase: true },
    price: { type: Number, required: true },
    sizes: { type: String, required: true },
    brand: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
},{ timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;