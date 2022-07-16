import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.201.2:3333'
});