import Cart from "../models/cart.schema.js";
import Product from "../models/product.schema.js";

export const AddCart = async (req, res) => {
    try {
        console.log("---- Add to Cart Request ----");
        console.log("req.user:", req.user); // check if user info exists

        const userId = req.user?.id; // make sure this matches your JWT payload
        const { productId } = req.body;

        //  Validate userId and productId
        if (!userId) {
            console.log("❌ User ID missing. Token not sent or invalid.");
            return res
                .status(401)
                .json({ success: false, message: "User not logged in" });
        }

        if (!productId) {
            console.log("❌ Product ID missing in request body.");
            return res
                .status(400)
                .json({ success: false, message: "Product ID is required" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.log("❌ Product not found:", productId);
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }

        // Check if user already has a cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            console.log("Creating new cart for user:", userId);
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }],
            });
        } else {
            // Check if product already in cart
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
                console.log("Incremented quantity for product:", productId);
            } else {
                cart.items.push({ productId, quantity: 1 });
                console.log("Added new product to cart:", productId);
            }
        }

        await cart.save();

        console.log("✅ Cart saved successfully");
        res.status(200).json({
            success: true,
            message: "Product added to cart successfully!",
            cart,
        });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while adding to cart.",
            error: error.message,
        });
    }
};

// export const AddCart = async (req, res) => {
//     try {
//         const { productId } = req.body;
//         const userId = req.userId;

//         const isProductExists = await Product.findById(productId);
//         if (!isProductExists) {
//             return res.json({ success: false, message: "Product not found" })
//         }

//         let cart = await Cart.findOne({ user: userId })
//         if (!cart) {
//             cart = new Cart({ user: userId, products: [productId] })
//         } else {
//             if (!Array.isArray(cart.products)) cart.products = [];

//             const existedProductInCart = cart.products.some(p => p.equals(productId))
//             if (existedProductInCart) {
//                 return res.json({ success: false, message: "Product already in cart." })
//             }
//             cart.products.push(productId)
//         }
//         await cart.save()
//         return res.json({ success: true, message: "Product added to cart" })

//     } catch (error) {
//         console.log("this is ", error)
//         return res.json({ success: false, message: "error in add to cart" })
//     }
// }

export const getCartProducts = async (req, res) => {
    // try {
    //     const userId = req.user?.id;

    //     const cart = await Cart.findOne({ userId }).populate({
    //         path: "items.productId",
    //         select: "title price category brand imageUrl description createdAt",
    //     });

    //     if (!cart ) {
    //         return res.status(200).json({
    //             success: true,
    //             message: "Your cart is empty.",
    //             cart: { items: [] },
    //         });
    //     }

    //     // Remove deleted products
    //     const validItems = cart.items.filter((item) => item.productId !== null);

    //     return res.status(200).json({
    //         success: true,
    //         message: "Cart fetched successfully.",
    //         cart: { items: validItems },
    //     });
    // } catch (err) {
    //     console.error("Get Cart Error:", err.message);
    //     res.status(500).json({
    //         success: false,
    //         message: "Server error fetching cart.",
    //         error: err.message,
    //     });
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
    try {
        const userId = req.user?.id;
        const { productId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "title price category brand imageUrl description createdAt",
        });

        res.status(200).json({
            success: true,
            message: "Product removed from cart.",
            cart,
        });
    } catch (err) {
        console.error("Remove from Cart Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error removing from cart.",
            error: err.message,
        });
    }
};