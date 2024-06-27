import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Product from "./models/product.model.js";

// load env variables
dotenv.config();
// create express server
const app = express();
const PORT = process.env.PORT || 4040;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middleware

// routes

app.post("/api/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res
      .status(201)
      .json({ message: "Product added successfully", data: product });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products" });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch product" });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const productDetails = await Product.findById(req.params.id);
    if (!productDetails) {
      throw new Error("product not found");
    }
    let updateData = {};
    if (req.body.name) {
      updateData.name = req.body.name;
    }

    if (req.body.price) {
      updateData.price = req.body.price;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    const product = await Product.findById(req.params.id);
    return res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update product" });
  }
});

app.delete("/api/product/:id", async (req, res) => {
  try {
    const productDetails = await Product.findById(req.params.id);
    if (!productDetails) {
      throw new Error("product not found");
    }
    await Product.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Product deleted successfully", data: true });
  } catch (e) {
    return res.status(500).json({ message: "Failed to delete product" });
  }
});

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(PORT, () => {
      console.log(`server connected to ${PORT}`);
    });
  })
  .catch((error) => console.log("CONNECTION FAILED", error));
