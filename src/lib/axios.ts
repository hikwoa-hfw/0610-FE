import { BASE_URL_API } from "@/config/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
});
