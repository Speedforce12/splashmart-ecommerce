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
