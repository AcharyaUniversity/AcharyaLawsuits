import Axios from "axios";

const token = localStorage.getItem("token");

const axios = Axios.create({
  baseURL: `https://www.stageapi-acharyainstitutes.in`,
});

axios.interceptors.request.use((config) => {
  config.headers.LegalAuthorization = token;
  return config;
});

export default axios;
