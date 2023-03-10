import { baseURL } from "./axios";

export const createUser = async (data) => {
  try {
    const res = await baseURL.post("/auth/user", data);
    return res.data
  } catch (err) {
    if (err.response) {
      return err.response.data;
    }
  }
};
