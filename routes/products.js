import express from "express";
import {
  create,
  getAll,
  getOneById,
  update,
  remove,
} from "../services/products/controller.js";
const productRoute = express.Router();

productRoute.post("/", create);
productRoute.get("/", getAll);
productRoute.get("/:id", getOneById);
productRoute.put("/:id", update);
productRoute.delete("/:id", remove);

export default productRoute;
