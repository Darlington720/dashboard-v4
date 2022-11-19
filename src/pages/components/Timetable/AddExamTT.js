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
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import {
  faEye,
  faArrowDown,
  faArrowUp,
  faPlus,
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
import { FixedSizeList as List } from "react-window";

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

// const schools = [
//   {
//     value: 1,
//     label: "SBA",
//   },
//   {
//     value: 2,
//     label: "SCI",
//   },
//   {
//     value: 3,
//     label: "SCOS",
//   },
//   {
//     value: 4,
//     label: "SOSS",
//   },
//   {
//     value: 5,
//     label: "SCIAD",
//   },
// ];

// const studyTimes = [
//   {
//     value: 1,
//     label: "DAY",
//   },
//   {
//     value: 2,
//     label: "WEEKEND",
//   },
//   {
//     value: 3,
//     label: "DISTANCE",
//   },
// ];

const months = [
  {
    value: "Jan",
    label: "January",
  },
  {
    value: "Feb",
    label: "February",
  },
  {
    value: "March",
    label: "March",
  },
  {
    value: "April",
    label: "April",
  },
  {
    value: "May",
    label: "May",
  },
  {
    value: "june",
    label: "June",
  },
  {
    value: "July",
    label: "july",
  },
  {
    value: "Aug",
    label: "August",
  },
  {
    value: "Sept",
    label: "September",
  },
  {
    value: "Oct",
    label: "October",
  },
  {
    value: "November",
    label: "November",
  },
  {
    value: "December",
    label: "December",
  },
];

const years = [
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2022",
    label: "2022",
  },
];

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
        {"Not Started"}
      </Badge>
      {/* <Badge className="badge-dot" color="primary">
        Primary
      </Badge> */}
    </div>
  );
}

function Contraints() {
  const [numOfRows, setNumOfRows] = useState(1);
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
  const [rooms, setRooms] = useState();
  const [school, setSchool] = useState();
  const [studyTime, setStudyTime] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState();
  const [schools, setSchools] = useState();
  const [studyTimes, setStudyTimes] = useState();
  const [newRoomName, setNewRoomName] = useState("");
  const [inputList, setInputList] = useState([]);
  const dispatch = useDispatch();

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const timetableRecords = [
    {
      date: new Date(),
      session: "",
      room: "",
      courseUnit: "",
    },
  ];
  const [timetable, setTimetable] = React.useState(timetableRecords);

  const updateFieldChanged = (index) => (e) => {
    // console.log("index: " + index);
    // console.log("property name: " + e);
    let newArr = [...timetable]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newArr[index].date = e; // replace e.target.value with whatever you want to change it to

    setTimetable(newArr);
  };

  const toggleTop = () => setModalTop(!modalTop);

  const toggleInvModal = () => setInvModalTop(!invModalTop);

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
        value: staffMember.id,
        label: `${staffMember.title} ${staffMember.staff_name}`,
      });
    });

    setStaffMembers(tempArr);
    // successAlert();
  };

  const getSchools = async () => {
    const res = await staffApi.getSchools();
    if (!res.ok) {
      console.log("Failed to fetch schools from the server");
    }

    let tempArr = [];

    res.data.forEach((school) => {
      tempArr.push({
        value: school.school_id,
        label: `${school.school_name} - ${school.alias}`,
      });
    });

    setSchools(tempArr);
    // successAlert();
  };

  const getStudyTimes = async () => {
    const res = await staffApi.getStudyTimes();
    if (!res.ok) {
      console.log("Failed to fetch study times from the server");
    }

    let tempArr = [];

    res.data.forEach((studyTime) => {
      tempArr.push({
        value: studyTime.st_id,
        label: `${studyTime.study_time_name}`,
      });
    });

    setStudyTimes(tempArr);
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

  const getModules = async () => {
    const res = await staffApi.getModules();
    if (!res.ok) {
      console.log("Failed to fetch Exam Modules from the server");
    }

    let tempArr = [];

    res.data.forEach((module) => {
      tempArr.push({
        value: module.course_id,
        label: `${module.course_name} - ${module.school_id}`,
      });
    });

    setModules(tempArr);
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

  const handleAddRoom = async () => {
    const dataToBeSent = {
      roomName: newRoomName,
    };
    const res = await roomsApi.addRoom(dataToBeSent);

    if (!res.ok) {
      alert("Failed to store room in the db");
    } else {
      getRooms();
      alert("Success");
      setNewRoomName("");
      toggleTop();
    }
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
        isOpen={invModalTop}
        toggle={toggleInvModal}
        className="modal-dialog-top"
      >
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
              Invigilators
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
              Mr. Mulinde Hakim, Mr. Mchake Brian
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
              SK2
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
              2022-09-11
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
              MidMornig
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
              Not Started
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

  const filterColors = (inputValue) => {
    return modules.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  useEffect(() => {
    getConstraints();
    getRooms();
    getStaffMembers();
    getExamSessions();
    getInvigilators();
    getModules();
    getSchools();
    getStudyTimes();
  }, []);

  class MenuList extends React.Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * 40;

      return (
        <List
          height={maxHeight}
          itemCount={children.length}
          itemSize={40}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
  }

  const handleSubmit = async () => {
    // const dataToBeSent = {
    //   room: selectedItem,
    //   invigilators: selectedInvigilators,
    //   session: selectedExamSession,
    //   date: `${new Date(startDate).getFullYear()}-${
    //     new Date(startDate).getMonth() + 1
    //   }-${new Date(startDate).getDate()}`,
    //   status: 0,
    //   assigned_by: 1,
    // };

    const dataToBeSent = {
      headers: {
        school: school,
        studyTime: studyTime,
        month,
        year,
      },
      timetable: timetable,
    };

    const res = await staffApi.addTimetable(dataToBeSent);

    if (!res.ok) {
      alert("Failed to save the timetable");
    } else {
      if (res.data == "Success") {
        alert("timetable Saved successfully");
        setNumOfRows(1);
        setTimetable(timetableRecords);
        setSchool([]);
        setStudyTime([]);
        setMonth([]);
        setYear([]);
      }
    }

    // console.log("Data final", dataToBeSent);

    // addInvigilators(dataToBeSent);
  };

  return (
    <React.Fragment>
      {/* {console.log("constraaints", constraints)} */}
      {/* {console.log(typedConstraint)} */}
      {/* {console.log("Rooms", rooms)} */}
      {/* {console.log("Staff memebers", staffMembers)} */}
      {/* {console.log("Timetable", timetable)} */}
      {/* {console.log("The modules", modules)} */}
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
                Add Exam Timetable
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
            <Row
              className="gy-4"
              style={{
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select School</label>
                  <RSelect
                    options={schools}
                    value={school}
                    onChange={(value) => setSchool(value)}
                    maxMenuHeight={200}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <FormGroup>
                  {/* <Label htmlFor="default-0" className="form-label">
                    {"Select Invigilator"}
                  </Label> */}
                  <div className="form-group">
                    <label className="form-label">Select StudyTime</label>
                    <RSelect
                      options={studyTimes}
                      // isMulti
                      maxMenuHeight={200}
                      value={studyTime}
                      onChange={(value) => setStudyTime(value)}
                    />
                  </div>
                </FormGroup>
              </Col>

              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Month</label>

                  <RSelect
                    options={months}
                    value={month}
                    onChange={(value) => setMonth(value)}
                    maxMenuHeight={200}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <FormGroup>
                  {/* <Label htmlFor="default-0" className="form-label">
                    {"Select Invigilator"}
                  </Label> */}
                  <div className="form-group">
                    <label className="form-label">Select Year</label>
                    <RSelect
                      options={years}
                      // isMulti
                      maxMenuHeight={200}
                      value={year}
                      onChange={(value) => setYear(value)}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </PreviewCard>
          <PreviewCard>
            {[...Array(numOfRows)].map((item, index) => {
              // item = timetableRecords[index];
              return (
                <div>
                  {/* {console.log("Date", timetable[0].date)} */}
                  <Row>
                    <Col sm={4}>
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={timetable[index].date}
                            onChange={(date) => {
                              timetable[index].date = date;
                              setTimetable([...timetable]);
                            }}
                            // onChange={(value) => {
                            //   setTimetable(
                            //     ...timetable,
                            //     (timetable[index].date = value)
                            //   );
                            // }}
                            dateFormat="yyyy-MM-dd"
                            className="form-control date-picker"
                          />{" "}
                        </div>
                      </div>
                    </Col>

                    <Col
                      sm={4}
                      aria-colspan="5"
                      aria-colcount={4}
                      aria-colindex={4}
                    >
                      <div className="form-group">
                        <label className="form-label">Session</label>
                        <RSelect
                          options={examSessions}
                          value={timetable[index].session}
                          // onChange={(value) => {
                          //   setTimetable([
                          //     ...timetable,
                          //     (timetable[index].session = value),
                          //   ]);
                          //   // (timetable[index].session = value)
                          // }}

                          onChange={(value) => {
                            timetable[index].session = value;
                            setTimetable([...timetable]);
                            // setTimetable(timetableRecords);
                          }}
                        />
                      </div>
                    </Col>

                    <Col sm={4}>
                      <div className="form-group">
                        <label className="form-label">Select Room</label>
                        <RSelect
                          options={rooms}
                          value={timetable[index].room}
                          onChange={(value) => {
                            timetable[index].room = value;
                            setTimetable([...timetable]);
                            // setTimetable(timetableRecords);
                            // (timetable[index].room = value)
                          }}
                          maxMenuHeight={200}
                        />
                      </div>
                    </Col>

                    <Col
                      sm={12}
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <div className="form-group">
                        <label className="form-label">Select course unit</label>
                        <div className="form-control-wrap">
                          <RSelect
                            components={{ MenuList }}
                            options={modules}
                            // isMulti
                            maxMenuHeight={200}
                            value={timetable[index].courseUnit}
                            onChange={(value) => {
                              timetable[index].courseUnit = value;
                              setTimetable([...timetable]);
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "black",
                      opacity: 0.8,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  ></div>
                </div>
              );
            })}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                onClick={() => {
                  if (numOfRows == 1) {
                    alert("Deleting the 1st row is not allowed");
                  } else {
                    // patient.splice(index, 1);
                    timetable.pop();
                    setNumOfRows(numOfRows - 1);
                  }
                }}
                style={{
                  backgroundColor: "red",
                  width: 40,
                  height: 40,
                  borderRadius: 5,
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  color="#fff"
                  size="lg"
                  style={{
                    // cursor: "pointer",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // onClick={() => handleView(row)}
                  // onClick={() => toggleInvModal()}
                ></FontAwesomeIcon>
              </div>

              <div
                onClick={() => {
                  setTimetable(timetable.concat(timetableRecords));
                  // timetable.push({
                  //   date: new Date(),
                  //   session: "",
                  //   room: "",
                  //   courseUnit: "",
                  // });

                  // setTimetable(timetableRecords);

                  setNumOfRows(numOfRows + 1);
                }}
                style={{
                  backgroundColor: "blue",
                  width: 40,
                  height: 40,
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  color="#fff"
                  size="lg"
                  style={{
                    // cursor: "pointer",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // onClick={() => handleView(row)}
                  // onClick={() => toggleInvModal()}
                ></FontAwesomeIcon>
              </div>
            </div>

            <Row>
              <Col xs="6" md="3">
                {/* <OverlineTitle tag="span" className="preview-title">
                  Primary
                </OverlineTitle> */}
                {/* <Button color="primary">Add</Button> */}
                <Button
                  color="primary"
                  className="eg-swal-default"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want t o save this timetable???"
                      )
                    )
                      handleSubmit();
                  }}
                >
                  Save Timetable
                </Button>
              </Col>
            </Row>
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
