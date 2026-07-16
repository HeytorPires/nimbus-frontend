import axios from "axios";

const ApiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${ApiUrl}`,
  withCredentials: true, // Envia cookies automaticamente em requisições
});

export default api;
