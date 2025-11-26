import express from 'express';
import dotenv from 'dotenv';
import MainRouter from './routes/index.js';
import mongoose from 'mongoose';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { tokenDecoder } from './middlewares/tokenMiddleware.js';
import Product from './models/product.schema.js';

const app = express();
dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running now");
});

// app.use('/api/v1', MainRouter)
app.use('/api/v1', tokenDecoder, MainRouter)

// app.get("/test", async (req, res) => {
//   try {
//     // const products = await Product.find({category:{$in: ["Shoes","Jeans"]}})
//     // const products = await Product.find({ category: { $nin: ["Shoes", "Jeans"] } })

//     // const products = await Product.find({ price: { $eq: 10000 } })

//     // const products = await Product.find({ price: { $gte: 10000 } })

//     // const products = await Product.find({ price: { $ne: 10000 } })

//     // const products = await Product.find({ price: { $lt: 5000 } })

//     // const products = await Product.find({ price: { $lte: 1999 } })

//     // const products = await Product.find({
//     //   $nor: [{ price: { $gt: 20000 } }, { quantity: { $nin: [100, 20] } }]
//     // })

//     // const products = await Product.find({
//     //   $and: [{ category: "shirt" }, { price: { $gt: "1000" } }]
//     // })

//      const products = await Product.find({
//       $or: [{ category: "jeans" }, { brand: "zara" }]
//     })

//     res.send(products)
//   } catch (error) { }
// })

// app.get("/matching-grouping", async (req, res) => {
//   try {
//     const products = await Product.aggregate([
//       { $match: { price: { $gt: 1500 } } },
//       {
//         $group: {
//           _id: "shoes",
//           totalQuantity: { $sum: "$quantity" },
//           totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
//         },
//       }
//     ])
//     res.send(products);
//   } catch (error) { }
// });

app.get("/unwinding", async (req, res) => {
  try {
    const products = await Order.aggregate([
      { $unwind: "$products" },
      {
        $project: {
          user: 2,
          productId: "$products.product",
          quantity: "$products.quantity",
        }
      }
    ])
    res.send(products);
  } catch (error) { }
});

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Tejas, your DB connected!"))

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000")
});