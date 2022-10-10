import {
  User,
  loginPayload,
  UserDetails,
} from "../types/User";
import client from "../utils/services/axiosClient";

export const login = (payload: loginPayload): Promise<UserDetails> =>
  client.post(`/api/auth/local/`, JSON.stringify(payload)).then((response) => response.data);

