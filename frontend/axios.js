import axios from "axios";

const axiosIntance = axios.create({
baseURL: "http://localhost/VETCARE/backend/",
// baseURL: "https://vetcare001.kesug.com/backend/",
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});

export default axiosIntance;
