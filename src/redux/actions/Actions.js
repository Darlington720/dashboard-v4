const getDetailsForStudent = (student) => ({
  type: "STUDENT_DETAILS",
  payload: student,
});

const editConstraint = (constraint) => ({
  type: "EDIT_CONSTRAINT",
  payload: constraint,
});

const getRowData = (row) => ({
  type: "GET_ROW_DATA",
  payload: row,
});

const percentage = (percentage) => ({
  type: "PERCENTAGE",
  payload: percentage,
});
const actions = {
  getDetailsForStudent,
  editConstraint,
  getRowData,
  percentage,
};

export default actions;
