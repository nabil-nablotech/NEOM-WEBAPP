import {
  User,
  UserPayload,
  UserModalstate,
  EditUserPayload,
  Roles,
} from "../types/User";
import { LinkGenerate } from "../types/UserManagement";
import client from "../utils/services/axiosClient";

export const fetchUser = (): Promise<User[]> =>
  client.get<User[]>("/api/users?populate=*").then((response) => response.data);

export const fetchUserRole = (): Promise<Roles> =>
  client
    .get<Roles>("/api/users-permissions/roles?populate=*")
    .then((response) => response.data);

export const postUser = (payload: UserPayload): Promise<User> =>
  client.post("/api/users", payload).then((response) => response.data);


export const editUser = (
  payload: EditUserPayload,
  
): Promise<User> =>
  client.put(`/api/users/${payload.id}`, payload.user).then((response) => response.data);
