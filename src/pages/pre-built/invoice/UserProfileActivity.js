import React, { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink, Progress, Card, CardTitle, CardText, Row, Col } from "reactstrap";
import {
  OverlineTitle,
  Block,
  PreviewAltCard,
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
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { findUpper } from "../../../utils/Utils";
import studentApi from "../../../api/studentApi";

//import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";

const DataTableData = [
  {
    id: 1,
    name: "Darlington",
    role: "Class Rep",
    course: "bcs",
  },
  {
    id: 2,
    name: "Tasha",
    role: "Student",
    course: "BIT",
  },
];

const dataTableColumns = [
  {
    name: "id",
    selector: (row) => row.id,
    // width: "100px",
    sortable: true,
  },
  {
    name: "User",
    selector: (row) => row.name,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.name)} image={row.image}></UserAvatar>
        <div className="user-info">
          <span className="tb-lead">
            {row.name}{" "}
            <span
              className={`dot dot-${
                row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
              } d-md-none ml-1`}
            ></span>
          </span>
          <span>{row.role}</span>
        </div>
      </div>
    ),
    sortable: true,
  },

  // {
  //   name: "Name",
  //   selector: (row) => row.name,
  //   sortable: true,
  //   hide: 370,
  //   cell: (row) => (
  //     <>
  //       <span
  //         style={{
  //           // backgroundColor: "red",
  //           textTransform: "capitalize",
  //         }}
  //       >
  //         {row.name}
  //       </span>
  //     </>
  //   ),
  // },
  // {
  //   name: "Role",
  //   selector: (row) => row.role,
  //   sortable: true,
  //   width: "100px",
  //   hide: "sm",
  // },
  {
    name: "course",
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
          {row.course}
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

const UserProfileActivityPage = ({ sm, updateSm, enrolledStudents }) => {
  const [activeTab, setActivetab] = useState("1");
  const studentDetails = useSelector((state) => state.student);

  const toggle = (tab) => {
    if (activeTab !== tab) setActivetab(tab);
  };

  return (
    <React.Fragment>
      {console.log("Enrolled students in target comp", enrolledStudents)}
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
            Enrolled Students
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
            Present
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "3" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("3");
            }}
          >
            Absent
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
            Rating
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

          {/* <LoginLogTable /> */}
          <div
            style={{
              width: "100%",
              // backgroundColor: "red",
              height: 200,
            }}
          >
            {/* <ReactDataTable data={DataTableData} columns={dataTableColumns} expandableRows pagination actions /> */}

            <ReactDataTable data={DataTableData} columns={dataTableColumns} pagination className="nk-tb-list" />
            {/* <DataTable
              // title="Movie List - First row expanded"
              style={{
                width: "100%",
                backgroundColor: "yellow",
              }}
              columns={dataTableColumns}
              data={DataTableData}
              expandableRows
              expandableRowExpanded={(row) => row.defaultExpanded}
              expandableRowsComponent={ExpandableRowComponent}
              pagination
            /> */}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <ReactDataTable data={DataTableData} columns={dataTableColumns} pagination className="nk-tb-list" />
        </TabPane>
        <TabPane tabId="3">
          <ReactDataTable data={DataTableData} columns={dataTableColumns} pagination className="nk-tb-list" />
        </TabPane>
        {/* <TabPane tabId="4">
          <p> Some text for tab 4 </p>
        </TabPane> */}

        <TabPane tabId="4">
          {/* <p> Some text for tab 1 </p> */}

          {/* <LoginLogTable /> */}
          <Row
            style={{
              // justifyContent: "center",
              // marginTop: "20px",
              // backgroundColor: "green",
              width: "100%",
            }}
          >
            <Col md="12">
              {/* <OverlineTitle className="preview-title">Lecture Rating</OverlineTitle> */}
              {/* <PreviewAltCard > */}
              <Card
                className={`card-bordered`}
                style={{
                  // backgroundColor: "red",
                  padding: "10px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    // width: "100%",
                    display: "flex",
                    // justifyContent: "center",
                    // alignSelf: "center",
                    // backgroundColor: "red",
                  }}
                >
                  <div className="progress-amount mr-4">
                    <h1 className="title">4.4</h1>
                    <ul className="rating">
                      <li>
                        <Icon name="star-fill"></Icon>
                      </li>
                      <li>
                        <Icon name="star-fill"></Icon>
                      </li>
                      <li>
                        <Icon name="star-fill"></Icon>
                      </li>
                      <li>
                        <Icon name="star-half-fill"></Icon>
                      </li>
                      <li>
                        <Icon name="star"></Icon>
                      </li>
                    </ul>
                    <span className="sub-text mt-1">
                      <Icon name="users-fill"></Icon> 47,860 Total
                    </span>
                  </div>
                  <div className="rating-progress-bar gy-1 w-100">
                    <div className="progress-rating">
                      <div className="progress-rating mr-2">5</div>
                      <Progress value={72} color="teal" className="progress-lg"></Progress>
                    </div>
                    <div className="progress-rating">
                      <div className="progress-rating mr-2">4</div>
                      <Progress value={58} color="success" className="progress-lg"></Progress>
                    </div>
                    <div className="progress-rating">
                      <div className="progress-rating mr-2">3</div>
                      <Progress value={34} color="info" className="progress-lg"></Progress>
                    </div>
                    <div className="progress-rating">
                      <div className="progress-rating mr-2">2</div>
                      <Progress value={18} color="warning" className="progress-lg"></Progress>
                    </div>
                    <div className="progress-rating">
                      <div className="progress-rating mr-2">1</div>
                      <Progress value={55} color="danger" className="progress-lg"></Progress>
                    </div>
                  </div>
                </div>
              </Card>
              {/* </PreviewAltCard> */}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};
export default UserProfileActivityPage;
