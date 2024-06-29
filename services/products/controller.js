import {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  removeProduct,
} from "./service.js";

export const create = async (req, res) => {
  try {
    let body = {
      name: req.body.name,
      price: req.body.price ? req.body.price : 0,
      quantity: req.body.quantity ? req.body.quantity : 0,
      image: req.body.image ? req.body.image : "",
    };
    const product = await addProduct(body);
    return res
      .status(201)
      .json({ message: "Products created successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all products" });
  }
};

export const getOneById = async (req, res) => {
  try {
    const product = await getOneProduct(req.params.id);
    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const update = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Products updated successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await removeProduct(req.params.id);
    return res
      .status(200)
      .json({ message: "Products deleted successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
