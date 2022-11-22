import mainClient from "./client";

//Number of all staff members in the university
const getNumAllStaff = () => mainClient.apiClient.get("/numofstaff");

//An array of staff in the university 2de
const getAllStaffToday = () => mainClient.apiClient.get("/stafftoday");

//Number of staff in campus 2de
const numOfStaffToday = () => mainClient.apiClient.get("/numofstafftoday");

//An image of the given staff id
const getStaffImage = (staff_id) =>
  mainClient.apiClient.get(`/image/${staff_id}`);

const getAllStaffDetails = (staff_id) =>
  mainClient.apiClient.get(`/allstaffdetails/${staff_id}`);
const getLecturerCourseUnits = (data) =>
  mainClient.apiClient.post("/lecturerCourseunits", data);
const getEnrolledStudents = (course_id) =>
  mainClient.apiClient.get(`/getEnrolledStudents/${course_id}`);
const getLectureData = (data) =>
  mainClient.apiClient.post(`/getLectureData/`, data);

//An array of lectures today
const getTodaysLectures = (school) =>
  mainClient.apiClient.get(`/todaysLectures/${school}`);

//Number of Lectures today based on school
const getnumOfTodaysLectures = (school) =>
  mainClient.apiClient.get(`/numoftodaysLectures/${school}`);

//Number of Students Per school 2de
const getstudentsTotalBySchool = (school) =>
  mainClient.apiClient.get(`/studentsTotalBySchool/${school}`);

const getStaffMembers = () => mainClient.apiClient.get(`/staff`);

const getExamSessions = () => mainClient.apiClient.get(`/exam_sessions`);

const addInvigilators = (data) =>
  mainClient.apiClient.post(`/api/addinvigilator/`, data);

const getInvigilators = () => mainClient.apiClient.get(`/invigilator_sammary`);

const getModules = () => mainClient.apiClient.get(`/modules`);

const addTimetable = (data) =>
  mainClient.apiClient.post("/api/addExamTimetable", data);

const getSchools = () => mainClient.apiClient.get(`/schools`);

const getStudyTimes = () => mainClient.apiClient.get(`/study_time`);

const getExamsOnGivenConstraints = (data) =>
  mainClient.apiClient.post("/api/exams", data);

const getFullInvigilatorData = (data) =>
  mainClient.apiClient.post("/api/invigilatordata", data);

const login = (loginDetails) =>
  mainClient.apiClient.post("/api/login", loginDetails);

const getExamTimetable = (data) =>
  mainClient.apiClient.post("/api/examTT", data);

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
};

export default apiCalls;
