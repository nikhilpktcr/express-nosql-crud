import express from "express";
import productRoute from "./products.js";
const route = express.Router();

route.use("/products", productRoute);

export default route;
