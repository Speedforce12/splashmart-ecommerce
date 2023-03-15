import { baseURL } from "./axios";

export const createAddress = async (id, data) => {
  try {
    const address = await baseURL.post(`/auth/user/${id}/address`, data);
    return address.data;
  } catch (error) {
    return error.message;
  }
};

export const getAddress = async (id) => {
  try {
    const address = await baseURL.get(`/address/${id}`);
    return address.data;
  } catch (error) {
    return error.message;
  }
};

export const updateShip = async (id, data) => {
  try {
    const updated = await baseURL.patch(`/address/update/${id}`, data);
    return updated.data;
  } catch (error) {
    return error, response.data;
  }
};

export const deleteShip = async (id) => {
  try {
    const deleted = await baseURL.delete(`/address/${id}`);
    return deleted.data;
  } catch (error) {
    return error.response.data;
  }
};
