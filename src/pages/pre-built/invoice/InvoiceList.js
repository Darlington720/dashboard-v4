import React, { useState, useEffect } from "react";
import overlayFactory from "react-bootstrap-table2-overlay";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Card,
  Badge,
  DropdownItem,
} from "reactstrap";

import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PreviewCard,
  ReactDataTable,
  PaginationComponent,
} from "../../../components/Component";
import { Link } from "react-router-dom";
import { invoiceData } from "./Invoice";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import paginationFactory from "react-bootstrap-table2-paginator";
// import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import staffApi from "../../../api/staffApi";

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
      <Link
        to={`${process.env.PUBLIC_URL}/lecture-details`}
        className="edit-button"
        style={{ color: "black" }}
      >
        <FontAwesomeIcon
          icon={faEye}
          color="#000"
          size="lg"
          style={{
            cursor: "pointer",
          }}
          // onClick={() => handleView(row)}
          //onClick={() => {console.log("row clicked", row)}}
        ></FontAwesomeIcon>
      </Link>
    </div>
  );
}

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
        {row.has_started && !row.has_ended
          ? "ongoing"
          : !row.has_started
          ? "Not Started"
          : row.has_ended
          ? "Ended"
          : "Not Startedd"}
      </Badge>
      {/* <Badge className="badge-dot" color="primary">
        Primary
      </Badge> */}
    </div>
  );
}

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
    // cell: (row) => (
    //   <span className="tb-amount">
    //     {row.balance} <span className="currency">USD</span>
    //   </span>
    // ),
    // sortable: true,
    // hide: 480,
  },
  {
    // name: "Course unit",
    // selector: (row) => row.course_unit_name,
    // minWidth: "200px",
    // cell: (row) => <span className="tb-amount">{row.course_unit_name}</span>,
    // sortable: true,
    // hide: 480,
    dataField: "course_unit_name",
    text: "Course Unit",
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

    dataField: "staff_name",
    text: "Lecturer",
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

  // {
  //   // name: "Room",
  //   // selector: (row) => row.room,
  //   // minWidth: "auto",
  //   // cell: (row) => <span>{row.room}</span>,
  //   // sortable: true,
  //   // hide: 480,

  //   dataField: "room",
  //   text: "Room",
  //   sort: true,
  //   sortCaret: (order, column) => {
  //     if (!order)
  //       return (
  //         <span>
  //           &nbsp;&nbsp;{" "}
  //           <FontAwesomeIcon
  //             icon={faArrowDown}
  //             // color="#000"
  //             size="sm"
  //             // style={{
  //             //   cursor: "pointer",
  //             // }}
  //             // onClick={() => handleView(row)}
  //             //onClick={() => {console.log("row clicked", row)}}
  //           ></FontAwesomeIcon>
  //           <FontAwesomeIcon
  //             icon={faArrowUp}
  //             // color="#000"
  //             size="sm"
  //             // style={{
  //             //   cursor: "pointer",
  //             // }}
  //             // onClick={() => handleView(row)}
  //             //onClick={() => {console.log("row clicked", row)}}
  //           ></FontAwesomeIcon>
  //         </span>
  //       );
  //     else if (order === "asc")
  //       return (
  //         <span>
  //           &nbsp;&nbsp;
  //           <FontAwesomeIcon
  //             icon={faArrowDown}
  //             // color="#000"
  //             size="sm"
  //             // style={{
  //             //   cursor: "pointer",
  //             // }}
  //             // onClick={() => handleView(row)}
  //             //onClick={() => {console.log("row clicked", row)}}
  //           ></FontAwesomeIcon>
  //           <font color="#000">
  //             <FontAwesomeIcon
  //               icon={faArrowUp}
  //               // color="#000"
  //               size="sm"
  //               // style={{
  //               //   cursor: "pointer",
  //               // }}
  //               // onClick={() => handleView(row)}
  //               //onClick={() => {console.log("row clicked", row)}}
  //             ></FontAwesomeIcon>
  //           </font>
  //         </span>
  //       );
  //     else if (order === "desc")
  //       return (
  //         <span>
  //           &nbsp;&nbsp;
  //           <font color="#000">
  //             <FontAwesomeIcon
  //               icon={faArrowDown}
  //               // color="#000"
  //               size="sm"
  //               // style={{
  //               //   cursor: "pointer",
  //               // }}
  //               // onClick={() => handleView(row)}
  //               //onClick={() => {console.log("row clicked", row)}}
  //             ></FontAwesomeIcon>
  //           </font>
  //           <FontAwesomeIcon
  //             icon={faArrowUp}
  //             // color="#000"
  //             size="sm"
  //             // style={{
  //             //   cursor: "pointer",
  //             // }}
  //             // onClick={() => handleView(row)}
  //             //onClick={() => {console.log("row clicked", row)}}
  //           ></FontAwesomeIcon>
  //         </span>
  //       );
  //     return null;
  //   },
  // },

  {
    dataField: "start_time",
    text: "Time",
    headerStyle: (column, colIndex) => {
      return {
        width: "180px",
      };
    },
    sort: true,
    formatter: timeFormatter,
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

    dataField: "status",
    text: "Status",
    sort: true,
    headerStyle: (column, colIndex) => {
      return {
        width: "120px",
      };
    },
    formatter: lectureStatusFormatter,
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

const InvoiceList = () => {
  const [data, setData] = useState(invoiceData);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("asc");
  const [activeTab, setActivetab] = useState("1");
  const [hasError, setHasError] = useState(false);
  const [todaysLectures, setTodaysLectures] = useState([]);
  const [loading, setLoading] = useState(false);

  const schools = ["SBA", "SCI", "SCOS", "SOSS", "SLAW", "SCIAD"];

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const expandRow = {
    renderer: (row) => (
      <div>
        <div style={{ width: "30%", marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100% ",
            }}
          >
            <span>Room :</span>
            <span>{`${row.room}`}</span>
          </div>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "black",
              opacity: 0.2,
            }}
          ></div>
          {/* <hr /> */}
        </div>
      </div>
    ),
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <b>-</b>;
      }
      return <b>+</b>;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return <b>-</b>;
      }
      return <b>+</b>;
    },
  };
  const getTodaysLectures = async (school) => {
    setLoading(true);
    const res = await staffApi.getTodaysLectures(school);
    setLoading(false);

    if (!res.ok) {
      setHasError(true);
      console.log("Failed to load todays lectures from the server");
    }

    setTodaysLectures(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    getTodaysLectures("SBA");
  }, []);

  const TabExample = () => {
    const toggleTab = (tab) => {
      if (activeTab !== tab) setActivetab(tab);
    };

    return (
      <>
        <Nav tabs style={{ justifyContent: "center" }}>
          {schools.map((school, index) => (
            <NavItem>
              <NavLink
                tag="a"
                href="#tab"
                className={classnames({ active: activeTab === `${index + 1}` })}
                onClick={(ev) => {
                  ev.preventDefault();
                  toggleTab(`${index + 1}`);
                  getTodaysLectures(school);
                }}
              >
                {school}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        {schools.map((school, index) => (
          <TabContent activeTab={activeTab}>
            <TabPane tabId={`${index + 1}`}>
              <Block>
                <Card className="card-bordered card-stretch">
                  <div className="card-inner-group">
                    <div className="card-inner">
                      <div className="card-title-group">
                        <div className="card-title">
                          <h5 className="title">{`All Lectures in ${school}`}</h5>
                        </div>
                        <div className="card-tools mr-n1">
                          <ul className="btn-toolbar">
                            <li>
                              <Button
                                onClick={toggle}
                                className="btn-icon search-toggle toggle-search"
                              >
                                <Icon name="search"></Icon>
                              </Button>
                            </li>
                            <li className="btn-toolbar-sep"></li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  tag="a"
                                  className="dropdown-toggle btn btn-icon btn-trigger"
                                >
                                  <Icon name="setting"></Icon>
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <ul className="link-check">
                                    <li>
                                      <span>Show</span>
                                    </li>
                                    <li
                                      className={
                                        itemPerPage === 10 ? "active" : ""
                                      }
                                    >
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(10);
                                        }}
                                      >
                                        10
                                      </DropdownItem>
                                    </li>
                                    <li
                                      className={
                                        itemPerPage === 15 ? "active" : ""
                                      }
                                    >
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(15);
                                        }}
                                      >
                                        15
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                  <ul className="link-check">
                                    <li>
                                      <span>Order</span>
                                    </li>
                                    <li
                                      className={sort === "dsc" ? "active" : ""}
                                    >
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("dsc");
                                          sortFunc("dsc");
                                        }}
                                      >
                                        DESC
                                      </DropdownItem>
                                    </li>
                                    <li
                                      className={sort === "asc" ? "active" : ""}
                                    >
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("asc");
                                          sortFunc("asc");
                                        }}
                                      >
                                        ASC
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={`card-search search-wrap ${
                            !onSearch ? "active" : ""
                          }`}
                        >
                          <div className="search-content">
                            <Button
                              className="search-back btn-icon toggle-search"
                              onClick={() => {
                                setSearchText("");
                                toggle();
                              }}
                            >
                              <Icon name="arrow-left"></Icon>
                            </Button>
                            <input
                              type="text"
                              className="form-control border-transparent form-focus-none"
                              placeholder="Search by Order Id"
                              value={onSearchText}
                              onChange={(e) => onFilterChange(e)}
                            />
                            <Button className="search-submit btn-icon">
                              <Icon name="search"></Icon>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <PreviewCard> */}
                  <div className="card-inner p-2">
                    {/* <ReactDataTable
                      data={todaysLectures}
                      columns={dataTableColumns2}
                      pagination
                      className="nk-tb-list"
                    /> */}

                    <ToolkitProvider
                      keyField="c_unit_id"
                      exportCSV
                      data={todaysLectures}
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
                          {/* <BootstrapTable
                            striped
                            hover
                            condensed
                            {...props.baseProps}
                            pagination={paginationFactory()}
                            expandRow={expandRow}
                          /> */}
                          <BootstrapTable
                            striped
                            hover
                            condensed
                            tabIndexCell
                            // remote
                            loading={loading}
                            {...props.baseProps}
                            pagination={paginationFactory()}
                            expandRow={expandRow}
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
                          />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                  {/* </PreviewCard> */}
                </Card>
              </Block>
            </TabPane>
          </TabContent>
        ))}
      </>
    );
  };

  // Sorting data
  const sortFunc = () => {
    let defaultData = data;
    if (sort === "dsc") {
      let sortedData = defaultData.sort(
        (a, b) => parseFloat(a.id) - parseFloat(b.id)
      );
      setData([...sortedData]);
    } else if (sort === "asc") {
      let sortedData = defaultData.sort(
        (a, b) => parseFloat(b.id) - parseFloat(a.id)
      );
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = invoiceData.filter((item) => {
        return item.orderId.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...invoiceData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  return (
    <React.Fragment>
      <Head title="Lectures Today"></Head>
      <Content>
        {hasError ? (
          <h1>Server Error</h1>
        ) : (
          <>
            <BlockHead size="sm">
              <BlockBetween>
                <BlockHeadContent>
                  <BlockTitle page>Lectures</BlockTitle>
                  <BlockDes className="text-soft">
                    <p>Schools</p>
                  </BlockDes>
                </BlockHeadContent>
                <BlockHeadContent>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="primary" className="btn-icon">
                        <Icon name="plus"></Icon>
                      </Button>
                    </li>
                  </ul>
                </BlockHeadContent>
              </BlockBetween>
            </BlockHead>
            <TabExample />{" "}
          </>
        )}
      </Content>
    </React.Fragment>
  );
};
export default InvoiceList;
