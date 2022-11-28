import React, { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
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
import studentsApi from "../../../api/studentApi";

//import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";

const ModuleCard = ({ moduleName, status, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className={`card-bordered`}
      style={{
        // backgroundColor: "red",
        padding: "10px",
        width: "100%",
        marginBottom: 10,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          // width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // alignSelf: "center",
          // backgroundColor: "red",
        }}
      >
        <div>
          <span
            style={{
              width: "90%",
            }}
          >
            {moduleName}
          </span>
        </div>

        <div>
          {/* <Icon
          name="check-circle"
          style={{
            fontSize: 25,
          }}
        ></Icon> */}
          <Icon
            name="check-circle-fill"
            style={{
              fontSize: 25,
              color: "blue",
            }}
          ></Icon>
        </div>
      </div>
    </Card>
  );
};

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
        <UserAvatar
          theme={row.avatarBg}
          text={findUpper(row.name)}
          image={row.image}
        ></UserAvatar>
        <div className="user-info">
          <span className="tb-lead">
            {row.name}{" "}
            <span
              className={`dot dot-${
                row.status === "Active"
                  ? "success"
                  : row.status === "Pending"
                  ? "warning"
                  : "danger"
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

const UserProfileActivityPage = ({ biodata }) => {
  const [activeTab, setActivetab] = useState("1");
  const studentDetails = useSelector((state) => state.student);
  const [loading, setLoading] = useState(false);
  const [myModules, setMyModules] = useState();
  const [studentRegisteredModules, setStudentRegisteredModules] = useState([]);

  const getStudentsRegisteredModules = async (
    stu_no,
    study_yr,
    sem,
    progcode,
    progvsn
  ) => {
    setLoading(true);
    const res = await studentsApi.getStudentRegisteredModules(
      stu_no,
      study_yr,
      sem,
      progcode,
      progvsn
    );

    const res2 = await studentsApi.getMyRegisteredModules(biodata.stdno);

    setLoading(false);

    if (!res.ok) {
      console.log("Failed to get students registered course units");
    }

    if (!res2.ok) {
      alert("Failed to get student registered modules");
    }

    setMyModules(res2.data);

    if (!res.data.result.success) {
      alert("Sytem error, please try again later");
    }

    let myCourseUnits = [];

    if (res.data.result.data) {
      res.data.result.data.map((module) => {
        if (module.selected) {
          myCourseUnits.push(module);
          // res2.data.forEach((m) => {
          //   if (m.module_code == module.module_code) {
          //     myCourseUnits.push(m);
          //   } else {
          //     myCourseUnits.push(module);
          //   }
          // });

          // myCourseUnits.forEach((m2) => {
          //   if (m2.module_code != module.module_code) {
          //     myCourseUnits.push(module);
          //   }
          // });
        }
      });
    }

    // var module_codes = new Set(
    //   res.data.result.data.map(
    //     (module) => module.module_code && module.selected
    //   )
    // );
    // var merged = [
    //   ...res.data.result.data,
    //   ...res2.data.filter((d) => !module_codes.has(d.module_code)),
    // ];

    for (var i = 0, l = myCourseUnits.length; i < l; i++) {
      for (var j = 0, ll = res2.data.length; j < ll; j++) {
        if (myCourseUnits[i].module_code === res2.data[j].module_code) {
          myCourseUnits.splice(i, 1, res2.data[j]);
          break;
        }
      }
    }

    console.log("My selected modules", myCourseUnits);
    setStudentRegisteredModules(myCourseUnits);
  };

  useEffect(() => {
    // console.log("StudentInfo", studentInfo);
    // console.log("Registration status", studentInfo[0].registration_status);
    getStudentsRegisteredModules(
      biodata.stdno,
      biodata.study_yr,
      biodata.current_sem,
      biodata.progcode,
      biodata.progversion
    );
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActivetab(tab);
  };

  return (
    <React.Fragment>
      {/* {console.log("My modules", studentRegisteredModules)} */}
      {/* {console.log("Enrolled students in target comp", enrolledStudents)} */}
      <Head title="User List - Profile"></Head>
      <Nav tabs>
        {/* <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "1" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("1");
            }}
          >
            Course Units Enrolled
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
        </NavItem> */}

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
            Enrolled Course Units
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

              {studentRegisteredModules.length == 0 && !loading && (
                <span
                  style={{
                    textAlign: "center",
                    // fontFamily: "poppins",
                    fontSize: 18,
                    textTransform: "capitalize",
                  }}
                >{`${biodata.name} has not enrolled in any course units yet`}</span>
              )}

              {studentRegisteredModules.map((myModule, index) => {
                // if (m.module_code == myModule.module_code) {
                // }
                return (
                  <div key={index}>
                    <ModuleCard
                      moduleName={myModule.module_title}
                      onClick={() => console.log(myModule)}
                    />
                    {/* <CourseUnitCard
                  courseUnitName={myModule.module_title}
                  checked={myModule.time_in}
                  finshed={myModule.time_handin}
                  // finshed={m.time_out !== null && booklet_no !== null}
                  onPress={() => {
                    console.log("Clicked ", myModule);
                    setSelectedModule(myModule);
                    if (myModule.time_in && myModule.time_handin) {
                      // alert("Am seeing a different screen");
                      setConfirmAlert(!confirmAlert);
                    } else if (
                      myModule.time_in &&
                      myModule.time_handin == null
                    ) {
                      // alert("Time to request for the booklet");
                      // showDialog();
                      loadStudentRegBooklets(myModule.cunit_reg_id);
                      toggleBookletModal();
                    } else {
                      Alert.alert(
                        `${myModule.module_title}`,
                        `Are you sure ${studentInfo[0].biodata.name} has come to sit for this course unit??`,
                        [
                          {
                            text: "Yes",
                            onPress: () => handleSaveModule(myModule),
                            // style: "cancel",
                          },
                          {
                            text: "No",
                            onPress: () => Alert.alert("Clicked No"),
                            // style: "cancel",
                          },
                        ],
                        {
                          cancelable: true,
                          // onDismiss: () =>
                          //   Alert.alert(
                          //     "This alert was dismissed by tapping outside of the alert dialog."
                          //   ),
                        }
                      );
                    }
                  }}
                /> */}
                  </div>
                );
              })}
              {/* <ModuleCard
                moduleName={"Modelling and simulation"}
                onClick={() => console.log("Model")}
              /> */}
              {/* <ModuleCard moduleName={"Computer Graphics"} />
              <ModuleCard moduleName={"Servey of programming languages"} /> */}
              {/* </PreviewAltCard> */}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};
export default UserProfileActivityPage;
