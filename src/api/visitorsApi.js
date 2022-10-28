import apiClient from "./client";

//An array of vistors in campus
const getVisitorsToday = () => apiClient.get(`/visitorData`);

//Number of visitors that came in the university 2de
const numOfVisitorsToday = () => apiClient.get(`/numOfvisitors2de`);

// const addStudent = (student) => apiClient.post("/studentReg", student);
// const signOutStudent = (studentNo) =>
//   apiClient.post(`/studentSignout/${studentNo}`);

// const addCustomer = (customer) => apiClient.post("/customers", customer);
// const deleteInvoice = (invoice) => apiClient.post("/delInvoice", invoice);
// const updateCustomer = (customer) =>
//   apiClient.post("/updateCustomer", customer);

const apiCalls = {
  getVisitorsToday,
  numOfVisitorsToday,
};

export default apiCalls;
