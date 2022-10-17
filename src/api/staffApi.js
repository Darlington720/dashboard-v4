import apiClient from "./client";

//Number of all staff members in the university
const getNumAllStaff = () => apiClient.get("/numofstaff");

//An array of staff in the university 2de
const getAllStaffToday = () => apiClient.get("/stafftoday");

//Number of staff in campus 2de
const numOfStaffToday = () => apiClient.get("/numofstafftoday");

//An image of the given staff id
const getStaffImage = (staff_id) => apiClient.get(`/image/${staff_id}`);

const getAllStaffDetails = (staff_id) => apiClient.get(`/allstaffdetails/${staff_id}`);
const getLecturerCourseUnits = (data) => apiClient.post("/lecturerCourseunits", data);
const getEnrolledStudents = (course_id) => apiClient.get(`/getEnrolledStudents/${course_id}`);
const getLectureData = (data) => apiClient.post(`/getLectureData/`, data);

//An array of lectures today
const getTodaysLectures = (school) => apiClient.get(`/todaysLectures/${school}`);

//Number of Lectures today based on school
const getnumOfTodaysLectures = (school) => apiClient.get(`/numoftodaysLectures/${school}`);

//Number of Students Per school 2de
const getstudentsTotalBySchool = (school) => apiClient.get(`/studentsTotalBySchool/${school}`);

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
};

export default apiCalls;
