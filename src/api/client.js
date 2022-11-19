import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.42.28:9000/",
});

export default apiClient;
