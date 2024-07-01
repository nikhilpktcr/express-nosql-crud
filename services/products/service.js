import Product from "../../models/product.model.js";
export const addProduct = async (body) => {
  try {
    const product = await Product.create(body);
    return product;
  } catch (error) {
    throw new Error("Failed to add new product");
  }
};

export const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("Failed to list products");
  }
};

export const getOneProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};

export const updateProduct = async (id, body) => {
  try {
    const productDetails = await Product.findById(id);
    if (!productDetails) {
      throw new Error("product not found");
    }
    let updateData = {};
    if (body.name) {
      updateData.name = body.name;
    }

    if (body.price) {
      updateData.price = body.price;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error("Failed to update product");
  }
};

export const removeProduct = async (id) => {
  try {
    const productDetails = await Product.findById(id);
    if (!productDetails) {
      throw new Error("Product not found");
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Failed to delete product");
    }
    return true;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};
