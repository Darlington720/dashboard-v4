import apiClient from "./client";

const getNumAllStaff = () => apiClient.get("/numofstaff");
const getAllStaffToday = () => apiClient.get("/stafftoday");
const getStaffImage = (staff_id) => apiClient.get(`/image/${staff_id}`);
const getAllStaffDetails = (staff_id) => apiClient.get(`/allstaffdetails/${staff_id}`);
const getLecturerCourseUnits = (data) => apiClient.post("/lecturerCourseunits", data);
const getEnrolledStudents = (course_id) => apiClient.get(`/getEnrolledStudents/${course_id}`);
const getLectureData = (data) => apiClient.post(`/getLectureData/`, data);

const apiCalls = {
  getNumAllStaff,
  getAllStaffToday,
  getStaffImage,
  getAllStaffDetails,
  getLecturerCourseUnits,
  getEnrolledStudents,
  getLectureData,
};

export default apiCalls;
