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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import {
  faEye,
  faArrowDown,
  faArrowUp,
  faEdit,
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

const roomsListTemp = [
  {
    id: 1,
    name: "SK2",
  },
  {
    id: 2,
    name: "LIB3",
  },
  {
    id: 3,
    name: "TS1",
  },
];

function columnFormatter(cell, row) {
  return <span>{cell}</span>;
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

function Contraints() {
  const [selectedItem, setSelectedItem] = useState();
  const [typedConstraint, setTypedConstraint] = useState("");
  const [constraints, setConstraints] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [modalTop, setModalTop] = useState(false);
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const toggleTop = () => setModalTop(!modalTop);

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
          onClick={() => {
            toggleTop();

            setSelectedRow(row);
          }}
          icon={faEdit}
          color="#000"
          size="lg"
          style={{
            cursor: "pointer",
          }}
          // onClick={() => handleView(row)}
          //onClick={() => {console.log("row clicked", row)}}
        ></FontAwesomeIcon>
      </div>
    );
  }

  const RenderEditModal = ({ row }) => {
    return (
      <div>
        {/* {console.log("row", row)} */}
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
                    type="text"
                    id="default-0"
                    value={row.name}
                    onChange={(e) => setNewRoomName(e.target.value)}
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
                  onClick={toggleTop}
                  style={{
                    marginTop: -10,
                    marginBottom: -15,
                  }}
                >
                  Update
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
      </div>
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      width: "100px",
      formatter: columnFormatter,
      // headerStyle: (column, colIndex) => {
      //   return {
      //     width: "80px",
      //   };
      // },
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
      dataField: "name",
      text: "Room Name",
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

    // {
    //   name: "Action",
    //   selector: (row) => row.lastLogin,
    //   sortable: true,
    //   cell: (row) => <span>{row.lastLogin}</span>,
    //   hide: "lg",
    // },
  ];

  function lectureStatusFormatter(cell, row) {
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
            row.has_started && !row.has_ended
              ? "primary"
              : !row.has_started
              ? "warning"
              : row.has_ended
              ? "success"
              : "danger"
          }
          // className="badge-dot"
        >
          {"Not Yet"}
        </Badge>
        {/* <Badge className="badge-dot" color="primary">
          Primary
        </Badge> */}
      </div>
    );
  }

  //   const addConstraint = async (constraint) => {
  //     const res = await constraintsApi.addConstraint(constraint);
  //     if (!res.ok) {
  //       console.log("failed to add the constraint");
  //     }

  //     // successAlert();
  //   };

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

  useEffect(() => {
    getConstraints();
  }, []);

  const handleSuccess = () => {
    dispatch(actions.percentage(parseInt(typedConstraint)));
    const data = {
      c_id: selectedItem.value,
      c_name: selectedItem.label,
      c_percentage: parseInt(typedConstraint),
    };
    updateConstraint(data);
    console.log(data);
    setSelectedItem({ label: "", value: "" });
    setTypedConstraint("");
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Percentage Updated Successfully",
      focusConfirm: false,
    });
  };

  return (
    <React.Fragment>
      {/* {console.log("constraaints", constraints)} */}
      {/* {console.log(typedConstraint)} */}
      <Head title="Dashboard"></Head>

      <Content page="component">
        <BlockHead wide="sm">
          <BlockHeadContent>
            <BlockTitle tag="h5" className="fw-normal">
              Add Room
            </BlockTitle>
          </BlockHeadContent>
        </BlockHead>

        <Block>
          <PreviewCard>
            <Row className="gy-4">
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="default-0" className="form-label">
                    {"Room Name"}
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      id="default-0"
                      placeholder="Enter Room Name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>
                </FormGroup>
              </Col>
              {/* <Col sm={6}>
                <Label htmlFor="default-0" className="form-label">
                  {"Room Name"}
                </Label>
                <Button
                  color="primary"
                  className="eg-swal-default"
                  onClick={() => handleSuccess()}
                >
                  Assign
                </Button>
              </Col> */}
            </Row>

            <Row>
              <Col
                xs="6"
                md="3"
                style={{
                  marginTop: 10,
                }}
              >
                {/* <OverlineTitle tag="span" className="preview-title">
                  Primary
                </OverlineTitle> */}
                {/* <Button color="primary">Add</Button> */}
                <Button
                  color="primary"
                  className="eg-swal-default"
                  onClick={() => handleSuccess()}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <hr />

            <h5>Rooms</h5>

            {/* <div className="card-inner"> */}
            {/* <ReactDataTable
                      data={todaysLectures}
                      columns={dataTableColumns2}
                      pagination
                      className="nk-tb-list"
                    /> */}

            <ToolkitProvider
              keyField="id"
              exportCSV
              data={roomsListTemp}
              columns={columns}
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
                    {...props.baseProps}
                    pagination={paginationFactory()}
                    // expandRow={expandRow}
                  />
                </div>
              )}
            </ToolkitProvider>
            {/* </div> */}
          </PreviewCard>
        </Block>
        <RenderEditModal row={selectedRow} />
      </Content>
    </React.Fragment>
  );
}

export default Contraints;
