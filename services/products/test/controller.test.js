import { jest } from "@jest/globals";
import request from "supertest";
import express, { response } from "express";
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
      .expect(response.status)
      .toBe(201);
    expect(response.body.data).toEqual(mockProduct);
  });
});
