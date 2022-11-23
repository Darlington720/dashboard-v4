import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
// import makeAnimated from "react-select/animated";
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from "react-bootstrap-table2-overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import {
  faEye,
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import paginationFactory from "react-bootstrap-table2-paginator";
import Swal from "sweetalert2";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
  OverlineTitle,
  OutlinedInput,
  Icon,
} from "../../../components/Component";
import { defaultOptions, groupedData, colourData } from "./SelectData";
import { RSelect } from "../../../components/Component";
import Select from "react-select";
import constraintsApi from "../../../api/constraintsApi";
import { useDispatch } from "react-redux";
import actions from "../../../redux/actions/Actions";
import roomsApi from "../../../api/roomsApi";
import staffApi from "../../../api/staffApi";

const rooms = [
  {
    value: 1,
    label: "SK1",
  },
  {
    value: 2,
    label: "SK2",
  },
  {
    value: 3,
    label: "LIB3",
  },
  {
    value: 4,
    label: "TS1",
  },
  {
    value: 1,
    label: "SK1",
  },
  {
    value: 2,
    label: "SK2",
  },
  {
    value: 3,
    label: "LIB3",
  },
  {
    value: 4,
    label: "TS1",
  },
  {
    value: 1,
    label: "SK1",
  },
  {
    value: 2,
    label: "SK2",
  },
  {
    value: 3,
    label: "LIB3",
  },
  {
    value: 4,
    label: "TS1",
  },
];

const lecturers = [
  {
    value: 1,
    label: "Mr. Makubuya John",
  },
  {
    value: 2,
    label: "Mr. Lusiba Badru",
  },
  {
    value: 3,
    label: "Mr. Male Vicent",
  },
  {
    value: 4,
    label: "Mr. Lumbuye Jane",
  },
  {
    value: 1,
    label: "Mr. Mchake brian",
  },
];

const sessions = [
  {
    value: "morning",
    label: "Morning",
  },
  {
    value: "mid-mor",
    label: "Mid Morning",
  },
  {
    value: "evening",
    label: "Evening",
  },
];

const invigilators = [
  {
    id: 1,
    name: "Mr. Lusiba Badru",
    room: "sk2",
    date: "6-11-2022",
    session: "Morning",
    assigned_by: "Dean",
    status: "not yet",
  },
  {
    id: 2,
    name: "Mr. Male Vicent",
    room: "TS1",
    date: "7-11-2022",
    session: "Evening",
    assigned_by: "Dean",
    status: "not yet",
  },
];

function columnFormatter(cell, row, rowIndex) {
  return <span>{rowIndex + 1}</span>;
}

function headerFormatter(column, colIndex) {
  return (
    <span
      style={{
        width: "50px",
      }}
    >
      {column}
    </span>
  );
}

function timeFormatter(cell, row) {
  return (
    <span
      style={
        {
          // width: "50px",
        }
      }
    >
      {`${row.start_time} - ${row.end_time}`}
    </span>
  );
}

function dateFormatter(cell, row) {
  return (
    <span
      style={
        {
          // width: "50px",
        }
      }
    >
      {`${new Date(row.assigned_date).getFullYear()}-${
        new Date(row.assigned_date).getMonth() + 1
      }-${new Date(row.assigned_date).getDate()}`}
    </span>
  );
}

function statusFormatter(cell, row) {
  return (
    <div
      style={{
        // backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Badge
        color={
          row.status === 0
            ? "warning"
            : row.status == 1
            ? "primary"
            : row.status == 2
            ? "success"
            : "danger"
        }
        // className="badge-dot"
      >
        {row.status === 0
          ? "Not Started"
          : row.status === 1
          ? "in progress"
          : row.status === 2
          ? "Ended"
          : "Not Started"}
      </Badge>
      {/* <Badge className="badge-dot" color="primary">
        Primary
      </Badge> */}
    </div>
  );
}

function Contraints() {
  const [selectedItem, setSelectedItem] = useState();
  const [typedConstraint, setTypedConstraint] = useState("");
  const [constraints, setConstraints] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [modalTop, setModalTop] = useState(false);
  const [invModalTop, setInvModalTop] = useState(false);
  const [selectedExamSession, setSelectedExamSession] = useState();
  const [selectedInvigilators, setSelectedIngilators] = useState([]);
  const [examSessions, setExamSessions] = useState();
  const [staffMembers, setStaffMembers] = useState();
  const [loading, setLoading] = useState(false);
  const [invigilators, setInvigilators] = useState([]);
  const [exams, setExams] = useState([]);
  const [rooms, setRooms] = useState();
  const [newRoomName, setNewRoomName] = useState("");
  const [invigilatorData, setInvigilatorData] = useState();
  const dispatch = useDispatch();

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const toggleTop = () => setModalTop(!modalTop);

  const toggleInvModal = () => setInvModalTop(!invModalTop);

  const getExams = async (data) => {
    const res = await staffApi.getExamsOnGivenConstraints(data);

    if (!res.ok) {
      console.log("Error in getting exam data");
    }

    let tempArr = [];

    res.data.forEach((x) => {
      tempArr.push({
        value: x.course_unit_name,
        label: x.course_unit_name,
      });
    });

    setExams(tempArr);
    // console.log("Exams ", exams);
  };

  const getFullInvigilatorData = async (data) => {
    const res = await staffApi.getFullInvigilatorData(data);

    if (!res.ok) {
      console.log("Failed to get all data abt the invigilator data");
    }

    setInvigilatorData(res.data);
  };

  function deleteActionFormatter(cell, row) {
    return (
      <div
        style={{
          // backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faTrash}
          color="#000"
          size="lg"
          style={{
            cursor: "pointer",
          }}
          // onClick={() => handleView(row)}
          onClick={async () => {
            // toggleInvModal();
            // const dataToBeSent = {
            //   date: row.assigned_date,
            //   room: row.room_id,
            //   session: row.session_id,
            // };

            // getFullInvigilatorData(dataToBeSent);
            console.log("Pressed ", row);

            if (
              window.confirm(
                `Are you sure you want to remove ${row.staff_name} from invigilating ${row.room_name}???`
              )
            ) {
              const res = await staffApi.removeInvigilator(row);

              if (!res.ok) {
                console.log("Failed to remove invigilator", res.data);
                alert("Failed to remove invilator");
              }

              console.log(res.data);

              if (res.data == "success") {
                alert("Sucessfully removed invigilator from room");
                const dataToBeSent = {
                  date: row.assigned_date,
                  room: row.room_id,
                  session: row.session_id,
                };

                getFullInvigilatorData(dataToBeSent);
              }
              // console.log("Time to delete");
            }
          }}
        ></FontAwesomeIcon>
      </div>
    );
  }

  function actionFormatter(cell, row) {
    return (
      <div
        style={{
          // backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faEye}
          color="#000"
          size="lg"
          style={{
            cursor: "pointer",
          }}
          // onClick={() => handleView(row)}
          onClick={() => {
            toggleInvModal();
            const dataToBeSent = {
              date: row.assigned_date,
              room: row.room_id,
              session: row.session_id,
            };

            getFullInvigilatorData(dataToBeSent);
            console.log("Pressed ", row);
          }}
        ></FontAwesomeIcon>
      </div>
    );
  }

  const dataTableColumns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      // width: "100px",
      formatter: columnFormatter,
      headerStyle: (column, colIndex) => {
        return {
          width: "80px",
        };
      },
      // headerFormatter: headerFormatter,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },
    {
      dataField: "staff_name",
      text: "Invigilator Name",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },

    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          width: "120px",
        };
      },
      formatter: statusFormatter,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },

    {
      dataField: "action",
      text: "Action",
      formatter: deleteActionFormatter,
      headerStyle: (column, colIndex) => {
        return {
          width: "80px",
        };
      },
      // sort: true,
      // name: "Action",
      button: true,
      // cell: (row) => (
      //   <>
      //     <div
      //       style={{
      //         // backgroundColor: "red",
      //         display: "flex",
      //         alignItems: "flex-end",
      //         justifyContent: "flex-end",
      //       }}
      //     >
      //       <Link to={`${process.env.PUBLIC_URL}/lecture-details`} className="edit-button" style={{ color: "black" }}>
      //         <FontAwesomeIcon
      //           icon={faEye}
      //           color="#000"
      //           size="lg"
      //           style={{
      //             cursor: "pointer",
      //           }}
      //           onClick={() => handleView(row)}
      //           //onClick={() => {console.log("row clicked", row)}}
      //         ></FontAwesomeIcon>
      //       </Link>
      //     </div>
      //   </>
      // ),
    },
  ];

  const dataTableColumns2 = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      width: "100px",
      formatter: columnFormatter,
      headerStyle: (column, colIndex) => {
        return {
          width: "80px",
        };
      },
      // headerFormatter: headerFormatter,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },
    {
      dataField: "staff_name",
      text: "Invigilator Name",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },
    {
      // name: "Lecturer",
      // selector: (row) => row.staff_name,
      // minWidth: "150px",
      // sortable: true,
      // hide: 480,

      dataField: "room_name",
      text: "Room",
      sort: true,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },
    {
      dataField: "assigned_date",
      text: "Date",
      headerStyle: (column, colIndex) => {
        return {
          width: "130px",
        };
      },
      sort: true,
      formatter: dateFormatter,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },
    // {
    //   name: "Mode",
    //   selector: (row) => row.phone,
    //   sortable: true,
    //   cell: (row) => <span>{row.phone}</span>,
    //   hide: "md",
    // },
    {
      // name: "Status",
      // selector: (row) => row.status,
      // sortable: true,
      // hide: "sm",
      // cell: (row) => (
      //   <span
      //     className={`tb-status ml-1 text-${
      //       row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
      //     }`}
      //   >
      //     {row.status}
      //   </span>
      // ),

      dataField: "session_name",
      text: "Session",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          width: "150px",
        };
      },
      // formatter: lectureStatusFormatter,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },
    {
      // name: "Status",
      // selector: (row) => row.status,
      // sortable: true,
      // hide: "sm",
      // cell: (row) => (
      //   <span
      //     className={`tb-status ml-1 text-${
      //       row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
      //     }`}
      //   >
      //     {row.status}
      //   </span>
      // ),

      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          width: "120px",
        };
      },
      formatter: statusFormatter,
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="#000">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  // color="#000"
                  size="sm"
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  // onClick={() => handleView(row)}
                  //onClick={() => {console.log("row clicked", row)}}
                ></FontAwesomeIcon>
              </font>
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </span>
          );
        return null;
      },
    },

    {
      dataField: "action",
      text: "Action",
      formatter: actionFormatter,
      headerStyle: (column, colIndex) => {
        return {
          width: "80px",
        };
      },
      // sort: true,
      // name: "Action",
      button: true,
      // cell: (row) => (
      //   <>
      //     <div
      //       style={{
      //         // backgroundColor: "red",
      //         display: "flex",
      //         alignItems: "flex-end",
      //         justifyContent: "flex-end",
      //       }}
      //     >
      //       <Link to={`${process.env.PUBLIC_URL}/lecture-details`} className="edit-button" style={{ color: "black" }}>
      //         <FontAwesomeIcon
      //           icon={faEye}
      //           color="#000"
      //           size="lg"
      //           style={{
      //             cursor: "pointer",
      //           }}
      //           onClick={() => handleView(row)}
      //           //onClick={() => {console.log("row clicked", row)}}
      //         ></FontAwesomeIcon>
      //       </Link>
      //     </div>
      //   </>
      // ),
    },
  ];

  const getRooms = async () => {
    const res = await roomsApi.getRooms();
    if (!res.ok) {
      console.log("Failed to fetch rooms from the server");
    }

    let tempArr = [];

    res.data.forEach((room) => {
      tempArr.push({
        value: room.room_id,
        label: room.room_name,
      });
    });

    setRooms(tempArr);
    // successAlert();
  };

  const getStaffMembers = async () => {
    const res = await staffApi.getStaffMembers();
    if (!res.ok) {
      console.log("Failed to fetch staff Members from the server");
    }

    let tempArr = [];

    res.data.forEach((staffMember) => {
      tempArr.push({
        value: staffMember.staff_id,
        label: `${staffMember.title} ${staffMember.staff_name}`,
      });
    });

    setStaffMembers(tempArr);
    // successAlert();
  };

  const getExamSessions = async () => {
    const res = await staffApi.getExamSessions();
    if (!res.ok) {
      console.log("Failed to fetch Exam Sessions from the server");
    }

    let tempArr = [];

    res.data.forEach((examSession) => {
      tempArr.push({
        value: examSession.s_id,
        label: examSession.session_name,
      });
    });

    setExamSessions(tempArr);
    // successAlert();
  };

  const getConstraints = async () => {
    const response = await constraintsApi.getContraints();

    if (!response.ok) {
      console.log("Failed to load constraints");
    }
    let arr = [];

    response.data.forEach((constraint) => {
      arr.push({
        value: constraint.c_id,
        label: constraint.c_name,
      });
    });

    setConstraints(arr);
  };

  const handleAddRoom = async () => {
    const dataToBeSent = {
      roomName: newRoomName,
    };
    const res = await roomsApi.addRoom(dataToBeSent);

    if (!res.ok) {
      alert("Failed to store room in the db");
    }

    if (res.data == "success") {
      alert("Success");
      getRooms();
      setNewRoomName("");
      toggleTop();
    }
  };

  const getInvigilators = async () => {
    setLoading(true);
    const res = await staffApi.getInvigilators();
    setLoading(false);
    if (!res.ok) {
      console.log("Failed to fetch Invigilators from the server");
    }

    setInvigilators(res.data);
    console.log("Invigilators", res.data);
    // successAlert();
  };

  const addInvigilators = async (data) => {
    const res = await staffApi.addInvigilators(data);

    if (!res.ok) {
      console.log("Failed to add invigilator data to the database", res.data);
    }

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data Saved Successfully",
        focusConfirm: false,
      });
    }

    getInvigilators();
    return res.data;
  };

  const updateConstraint = async (constraint) => {
    const res = await constraintsApi.updateConstraint(constraint);

    if (!res.ok) {
      console.log("failed to update the constraint");
    }

    // successAlert();
    // console.log("response", res.data);
  };

  const defaultOptions = [
    { value: constraints.c_id, label: constraints.c_name },
    // { value: "strawberry", label: "Strawberry" },
    // { value: "vanilla", label: "Vanilla" },
  ];

  const InvigilatorDetailsModal = () => {
    return (
      <Modal
        size="lg"
        isOpen={invModalTop}
        toggle={toggleInvModal}
        className="modal-dialog-top"
      >
        {console.log("All inv data", invigilatorData)}
        <ModalHeader
          toggle={toggleInvModal}
          close={
            <button className="close" onClick={toggleInvModal}>
              <Icon name="cross" />
            </button>
          }
        >
          Details
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              display: "flex",
            }}
          >
            <span
              style={{
                fontSize: 16,
                width: "20%",
              }}
            >
              Exams
            </span>

            <span
              style={{
                fontSize: 16,
                width: "2%",
              }}
            >
              :
            </span>
            <span
              style={{
                fontSize: 16,
                width: "78%",
                textTransform: "capitalize",
              }}
            >
              {invigilatorData
                ? invigilatorData.exams.map(
                    (exam) => `${exam.course_unit_name}, `
                  )
                : "Loading"}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              height: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          ></div>

          <div
            style={{
              display: "flex",
            }}
          >
            <span
              style={{
                fontSize: 16,
                width: "20%",
              }}
            >
              Room
            </span>

            <span
              style={{
                fontSize: 16,
                width: "2%",
              }}
            >
              :
            </span>

            <span
              style={{
                fontSize: 16,
                width: "78%",
              }}
            >
              {invigilatorData && invigilatorData.invigilators[0]
                ? invigilatorData.invigilators[0].room_name
                : "Loading"}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              height: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          ></div>

          <div
            style={{
              display: "flex",
            }}
          >
            <span
              style={{
                fontSize: 16,
                width: "20%",
              }}
            >
              Date
            </span>

            <span
              style={{
                fontSize: 16,
                width: "2%",
              }}
            >
              :
            </span>

            <span
              style={{
                fontSize: 16,
                width: "78%",
              }}
            >
              {invigilatorData && invigilatorData.invigilators[0]
                ? new Date(
                    invigilatorData.invigilators[0].assigned_date
                  ).getFullYear() +
                  "-" +
                  (new Date(
                    invigilatorData.invigilators[0].assigned_date
                  ).getMonth() +
                    1) +
                  "-" +
                  new Date(
                    invigilatorData.invigilators[0].assigned_date
                  ).getDate()
                : "Loading"}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              height: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          ></div>

          <div
            style={{
              display: "flex",
            }}
          >
            <span
              style={{
                fontSize: 16,
                width: "20%",
              }}
            >
              Session
            </span>

            <span
              style={{
                fontSize: 16,
                width: "2%",
              }}
            >
              :
            </span>

            <span
              style={{
                fontSize: 16,
                width: "78%",
              }}
            >
              {invigilatorData && invigilatorData.invigilators[0]
                ? invigilatorData.invigilators[0].session_name
                : "Loading"}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              height: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          ></div>

          <div
            style={{
              display: "flex",
            }}
          >
            <span
              style={{
                fontSize: 16,
                width: "20%",
              }}
            >
              Status
            </span>

            <span
              style={{
                fontSize: 16,
                width: "2%",
              }}
            >
              :
            </span>

            <span
              style={{
                fontSize: 16,
                width: "78%",
              }}
            >
              {invigilatorData && invigilatorData.invigilators[0]
                ? invigilatorData.invigilators[0].status == 0
                  ? "Not Started"
                  : invigilatorData.invigilators[0].status == 1
                  ? "in progress"
                  : invigilatorData.invigilators[0].status == 2
                  ? "Finished"
                  : "Undefined"
                : "Loading"}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              height: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          ></div>

          <span
            style={{
              fontSize: 16,
              width: "20%",
            }}
          >
            Invigilators
          </span>
          <ToolkitProvider
            keyField="c_unit_id"
            exportCSV
            data={invigilatorData ? invigilatorData.invigilators : []}
            columns={dataTableColumns}
            search
          >
            {(props) => (
              <div>
                <BootstrapTable
                  striped
                  hover
                  condensed
                  loading={loading}
                  {...props.baseProps}
                  // pagination={paginationFactory()}
                  // noDataIndication={"Table is empty"}
                  // overlay={overlayFactory({
                  //   spinner: true,
                  //   styles: {
                  //     overlay: (base) => ({
                  //       ...base,
                  //       background: "lightblue",
                  //     }),
                  //   },
                  // })}
                  // // expandRow={expandRow}
                />
              </div>
            )}
          </ToolkitProvider>
        </ModalBody>
        <ModalFooter className="bg-light">
          <span
            className="sub-text"
            onClick={toggleInvModal}
            style={{
              cursor: "pointer",
            }}
          >
            Close
          </span>
        </ModalFooter>
      </Modal>
    );
  };

  useEffect(() => {
    getConstraints();
    getRooms();
    getStaffMembers();
    getExamSessions();
    getInvigilators();
  }, []);

  const handleSubmit = async () => {
    const dataToBeSent = {
      room: selectedItem,
      invigilators: selectedInvigilators,
      session: selectedExamSession,
      date: `${new Date(startDate).getFullYear()}-${
        new Date(startDate).getMonth() + 1
      }-${new Date(startDate).getDate()}`,
      status: 0,
      assigned_by: 1,
    };

    const res = await staffApi.addInvigilators(dataToBeSent);

    if (!res.ok) {
      console.log("Failed to add invigilator data to the database", res.data);
    }

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data Saved Successfully",
        focusConfirm: false,
      });

      // setRooms([]);
      // setInvigilators([]);
      // setExamSessions([]);
      // setExams([]);
      // setInvigilators([]);
      setSelectedItem("");
      setSelectedIngilators([]);
      setSelectedExamSession("");
      setStartDate(new Date());
      setExams([]);

      getInvigilators();
    }

    console.log(dataToBeSent);

    // addInvigilators(dataToBeSent);
  };

  return (
    <React.Fragment>
      {/* {console.log("constraaints", constraints)} */}
      {/* {console.log(typedConstraint)} */}
      {/* {console.log("Rooms", rooms)} */}
      {/* {console.log("Staff memebers", staffMembers)} */}

      <Head title="Dashboard"></Head>

      <Content page="component">
        <div
          style={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BlockHead wide="sm">
            <BlockHeadContent>
              <BlockTitle tag="h5" className="fw-normal">
                Assign Invigilators
              </BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <Button
            color="primary"
            className="eg-swal-default"
            onClick={toggleTop}
          >
            Add Room
          </Button>
        </div>
        <Block>
          <PreviewCard>
            <Row className="gy-4">
              <Col sm={4}>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <div className="form-control-wrap">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        // console.log("Date", date.toLocaleDateString());
                        setStartDate(date);
                      }}
                      dateFormat="yyyy-MM-dd"
                      className="form-control date-picker"
                    />{" "}
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <div className="form-group">
                  <label className="form-label">Select Room</label>
                  <RSelect
                    options={rooms}
                    value={selectedItem}
                    onChange={(value) => setSelectedItem(value)}
                    maxMenuHeight={200}
                  />
                </div>
              </Col>
              <Col sm={4} aria-colspan="5" aria-colcount={4} aria-colindex={4}>
                <div className="form-group">
                  <label className="form-label">Select Session</label>
                  <RSelect
                    options={examSessions}
                    value={selectedExamSession}
                    onChange={(value) => {
                      setSelectedExamSession(value);
                      const dataToBeSent = {
                        date: startDate,
                        room: selectedItem,
                        session: value,
                      };

                      console.log("Required Data", dataToBeSent);
                      getExams(dataToBeSent);
                    }}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <FormGroup>
                  {/* <Label htmlFor="default-0" className="form-label">
                    {"Select Invigilator"}
                  </Label> */}
                  <div className="form-group">
                    <label className="form-label">Examinations</label>
                    <RSelect
                      options={exams}
                      isMulti
                      maxMenuHeight={200}
                      value={exams}
                      // onChange={(value) => setSelectedIngilat(value)}
                    />
                  </div>
                </FormGroup>
              </Col>

              <Col sm={6}>
                <FormGroup>
                  {/* <Label htmlFor="default-0" className="form-label">
                    {"Select Invigilator"}
                  </Label> */}
                  <div className="form-group">
                    <label className="form-label">Select Invigilator/s</label>
                    <RSelect
                      options={staffMembers}
                      isMulti
                      maxMenuHeight={200}
                      value={selectedInvigilators}
                      onChange={(value) => setSelectedIngilators(value)}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            {/* 
            <Row
              style={{
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <Col sm={6} aria-colspan="5" aria-colcount={4} aria-colindex={4}>
                <div className="form-group">
                  <label className="form-label">Session</label>
                  <RSelect
                    options={examSessions}
                    value={selectedExamSession}
                    onChange={(value) => setSelectedExamSession(value)}
                  />
                </div>
              </Col>
            </Row> */}

            <Row
              style={{
                marginTop: 10,
              }}
            >
              <Col xs="6" md="3">
                {/* <OverlineTitle tag="span" className="preview-title">
                  Primary
                </OverlineTitle> */}
                {/* <Button color="primary">Add</Button> */}
                <Button
                  color="primary"
                  className="eg-swal-default"
                  onClick={() => handleSubmit()}
                >
                  Assign
                </Button>
              </Col>
            </Row>
            <hr />

            <h5>Invigilators List</h5>

            {/* <div className="card-inner"> */}
            {/* <ReactDataTable
                      data={todaysLectures}
                      columns={dataTableColumns2}
                      pagination
                      className="nk-tb-list"
                    /> */}

            <ToolkitProvider
              keyField="c_unit_id"
              exportCSV
              data={invigilators}
              columns={dataTableColumns2}
              search
            >
              {(props) => (
                <div>
                  {/* <h3>Input something at below input field:</h3> */}

                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                      }}
                    >
                      <SearchBar {...props.searchProps} />
                    </div>

                    <div
                      style={{
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ExportCSVButton {...props.csvProps}>
                        Export CSV!!
                      </ExportCSVButton>
                    </div>
                  </div>
                  {/* <hr /> */}
                  <BootstrapTable
                    striped
                    hover
                    condensed
                    loading={loading}
                    {...props.baseProps}
                    pagination={paginationFactory()}
                    noDataIndication={"Table is empty"}
                    overlay={overlayFactory({
                      spinner: true,
                      styles: {
                        overlay: (base) => ({
                          ...base,
                          background: "lightblue",
                        }),
                      },
                    })}
                    // expandRow={expandRow}
                  />
                </div>
              )}
            </ToolkitProvider>
            {/* </div> */}
          </PreviewCard>
        </Block>
        <Modal
          isOpen={modalTop}
          toggle={toggleTop}
          className="modal-dialog-top"
        >
          <ModalHeader
            toggle={toggleTop}
            close={
              <button className="close" onClick={toggleTop}>
                <Icon name="cross" />
              </button>
            }
          >
            Add Room
          </ModalHeader>
          <ModalBody>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Enter Room Name
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    type="text"
                    id="default-0"
                    placeholder="Room Name"
                  />
                </div>
              </FormGroup>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  color="primary"
                  className="eg-swal-default"
                  onClick={handleAddRoom}
                  style={{
                    marginTop: -10,
                    marginBottom: -15,
                  }}
                >
                  Add
                </Button>
              </div>
            </Col>
          </ModalBody>
          <ModalFooter className="bg-light">
            <span
              className="sub-text"
              onClick={toggleTop}
              style={{
                cursor: "pointer",
              }}
            >
              Close
            </span>
          </ModalFooter>
        </Modal>
        <InvigilatorDetailsModal />
      </Content>
    </React.Fragment>
  );
}

export default Contraints;
