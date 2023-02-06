import mainClient from "./client";

//Number of all staff members in the university
const getNumAllStaff = () => mainClient.apiClient.get("/numofstaff");

//An array of staff in the university 2de
const getAllStaffToday = () =>
  mainClient.apiClient.get("/api/dashboard/stafftoday");

//Number of staff in campus 2de
const numOfStaffToday = () =>
  mainClient.apiClient.get("/api/dashboard/numofstafftoday");

//An image of the given staff id
const getStaffImage = (staff_id) =>
  mainClient.apiClient.get(`/api/lecturer/image/${staff_id}`);

const getAllStaffDetails = (staff_id) =>
  mainClient.apiClient.get(`/api/dashboard/allstaffdetails/${staff_id}`);
const getLecturerCourseUnits = (data) =>
  mainClient.apiClient.post("/lecturerCourseunits", data);
const getEnrolledStudents = (course_id) =>
  mainClient.apiClient.get(`/getEnrolledStudents/${course_id}`);
const getLectureData = (data) =>
  mainClient.apiClient.post(`/getLectureData/`, data);

//An array of lectures today
const getTodaysLectures = (school) =>
  mainClient.apiClient.get(`/api/dashboard/todaysLectures/${school}`);

//Number of Lectures today based on school
const getnumOfTodaysLectures = (school) =>
  mainClient.apiClient.get(`/api/dashboard/numoftodaysLectures/${school}`);

//Number of Students Per school 2de
const getstudentsTotalBySchool = (school) =>
  mainClient.apiClient.get(`/api/dashboard/studentsTotalBySchool/${school}`);

const getStaffMembers = () => mainClient.apiClient.get(`/staff`);

const getExamSessions = () => mainClient.apiClient.get(`/exam_sessions`);

const addInvigilators = (data) =>
  mainClient.apiClient.post(`/api/addinvigilator/`, data);

const getInvigilators = () => mainClient.apiClient.get(`/invigilator_sammary`);

const getModules = () => mainClient.apiClient.get(`/modules`);

const addTimetable = (data) =>
  mainClient.apiClient.post("/api/timetable/addExamTimetable", data);

const addLectureTimetable = (data) =>
  mainClient.apiClient.post("/api/timetable/addClassTimetable", data);

const getSchools = () => mainClient.apiClient.get(`/schools`);

const getStudyTimes = () => mainClient.apiClient.get(`/study_time`);

const getExamsOnGivenConstraints = (data) =>
  mainClient.apiClient.post("/api/exams", data);

const getFullInvigilatorData = (data) =>
  mainClient.apiClient.post("/api/dashboard/invigilatordata", data);

const login = (loginDetails) =>
  mainClient.apiClient.post("/api/auth/login", loginDetails);

const getExamTimetable = (data) =>
  mainClient.apiClient.post("/api/timetable/examTT", data);

const removeInvigilator = (data) =>
  mainClient.apiClient.post("/api/removeInvigilator", data);

const importExcelToDB = (data) =>
  mainClient.apiClient.post("/api/upload/importExceltodb", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const getLastUploadedDateAndTime = () =>
  mainClient.apiClient.get(`/api/upload/lastUploadDateForFees`);

const apiCalls = {
  getNumAllStaff,
  getAllStaffToday,
  getStaffImage,
  getAllStaffDetails,
  getLecturerCourseUnits,
  getEnrolledStudents,
  getLectureData,
  getTodaysLectures,
  getstudentsTotalBySchool,
  numOfStaffToday,
  getnumOfTodaysLectures,
  getStaffMembers,
  getExamSessions,
  addInvigilators,
  getInvigilators,
  getModules,
  addTimetable,
  getSchools,
  getStudyTimes,
  getExamsOnGivenConstraints,
  getFullInvigilatorData,
  login,
  getExamTimetable,
  removeInvigilator,
  importExcelToDB,
  getLastUploadedDateAndTime,
  addLectureTimetable,
};

export default apiCalls;
