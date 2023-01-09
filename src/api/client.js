import { create } from "apisauce";
// import { apiClient } from "./apiConstants";

const apiClient = create({
  baseURL: "http://localhost:9000/",
});

const apiClient2 = create({
  baseURL: "https://student.nkumbauniversity.ac.ug/",
});

const apiClientMain = {
  apiClient,
  apiClient2,
  // imgClient,
};
export default apiClientMain;
