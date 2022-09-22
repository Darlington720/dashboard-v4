const editCustomerDetails = (state = {}, action) => {
  switch (action.type) {
    case "STUDENT_DETAILS":
      return Object.assign({}, state, { student: action.payload });
    case "EDIT_CONSTRAINT":
      return Object.assign({}, state, { constraint: action.payload });

    case "GET_ROW_DATA":
      return Object.assign({}, state, { row: action.payload });

    default:
      return state;
  }
};

export default editCustomerDetails;
