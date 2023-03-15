import { baseURL } from "./axios";

export const createUser = async (data) => {
  try {
    const res = await baseURL.post("/auth/user", data);
    return res.data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    }
  }
};

export const getUser = async (id) => {
  try {
    const user = await baseURL.get(`/auth/user/${id}/user`);
    return user.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePassword = async (id, data) => {
  try {
    const user = await baseURL.patch(`/auth/user/${id}/password-reset`, data);
    return user.data;
  } catch (error) {
    if (error.response) {
      return error;
    }
  }
};
