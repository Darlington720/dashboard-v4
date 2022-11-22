import mainClient from "./client";

//An array of vistors in campus
const getVisitorsToday = () => mainClient.apiClient.get(`/visitorData`);

//Number of visitors that came in the university 2de
const numOfVisitorsToday = () => mainClient.apiClient.get(`/numOfvisitors2de`);

// const addStudent = (student) => mainClient.apiClient.post("/studentReg", student);
// const signOutStudent = (studentNo) =>
//   mainClient.apiClient.post(`/studentSignout/${studentNo}`);

// const addCustomer = (customer) => mainClient.apiClient.post("/customers", customer);
// const deleteInvoice = (invoice) => mainClient.apiClient.post("/delInvoice", invoice);
// const updateCustomer = (customer) =>
//   mainClient.apiClient.post("/updateCustomer", customer);

const apiCalls = {
  getVisitorsToday,
  numOfVisitorsToday,
};

export default apiCalls;
