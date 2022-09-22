import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.7.0.28:9000/",
});

export default apiClient;
