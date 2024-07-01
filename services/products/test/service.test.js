import {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  removeProduct,
} from "../service.js";
import Product from "../../../models/product.model.js";
jest.mock("../../../models/product.model.js");
describe("Product Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  const mockProduct = {
    _id: "60d0fe4f5311236168a109ca",
    name: "Test Product",
    price: 100,
    quantity: 10,
    image: "test.jpg",
  };

  Product.create.mockResolvedValue(mockProduct);
  test("addProduct- add new product", async () => {
    const newProduct = await addProduct(mockProduct);
    expect(newProduct).toEqual(mockProduct);
    expect(Product.create).toHaveBeenCalledTimes(1);
    expect(Product.create).toHaveBeenCalledWith(mockProduct);
  });

  Product.find.mockResolvedValue([mockProduct]);
  test("getAllProduct- add new product", async () => {
    const products = await getAllProducts([mockProduct]);
    expect(products).toEqual([mockProduct]);
    expect(Product.find).toHaveBeenCalledTimes(1);
  });

  Product.findById.mockResolvedValue(mockProduct);
  test("getAllProduct- add new product", async () => {
    const products = await getOneProduct(mockProduct._id);
    expect(products).toEqual(mockProduct);
    expect(Product.findById).toHaveBeenCalledTimes(1);
    expect(Product.findById).toHaveBeenCalledWith(mockProduct._id);
  });

  // Mock for findById and findByIdAndUpdate
  Product.findById.mockResolvedValue(mockProduct);
  Product.findByIdAndUpdate.mockResolvedValue({
    ...mockProduct,
    name: "test updated",
  });

  test("getOneProduct and updateProduct - fetch and update a product", async () => {
    // Fetch the product
    const fetchedProduct = await getOneProduct(mockProduct._id);
    expect(fetchedProduct).toEqual(mockProduct);
    expect(Product.findById).toHaveBeenCalledTimes(1);
    expect(Product.findById).toHaveBeenCalledWith(mockProduct._id);

    // Update the product
    const updateData = {
      name: "test updated",
    };
    const updatedProduct = await updateProduct(mockProduct._id, updateData);
    expect(updatedProduct.name).toEqual("test updated");
    expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProduct._id,
      updateData,
      { new: true }
    );
  });

  Product.findById.mockResolvedValue(mockProduct);
  Product.findByIdAndDelete.mockResolvedValue(true);

  test("removeProduct - should delete a product", async () => {
    const result = await removeProduct(mockProduct._id);
    expect(result).toBe(true);
    expect(Product.findById).toHaveBeenCalledTimes(1);
    expect(Product.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(mockProduct._id);
  });
});
