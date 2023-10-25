import Axios from "axios";
import { ENV } from "./ENV";

export const apiHandler = Axios.create({
  baseURL: ENV.api_base,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
