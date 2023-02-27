import { baseURL } from "./axios";

export const verify = async (token) => {
  try {
    const res = await baseURL.post(`/auth/verify/${token}`);
    const user = await res.data;
    return user;
  } catch (error) {
    return { error: true, message: error.message };
  }
};
