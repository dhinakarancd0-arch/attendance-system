import axios from "axios";

const api = axios.create({
  baseURL: "https://attendance-system-bozk.onrender.com",
});

export default api;