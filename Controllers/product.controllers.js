import Product from "../models/product.schema.js";


export const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, imgUrl, price } = req.body;

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
      sellerId: req.user?._id, // optional
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const sellerId = req.user?.userId || req.user?._id;
    console.log("Seller ID:", sellerId);

    const products = await Product.find({
      sellerId, // ✅ match the field used when creating
      isDeleted: false,
    }).sort({ createdAt: -1 });

    console.log("Products found:", products.length);
    console.log("Product IDs:", products.map((p) => p._id));

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Seller Products Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching seller products.",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getFilterAllProducts = async (req, res) => {
  try {
    const category = req.params.category;

    if (category === "all") {
      const products = await Product.find({ isDeleted: false });
      return res.status(200).json({
        success: true,
        products
      });
    }

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
      isDeleted: false
    });

    return res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Category filter error:", error);
    res.status(500).json({
      success: false,
      message: "Server error filtering products"
    });
  }
};


export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "Product already deleted",
      });
    }

    product.isDeleted = true;
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product soft deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during product deletion",
    });
  }
};

export const editProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, brand, price, description } = req.body;

    // 1️⃣ Validate input
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Title and price are required fields.",
      });
    }

    // 2️⃣ Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // 3️⃣ Prevent editing deleted items
    if (product.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "Cannot edit a deleted product.",
      });
    }

    // 4️⃣ Update product fields
    product.name = name || product.name;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.description = description || product.description;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error updating product.",
    });
  }
};