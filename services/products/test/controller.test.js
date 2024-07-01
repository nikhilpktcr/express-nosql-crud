import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  removeProduct,
} from "./../service.js";

import routes from "../../../routes/index.js";

const app = express();
app.use(express.json());
app.use(routes);

jest.mock("./../service.js");

describe(`Product Controller`, () => {
  const mockProduct = {
    _id: "60d0fe4f5311236168a109ca",
    name: "Test Product",
    price: 100,
    quantity: 10,
    image: "test.jpg",
  };
  test(`POST /products`, async () => {
    addProduct.mockResolvedValue(mockProduct);
    const response = await request(app)
      .post("/products")
      .send(mockProduct)
      .expect(201);
    expect(response.body.data).toEqual(mockProduct);
  });

  test("GET /products", async () => {
    const products = [mockProduct];
    getAllProducts.mockResolvedValue(products);
    const response = await request(app)
      .get("/products")
      .send(products)
      .expect(200);

    expect(response.body.data).toEqual(products);
    expect(response.body.data[0]).toMatchObject(mockProduct);
  });
  test("GET /products/:id", async () => {
    getOneProduct.mockResolvedValue(mockProduct);
    const response = await request(app)
      .get(`/products/${mockProduct._id}`)
      .send(mockProduct)
      .expect(200);
    expect(response.body.data).toEqual(mockProduct);
  });

  test("PUT /products/:id", async () => {
    const updatedProduct = { ...mockProduct, name: "test updated" };
    updateProduct.mockResolvedValue(updatedProduct);
    const response = await request(app)
      .put(`/products/${mockProduct._id}`)
      .send({ name: "test updated" })
      .expect(200);
    expect(response.body.data.name).toBe("test updated");
  });

  test("DELETE /products/:id", async () => {
    removeProduct.mockResolvedValue(true);
    const response = await request(app)
      .delete(`/products/${mockProduct._id}`)
      .expect(200);
    expect(response.body.data).toBe(true);
  });
});
