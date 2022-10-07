import { setupInterceptorsTo } from "./interceptor";
import axios from "axios";
import { baseUrl } from "./helpers";
import { getToken } from "../storage/storage";

export type Headers = {
  "Content-Type": "text/HTML" | "application/json"
  Accept: "text/HTML" | "application/json"
  "Access-Control-Allow-Origin": string,
  Authorization?: string
}

const headers: Headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  // "ngrok-skip-browser-warning": "3243r"
};

const client = axios.create({
  baseURL: baseUrl,
  headers: headers,
});

setupInterceptorsTo(client);

export default client;
