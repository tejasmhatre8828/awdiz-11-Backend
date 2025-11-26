import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    products: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    price: { type: Number},
}, { timestamps: true });

const Order = mongoose.model("orders", OrderSchema);

export default Order;