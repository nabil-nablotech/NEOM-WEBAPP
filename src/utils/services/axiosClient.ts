import {setupInterceptorsTo} from "./interceptor";
import axios from "axios";

const client = axios.create({
    baseURL: 'https://1761-103-179-0-140.in.ngrok.io',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

setupInterceptorsTo(client);

export default client;
