import axios from "axios";

export const localityApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br'
});