import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: "true" },
        items: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
        }],

    },
    { timestamps: true }
);

const Cart = mongoose.model("cart", CartSchema);

export default Cart;