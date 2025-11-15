import Cart from "../models/cart.schema.js";

// Add product to cart
export const addToCart = async (req, res) => {
    console.log("Request Body:", req.body);
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing user." });
    }
    if (!productId) {
        return res.status(400).json({ success: false, message: "Missing product." });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            const exists = cart.items.some(
                (item) => item.productId.toString() === productId
            );

            if (exists) {
                return res.json({ success: false, message: "Product already in cart" });
            }

            cart.items.push({ productId, quantity });
            await cart.save();
        } else {
            cart = new Cart({
                user: userId,
                items: [{ productId, quantity }],
            });
            await cart.save();
        }

        res.json({ success: true, message: "Product added to cart", cart });
    } catch (err) {
        console.error("Add to Cart Error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};


// Get user cart
export const getUserCart = async (req, res) => {

    // if (!userId) {
    //     return res.status(400).json({ success: false, message: "Missing user." });
    // }

    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "items.productId",
            model: "Product",
            select: "name price imgUrl",
        });

        if (!cart) {
            return res.json({ success: true, cart: { items: [] } });
        }

        res.json({ success: true, cart: { items: cart.items } });
    } catch (err) {
        console.error("Get Cart Error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing user." });
    }
    if (!productId) {
        return res.status(400).json({ success: false, message: "Missing product." });
    }

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "name price imgUrl",
        });

        res.status(200).json({
            success: true,
            message: "Product removed from cart.",
            cart,
        });
    } catch (err) {
        console.error("Remove from Cart Error:", err);
        res.status(500).json({
            success: false,
            message: "Server error removing from cart.",
            error: err.message,
        });
    }
};
