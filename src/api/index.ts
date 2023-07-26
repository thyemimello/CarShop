import axios from "axios";

const api= axios.create({
  baseURL: "https://carshop-98hr.onrender.com",
  timeout: 30000,
});
export default api;
