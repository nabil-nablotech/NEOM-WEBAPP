import { setupInterceptorsTo } from "./interceptor";
import axios from "axios";
import { baseUrl } from "./helpers";
import { getToken } from "../storage/storage";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `${getToken()}`,
  "ngrok-skip-browser-warning": "3243r"
};

const client = axios.create({
  baseURL: baseUrl,
  headers: headers,
});

setupInterceptorsTo(client);

export default client;
