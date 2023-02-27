import { baseURL } from "./axios";


export const createUser = async (data) => {
try {
    const res = await baseURL.post("/auth/user", data);
    const user = await res.data
    return user
} catch (error) {
    return Promise.reject(error);
}
}