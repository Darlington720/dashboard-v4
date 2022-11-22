import mainClient from "./client";

const addConstraint = (constraint) =>
  mainClient.apiClient.post("/addConstraint", constraint);

const updateConstraint = (constraint) =>
  mainClient.apiClient.post("/updateConstraint", constraint);

const getRooms = () => mainClient.apiClient.get("/rooms");

const addRoom = (roomName) =>
  mainClient.apiClient.post("/api/addRoom", roomName);

const apiCalls = {
  getRooms,
  addRoom,
};

export default apiCalls;
