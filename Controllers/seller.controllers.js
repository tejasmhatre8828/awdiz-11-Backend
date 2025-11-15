import Product from "../models/product.schema.js";

export const AddProduct = async (req, res) => {
    try {
        const { name, price, category, quantity, imgUrl } = req.body;
        // validate fields
        if (!name || !category || !quantity || !imgUrl || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // if you are using seller auth
        console.log("Decoded seller ID:", req.user?._id);

        const newProduct = await Product.create({
            name,
            category,
            quantity,
            imgUrl,
            price,
            seller: req.user?._id, // optional
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct,
        });
    } catch (error) {
        console.log("error", error);
        res
            .status(500)
            .send({ message: "Error in add product for seller", success: false });
    }
};

export const getProductsForSeller = async (req, res) => {
    try {
        const userId = req.user?._id;
        const products = await Product.find({ seller: userId, isDeleted: false });
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log("error", error);
        res
            .status(500)
            .send({ message: "Error in getting products for seller", success: false });
    }
};

export const SoftDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Soft delete route hit with id:", req.params.id);

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.isDeleted = true;
        await product.save();
        return res.status(200).json({ success: true, message: "Product deleted (soft delete)" });
    } catch (error) {
        console.log("Error in soft delete:", error);
        return res.status(500).json({ success: false, message: "Error deleting product" });
    }
};

export const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, category, imgUrl } = req.body;

        const product = await Product.findById(id);
        if (!product || product.isDeleted) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update fields if they exist in the request
        if (name) product.name = name;
        if (price) product.price = price;
        if (quantity) product.quantity = quantity;
        if (category) product.category = category;
        if (imgUrl) product.imgUrl = imgUrl;

        await product.save();

        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        console.log("Update product error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};