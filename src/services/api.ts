import axios from "axios";

export const api = axios.create({
  baseURL: 'http://ec2-15-228-205-223.sa-east-1.compute.amazonaws.com/'
});