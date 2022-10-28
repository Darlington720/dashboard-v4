import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.7.8.57:9000/",
});

export default apiClient;
