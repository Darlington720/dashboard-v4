import mainClient from "./client";

const getStudent = (studentNo) =>
  mainClient.apiClient.get(`/student/${studentNo}`);

// const getStudentRegData = (studentNo) =>
//   mainClient.apiClient2.post(
//     "/bridge",
//     {
//       action: "portal",
//       method: "load_reg_std",
//       data: [{ stdno: `${studentNo}`, inst_code: "nkumba" }],
//       type: "rpc",
//       tid: 9,
//     },
//     { headers: { "Access-Control-Allow-Origin": "*" } }
//   );

const getStudentRegData = (stdno) =>
  mainClient.apiClient.get(`/nkumbastudentbiodata/${stdno}`);

const addStudent = (student) =>
  mainClient.apiClient.post("/studentReg", student);
const signOutStudent = (studentNo) =>
  mainClient.apiClient.post(`/studentSignout/${studentNo}`);
const loginStudent = (studentInfo) =>
  mainClient.apiClient.post("/api/login", studentInfo);
const getMyStudents = (userId) =>
  mainClient.apiClient.get(`/myStudents/${userId}`);

//An array of students that came in 2de
const getAllStudents = () =>
  mainClient.apiClient.get("/api/dashboard/studentsToday");

//Number of students that came in 2de
const getTotalStudentsToday = () =>
  mainClient.apiClient.get("/api/admin/studentsTodayTotal");

//Number of students in the whole university
const getNumAllStudents = () =>
  mainClient.apiClient.get("/numofstudents_biodata");

//Number of students per school -- to be continued
const getNumOfStudentsPerSchool = (school) =>
  mainClient.apiClient.get(`/studentsPerSchool/${school}`);

const getForSpecificStudent = (studentNo) =>
  mainClient.apiClient.get(`/api/dashboard/allstudentdetails/${studentNo}`);

const getForSpecificStudentCustomReport = (student) =>
  mainClient.apiClient.post(`/api/dashboard/allstudentdetails/`, student);

const getCustomReports = (data) =>
  mainClient.apiClient.post("/getCustomReports", data);
const getChartData = () =>
  mainClient.apiClient.get("/api/dashboard/weeklyChartData");

// const addCustomer = (customer) => mainClient.apiClient.post("/customers", customer);
const deleteInvoice = (invoice) =>
  mainClient.apiClient.post("/delInvoice", invoice);
// const updateCustomer = (customer) =>
//   mainClient.apiClient.post("/updateCustomer", customer);

const getVoters = (campus_id) =>
  mainClient.apiClient.get(`/voters/${campus_id}`);

const getMyRegisteredModules = (stdno) =>
  mainClient.apiClient.get(`/api/getStudentRegisteredModules/${stdno}`);

// const getStudentRegisteredModules = (stdno, studyYr, sem, progcode, progvsn) =>
//   mainClient.apiClient2.post("/bridge", {
//     action: "portal",
//     method: "load_modules",
//     data: [
//       {
//         stdno: `${stdno}`,
//         study_yr: `${studyYr}`,
//         sem: `${sem}`,
//         progcode: `${progcode}`,
//         progvsn: `${progvsn}`,
//         page: 1,
//         start: 0,
//         limit: 20,
//       },
//     ],
//     type: "rpc",
//     tid: 19,
//   });

const getStudentRegisteredModules = (data) =>
  mainClient.apiClient.post("/nkumbaStudentRegisteredModules", data);

const saveExemption = (data) =>
  mainClient.apiClient.post("/api/saveExemption", data);

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
  getStudentRegData,
  getMyRegisteredModules,
  getStudentRegisteredModules,
  saveExemption,
};

export default apiCalls;
