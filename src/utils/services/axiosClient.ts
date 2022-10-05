import {setupInterceptorsTo} from "./interceptor";
import axios from "axios";
import {baseUrl} from './helpers';

const client = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

setupInterceptorsTo(client);

export default client;
