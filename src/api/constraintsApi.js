import mainClient from "./client";

const addConstraint = (constraint) =>
  mainClient.apiClient.post("/addConstraint", constraint);

const updateConstraint = (constraint) =>
  mainClient.apiClient.post("/updateConstraint", constraint);

const getContraints = () => mainClient.apiClient.get("/constraints");

const apiCalls = {
  addConstraint,
  getContraints,
  updateConstraint,
};

export default apiCalls;
