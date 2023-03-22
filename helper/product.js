import { baseURL } from "./axios";

export const createProduct = async (data) => {
  try {
    const response = await baseURL.post("/products", data);
    const product = response.data;
    return product;
  } catch (error) {
    return error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await baseURL.get(`/product/${id}`);
    const product = response.data;
    return product;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await baseURL.delete(`/product/${id}`);
    const product = response.data;
    return product;
  } catch (error) {
    return error;
  }
};

export const getProducts = async () => {
  try {
    const response = await baseURL.get("/products");
    const products = response.data;
    return products;
  } catch (error) {
    return error;
  }
};
