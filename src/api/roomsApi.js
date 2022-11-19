import apiClient from "./client";

const addConstraint = (constraint) =>
  apiClient.post("/addConstraint", constraint);

const updateConstraint = (constraint) =>
  apiClient.post("/updateConstraint", constraint);

const getRooms = () => apiClient.get("/rooms");

const addRoom = (roomName) => apiClient.post("/api/addRoom", roomName);

const apiCalls = {
  getRooms,
  addRoom,
};

export default apiCalls;
