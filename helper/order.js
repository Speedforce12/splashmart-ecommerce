import { baseURL } from "./axios";

export const getOrders = async () => {
  try {
    const response = await baseURL.get("/orders");
    const orders = response.data;
    return orders;
  } catch (error) {
    return error;
  }
};

export const createOrder = async (data) => {
  try {
    const response = await baseURL.post("/orders", data);
    const order = response.data;
    return order;
  } catch (error) {
    return error;
  }
};

export const getOrder = async (id) => {
  try {
    const response = await baseURL.get(`/orders/${id}`);
    const orders = response.data;
    return orders;
  } catch (error) {
    return error;
  }
};
