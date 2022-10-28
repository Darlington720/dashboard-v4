import apiClient from "./client";

const getStudent = (studentNo) => apiClient.get(`/student/${studentNo}`);
const addStudent = (student) => apiClient.post("/studentReg", student);
const signOutStudent = (studentNo) =>
  apiClient.post(`/studentSignout/${studentNo}`);
const loginStudent = (studentInfo) => apiClient.post("/api/login", studentInfo);
const getMyStudents = (userId) => apiClient.get(`/myStudents/${userId}`);

//An array of students that came in 2de
const getAllStudents = () => apiClient.get("/studentsToday");

//Number of students that came in 2de
const getTotalStudentsToday = () => apiClient.get("/studentsTodayTotal");

//Number of students in the whole university
const getNumAllStudents = () => apiClient.get("/numofstudents_biodata");

//Number of students per school -- to be continued
const getNumOfStudentsPerSchool = (school) =>
  apiClient.get(`/studentsPerSchool/${school}`);

const getForSpecificStudent = (studentNo) =>
  apiClient.get(`/allstudentdetails/${studentNo}`);

const getForSpecificStudentCustomReport = (student) =>
  apiClient.post(`/allstudentdetails/`, student);

const getCustomReports = (data) => apiClient.post("/getCustomReports", data);
const getChartData = () => apiClient.get("/weeklyChartData");

// const addCustomer = (customer) => apiClient.post("/customers", customer);
const deleteInvoice = (invoice) => apiClient.post("/delInvoice", invoice);
// const updateCustomer = (customer) =>
//   apiClient.post("/updateCustomer", customer);

const getVoters = (campus_id) => apiClient.get(`/voters/${campus_id}`);

const apiCalls = {
  getAllStudents,
  getForSpecificStudent,
  getCustomReports,
  getForSpecificStudentCustomReport,
  getTotalStudentsToday,
  getNumAllStudents,
  getNumOfStudentsPerSchool,
  getChartData,
  getVoters,
};

export default apiCalls;
