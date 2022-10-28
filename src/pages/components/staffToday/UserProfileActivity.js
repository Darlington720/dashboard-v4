import React, { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink, Progress, Card, CardTitle, CardText, Row, Col } from "reactstrap";
import {
  OverlineTitle,
  Block,
  PreviewAltCard,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  UserAvatar,
  LoginLogTable,
  ReactDataTable,
  PreviewCard,
  Button,
} from "../../../components/Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { findUpper } from "../../../utils/Utils";
import studentApi from "../../../api/studentApi";
import { useDispatch } from "react-redux";
import actions from "../../../redux/actions/Actions";
import urls from "../../../api/apiConstants";

//import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";

const DataTableData2 = [
  {
    id: 1,
    name: "Database Management System",
    role: "7:00 AM- 8:00 AM",
    // role: "Class Rep",
    course: "ongoing",
  },
  // {
  //   id: 2,
  //   name: "Tasha",
  //   role: "Student",
  //   course: "BIT",
  // },
];

const DataTableData = [
  {
    id: 1,
    signin_date: "5/07/22",
    full_name: "Lubega Tasha",
    temperature: "34",
    studentNo: "200303004",
    signin_time: "8:00:45",
    signed_in_by: "Joel",
  },
];

const dataTableColumns = [
  {
    name: "Signin Time",
    selector: (row) => row.signin_time,
    // width: "100px",
    sortable: true,
  },
  {
    name: "Signin Gate",
    selector: (row) => row.signin_gate,
    sortable: true,
    hide: 370,
    cell: (row) => (
      <>
        <span
          style={{
            // backgroundColor: "red",
            textTransform: "capitalize",
          }}
        >
          {row.signin_gate}
        </span>
      </>
    ),
  },
  {
    name: "Temp",
    selector: (row) => row.temperature,
    sortable: true,
    width: "100px",
    hide: "sm",
  },
  {
    name: "signed in by",
    selector: (row) => row.signed_in_by,
    // width: "150px",
    sortable: true,
    hide: "sm",
    cell: (row) => (
      <>
        <span
          style={{
            // backgroundColor: "red",
            textTransform: "capitalize",
          }}
        >
          {row.signed_in_by}
        </span>
      </>
    ),
  },
  // {
  //   name: "signout time",
  //   selector: (row) => row.signout_time,
  //   sortable: true,
  //   hide: "md",
  // },
];

const ExpandableRowComponent = ({ data }) => {
  return (
    <ul className="dtr-details p-2 border-bottom ml-1">
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px",
          }}
        >
          <span className="dtr-title">Signout time:</span>
          <span className="dtr-data">{data.signout_time}</span>
        </div>
        <hr />
      </div>
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px ",
          }}
        >
          <span className="dtr-title">Signout Gate:</span>
          <span className="dtr-data">{data.signout_gate}</span>
        </div>
        <hr />
      </div>
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px ",
          }}
        >
          <span className="dtr-title">Signed Out By:</span>
          <span className="dtr-data">{data.signed_out_by}</span>
        </div>
        <hr />
      </div>

      {/* <li className="d-block d-sm-none">
        <span className="dtr-title">Company</span> <span className="dtr-data">{data.company}</span>
      </li>
      <li className="d-block d-sm-none">
        <span className="dtr-title ">Gender</span> <span className="dtr-data">{data.gender}</span>
      </li>
      <li>
        <span className="dtr-title">Start Date</span> <span className="dtr-data">{data.startDate}</span>
      </li>
      <li>
        <span className="dtr-title">Salary</span> <span className="dtr-data">{data.salary}</span>
      </li> */}
    </ul>
  );
};

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

const UserProfileActivityPage = ({ sm, updateSm, data, lectures }) => {
  const [activeTab, setActivetab] = useState("1");
  const studentDetails = useSelector((state) => state.student);
  const selectedRow = useSelector((state) => state.row);
  const [isLoading, setIsLoading] = useState(true);
  const [staffDetails, setStaffDetails] = useState([]);
  const dispatch = useDispatch();

  const dataTableColumns2 = [
    // {
    //   name: "id",
    //   selector: (row) => row.id,
    //   width: "80px",
    //   sortable: true,
    // },
    // {
    //   name: "User",
    //   selector: (row) => row.name,
    //   compact: true,
    //   grow: 2,
    //   style: { paddingRight: "20px" },
    //   cell: (row) => (
    //     <div className="user-card mt-2 mb-2">
    //       <UserAvatar theme={row.avatarBg} text={findUpper(row.name)} image={row.image}></UserAvatar>
    //       <div className="user-info">
    //         <span className="tb-lead">
    //           {row.name}{" "}
    //           <span
    //             className={`dot dot-${
    //               row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
    //             } d-md-none ml-1`}
    //           ></span>
    //         </span>
    //         <span>{row.role}</span>
    //       </div>
    //     </div>
    //   ),
    //   sortable: true,
    // },

    {
      name: "Course Unit",
      selector: (row) => row.course_unit_name,
      sortable: true,
      // width: "auto",
      hide: 370,
      // cell: (row) => (
      //   <>
      //     <span
      //       style={{
      //         // backgroundColor: "red",
      //         textTransform: "capitalize",
      //       }}
      //     >
      //       {row.course_unit_name}
      //     </span>
      //   </>
      // ),
    },
    {
      name: "Time",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => (
        <>
          <span
            style={{
              // backgroundColor: "red",
              textTransform: "capitalize",
            }}
          >
            {`${row.start_time}-${row.end_time}`}
          </span>
        </>
        // width: "100px",
      ),
      hide: "sm",
    },
    {
      name: "Status",
      selector: (row) => row.course,
      // width: "150px",
      sortable: true,
      hide: "sm",
      cell: (row) => (
        <>
          <span
            style={{
              // backgroundColor: "red",
              textTransform: "capitalize",
            }}
          >
            {row.status === "off" ? "Not Started" : "ongoing"}
          </span>
        </>
      ),
    },
    // {
    //   name: "signout time",
    //   selector: (row) => row.signout_time,
    //   sortable: true,
    //   hide: "md",
    // },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <div
            style={{
              // backgroundColor: "red",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Link to={`${process.env.PUBLIC_URL}/lecture-details`} className="edit-button" style={{ color: "black" }}>
              <FontAwesomeIcon
                icon={faEye}
                color="#000"
                size="lg"
                style={{
                  cursor: "pointer",
                }}
                // onClick={() => handleView(row)}
                onClick={() => {
                  console.log("row clicked", row);
                  dispatch(actions.getRowData(row));
                }}
              ></FontAwesomeIcon>
            </Link>
          </div>
        </>
      ),
    },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActivetab(tab);
  };

  return (
    <React.Fragment>
      {/* {console.log("Staff from activity", data)} */}
      {console.log("His lectures ", lectures)}
      <Head title="User List - Profile"></Head>
      <Nav tabs>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "1" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("1");
            }}
          >
            Attendence
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "2" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("2");
            }}
          >
            Lectures
          </NavLink>
        </NavItem>

        {/* <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "3" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("3");
            }}
          >
            Notifications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "4" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("4");
            }}
          >
            Connect
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {/* <p> Some text for tab 1 </p> */}
          <BlockHead size="lg">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h4">
                  {"Entrance Details for "}
                  <span
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {data ? `${data[0].title} ${data[0].staff_name}` : "Mr Male Vicent"}
                  </span>
                </BlockTitle>
                <BlockDes>
                  <p>
                    {new Date().toDateString()}
                    {""}
                    {/* <span className="text-soft">
                  <Icon name="info" />
                </span> */}
                  </p>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent className="align-self-start d-lg-none">
                <Button
                  className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          {/* <LoginLogTable /> */}
          <div
            style={{
              width: "100%",
              // backgroundColor: "red",
              height: 200,
            }}
          >
            {/* <ReactDataTable data={DataTableData} columns={dataTableColumns} expandableRows pagination actions /> */}

            <DataTable
              // title="Movie List - First row expanded"
              style={{
                width: "100%",
                backgroundColor: "yellow",
              }}
              columns={dataTableColumns}
              data={data}
              expandableRows
              expandableRowExpanded={(row) => row.defaultExpanded}
              expandableRowsComponent={ExpandableRowComponent}
              pagination
            />
          </div>
        </TabPane>
        <TabPane tabId="2">
          <BlockHead size="lg">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h4">
                  {"Lectures of "}
                  <span
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {`${data[0].title} ${data[0].staff_name}`}
                  </span>
                </BlockTitle>
                <BlockDes>
                  <p>
                    {new Date().toDateString()}
                    {""}
                    {/* <span className="text-soft">
                  <Icon name="info" />
                </span> */}
                  </p>
                </BlockDes>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <ReactDataTable data={lectures} columns={dataTableColumns2} pagination className="nk-tb-list" />
        </TabPane>
        {/* <TabPane tabId="3">
          <p> Some text for tab 3 </p>
        </TabPane>
        <TabPane tabId="4">
          <p> Some text for tab 4 </p>
        </TabPane> */}
      </TabContent>
    </React.Fragment>
  );
};
export default UserProfileActivityPage;
