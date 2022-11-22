import React, { useState, useEffect } from "react";
import overlayFactory from "react-bootstrap-table2-overlay";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import classnames from "classnames";
import Swal from "sweetalert2";
import {
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Card,
  Row,
  Col,
  Badge,
  FormGroup,
  DropdownItem,
  Input,
  Progress,
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
  RSelect,
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

// import UserProfileRegularPage from "./UserProfileRegular";
// import UserProfileSettingPage from "./UserProfileSetting";
// import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import { useSelector } from "react-redux";
import { UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import studentApi from "../../../api/studentApi";

const ModuleCard = ({
  moduleName,
  checked = false,
  finshed = false,
  exempted = false,
  onClick,
}) => {
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
              color:
                finshed && checked
                  ? "blue"
                  : checked
                  ? "#2dc071"
                  : exempted
                  ? "orange"
                  : "#bdbdbd",
            }}
          ></Icon>
        </div>
      </div>
    </Card>
  );
};
const InvoiceList = () => {
  const [data, setData] = useState(invoiceData);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("asc");
  const [activeTab, setActivetab] = useState("1");
  const [hasError, setHasError] = useState(false);
  const [todaysLectures, setTodaysLectures] = useState();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState();
  const [school, setSchool] = useState();
  const [studyTime, setStudyTime] = useState();
  const [studyTimes, setStudyTimes] = useState([]);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [studentNo, setStudentNo] = useState("");

  const selectedRow = useSelector((state) => state.row);
  const [modal, setModal] = useState(false);
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [profileName, setProfileName] = useState("Jude Lubega");
  const [hasLoadedImage, setHasLoadedImage] = useState(false);
  const [regData, setRegData] = useState();
  const [allStudentData, setAllStudentData] = useState();
  const [unitsLoading, setUnitsLoading] = useState(false);

  const [myModules, setMyModules] = useState();
  const [studentRegisteredModules, setStudentRegisteredModules] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActivetab(tab);
  };

  const getStudentsRegisteredModules = async (
    stu_no,
    study_yr,
    sem,
    progcode,
    progvsn
  ) => {
    setUnitsLoading(true);
    const res = await studentApi.getStudentRegisteredModules(
      stu_no,
      study_yr,
      sem,
      progcode,
      progvsn
    );

    const res2 = await studentApi.getMyRegisteredModules(stu_no);

    setUnitsLoading(false);

    if (!res.ok) {
      console.log("Failed to get students registered course units");
    }

    if (!res2.ok) {
      alert("Failed to get student registered modules");
    }

    setMyModules(res2.data);
    // console.log("req 2 data", res2.data);

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

  let total_paid = 0;
  let amount_to_be_paid = 0;
  let percentage = 0;
  let notYetEnrolled = false;
  let registrationStatus = "Not Enrolled for current semester";
  let current_yr;
  let current_sem;

  const loadStudentRegData = async (stu_no) => {
    setLoading(true);
    const res = await studentApi.getStudentRegData(stu_no);
    setLoading(false);

    if (!res.ok) {
      alert("Failed to get students reg data, check your internt connection");
    }

    console.log(res.data);
    setRegData(res.data.result.biodata);
    getStudentsRegisteredModules(
      res.data.result.biodata.stdno,
      res.data.result.biodata.study_yr,
      res.data.result.biodata.current_sem,
      res.data.result.biodata.progcode,
      res.data.result.biodata.progversion
    );
    setAllStudentData(res.data.result);
  };

  const test = () => {
    if (allStudentData) {
      if (allStudentData.invoices) {
        if (allStudentData.biodata) {
          current_yr = allStudentData.biodata.study_yr;
          current_sem = allStudentData.biodata.current_sem;
          registrationStatus = allStudentData.registration_status;

          allStudentData.invoices.forEach((invoice) => {
            if (invoice.study_yr == current_yr && invoice.sem == current_sem) {
              // console.log("Tasha's current year", current_yr);
              // console.log("Tasha's current sem", current_sem);
              // console.log("payment for ", invoice.narration);
              // if (
              //   invoice.narration == "Tuition" &&
              //   invoice.narration == "Functional"
              // ) {
              if (
                invoice.narration == "Tuition" ||
                invoice.narration == "Functional"
              ) {
                invoice.txns.forEach((txn) => {
                  total_paid += parseInt(txn.amount);

                  // console.log(`amount for ${invoice.narration}`, txn.amount);
                });
                if (invoice.credit_notes.length > 0) {
                  invoice.credit_notes.forEach((credit_note) => {
                    total_paid += parseInt(credit_note.allocated_amount);
                    // console.log(
                    //   "credit note ammoount",
                    //   credit_note.allocated_amount
                    // );
                  });
                }
                invoice.LineItems.forEach((lineItem) => {
                  amount_to_be_paid += parseInt(lineItem.unit_amount);
                  // console.log(
                  //   `Line Item ${lineItem.item_name} amount= ${lineItem.unit_amount}`
                  // );
                });
              }
              // }

              // if (invoice.LineItems.length > 0) {
              // }
            }
            // console.log("Paid So far", total_paid);
            // console.log("Amount to be paid ", amount_to_be_paid);
            var result = total_paid / amount_to_be_paid;
            percentage = result;
          });
        } else {
          notYetEnrolled = true;
          // console.log("Not yet enrolled for the semester");
          registrationStatus = "Not Registered";
        }
      } else {
        console.log("error", "jsdjsdgsdjg");
      }
    }
  };

  const schools = ["SBA", "SCI", "SCOS", "SOSS", "SLAW", "SCIAD"];

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

  useEffect(() => {
    // console.log("StudentInfo", studentInfo);
    // console.log("Registration status", studentInfo[0].registration_status);
  }, []);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <React.Fragment>
      {test()}
      <Head title="Lectures Today"></Head>
      <Content>
        {hasError ? (
          <h1>Server Error</h1>
        ) : (
          <>
            <BlockHead size="sm">
              <BlockBetween>
                <BlockHeadContent>
                  <BlockTitle page>Exam Exemptions</BlockTitle>
                  {/* <BlockDes className="text-soft">
                    <p>Schools</p>
                  </BlockDes> */}
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
            <PreviewCard>
              <Row
                className="gy-4"
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  justifyContent: "center",
                  display: "flex",
                  // backgroundColor: "red",
                }}
              >
                <div
                  style={{
                    width: 300,
                    marginRight: 10,
                  }}
                >
                  <FormGroup>
                    {/* <Label htmlFor="default-0" className="form-label">
                    {"Select Invigilator"}
                  </Label> */}
                    <div className="form-group">
                      {/* <label className="form-label">Select Year</label> */}
                      <Input
                        style={{
                          fontWeight: "bold",
                        }}
                        value={studentNo}
                        onChange={(e) => setStudentNo(e.target.value)}
                        placeholder="Type student Number"
                        // options={years}
                        // // isMulti
                        // maxMenuHeight={200}
                        // value={year}
                        // onChange={(value) => setYear(value)}
                      />
                    </div>
                  </FormGroup>
                </div>
                <div>
                  <Button
                    color="primary"
                    onClick={() => {
                      console.log("student no to submit", studentNo);
                      loadStudentRegData(studentNo);
                    }}
                  >
                    Search
                  </Button>
                </div>
              </Row>
              <hr />

              {loading ? (
                <div>
                  <h2
                    style={{
                      textAlign: "center",
                    }}
                  >
                    LOADING...
                  </h2>
                </div>
              ) : !loading && regData ? (
                <Card className="card-bordered">
                  <div className="card-aside-wrap">
                    <div
                      className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                        sm ? "content-active" : ""
                      }`}
                    >
                      <div
                        style={{
                          backgroundColor: allStudentData
                            ? allStudentData.registration_status ==
                              "Not Registered"
                              ? "red"
                              : allStudentData.registration_status ==
                                "Provisionally Registered"
                              ? "green"
                              : allStudentData.registration_status ==
                                "Registered"
                              ? "blue"
                              : "yellow"
                            : "yellow",
                          height: 100,
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: -50,
                        }}
                      >
                        {loading ? (
                          <UserAvatar
                            text={findUpper(profileName)}
                            // theme="primary"
                            size="xl"
                            // image={
                            //   hasLoadedImage
                            //     ? `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${
                            //         studentDetails ? studentDetails[0].stdno : "2000101041"
                            //       }`
                            //     : ""
                            // }
                            style={{
                              width: 100,
                              height: 100,
                              backgroundColor: "lightgray",
                            }}
                          >
                            {/* <div className="status dot dot-lg dot-success"></div> */}
                          </UserAvatar>
                        ) : (
                          <UserAvatar
                            text={findUpper(profileName)}
                            // theme="primary"
                            size="xl"
                            image={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${
                              regData ? regData.stdno : "2000101041"
                            }`}
                            style={{
                              width: 100,
                              height: 100,
                              backgroundColor: "lightgray",
                            }}
                          >
                            {/* <div className="status dot dot-lg dot-success"></div> */}
                          </UserAvatar>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 18,
                            // fontWeight: "bold",
                          }}
                        >
                          {regData ? regData.name : "AKAMPEREZA DARLINGTON"}
                        </span>
                        <span
                          style={{
                            fontSize: 16,
                            // fontWeight: "bold",
                            opacity: 0.5,
                          }}
                        >
                          {regData ? regData.regno : "2021/FEB/BCS/B227811/DAY"}
                        </span>
                        <span
                          style={{
                            fontSize: 16,
                            // fontWeight: "bold",
                            opacity: 0.5,
                          }}
                        >
                          {regData ? regData.stdno : "2000101041"}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            // fontWeight: "bold",
                            opacity: 0.5,
                          }}
                        >
                          {regData
                            ? regData.progtitle
                            : "BACHELOR OF SCIENCE IN COMPUTER SCIENCE"}
                        </span>

                        <div
                          style={{
                            width: "80%",
                          }}
                        >
                          <div
                            className="text-center"
                            style={{
                              fontSize: 20,
                            }}
                          >
                            {parseInt(percentage * 100)}%
                          </div>
                          <Progress
                            striped
                            color="success"
                            value={`${parseInt(percentage * 100)}`}
                          />
                        </div>
                      </div>

                      <Row
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      >
                        <Col>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 20,
                              }}
                            >
                              {regData ? regData.study_yr : "2"}
                            </span>
                            <span
                              style={{
                                opacity: 0.5,
                              }}
                            >
                              Year
                            </span>
                          </div>
                        </Col>

                        <Col>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 20,
                              }}
                            >
                              {regData ? regData.study_time : "DAY"}
                            </span>
                            <span
                              style={{
                                opacity: 0.5,
                              }}
                            >
                              Study Time
                            </span>
                          </div>
                        </Col>

                        <Col>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 20,
                              }}
                            >
                              {regData ? regData.current_sem : "2"}
                            </span>
                            <span
                              style={{
                                opacity: 0.5,
                              }}
                            >
                              Semester
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <div
                        style={{
                          backgroundColor: "black",
                          height: 1,
                          width: "100%",
                          opacity: 0.1,
                          marginBottom: 10,
                        }}
                      ></div>

                      <div
                        style={{
                          padding: 10,
                        }}
                      >
                        {/* <div style={{ display: "flex", alignItems: "center",}}>
              <span style={{ width: "40%" }}>Status</span>
              <span style={{ width: "2%" }}>:</span>
              <span style={{ width: "58%", fontWeight: "bold", fontSize: 10 }}>Ongoing</span>
            </div> */}

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            Reg Status
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              width: "58%",
                            }}
                          >
                            {allStudentData
                              ? allStudentData.registration_status
                              : "Non resident"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            Campus
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              width: "58%",
                            }}
                          >
                            {regData ? regData.campus : "MAIN"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            Intake
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              width: "58%",
                            }}
                          >
                            {regData ? regData.intake : "February"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            Entry ac yr
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              width: "58%",
                            }}
                          >
                            {regData ? regData.entry_ac_yr : "2020/2021"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            School
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              width: "58%",
                            }}
                          >
                            {regData
                              ? regData.facultytitle
                              : "SCHOOL OF COMPUTING AND INFORMATICS"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            Residence
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              width: "58%",
                            }}
                          >
                            {regData
                              ? regData.residence_status
                              : "NON-RESIDENT"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            Nationality
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              width: "58%",
                            }}
                          >
                            {regData ? regData.nationality : "UGANDAN"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              width: "40%",
                            }}
                          >
                            Sponsorship
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              width: "58%",
                            }}
                          >
                            {regData ? regData.sponsorship : "PRIVATE"}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {/* <a
              href="http://google.com"
              style={{
                textAlign: "center",
              }}
            > */}

                        {/* </a> */}

                        {/* <Button color="primary" onClick={toggleModal}>
              Modal Default
            </Button> */}
                      </div>
                    </div>
                    <div className="card-inner card-inner-lg">
                      {sm && mobileView && (
                        <div
                          className="toggle-overlay"
                          onClick={() => updateSm(!sm)}
                        ></div>
                      )}

                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            tag="a"
                            href="#tab"
                            className={classnames({
                              active: activeTab === "1",
                            })}
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
                              {unitsLoading ? (
                                <div>
                                  <h2
                                    style={{
                                      textAlign: "center",
                                    }}
                                  >
                                    LOADING...
                                  </h2>
                                </div>
                              ) : studentRegisteredModules.length == 0 &&
                                !unitsLoading ? (
                                <span
                                  style={{
                                    textAlign: "center",
                                    // fontFamily: "poppins",
                                    fontSize: 18,
                                    textTransform: "capitalize",
                                  }}
                                >{`${regData.name} has not enrolled in any course units yet`}</span>
                              ) : (
                                studentRegisteredModules.map(
                                  (myModule, index) => {
                                    // if (m.module_code == myModule.module_code) {
                                    // }
                                    return (
                                      <div key={index}>
                                        <ModuleCard
                                          moduleName={myModule.module_title}
                                          checked={myModule.time_in}
                                          finshed={myModule.time_handin}
                                          exempted={myModule.exemption_status}
                                          onClick={() => {
                                            console.log(myModule);
                                            if (
                                              myModule.time_in &&
                                              myModule.time_handin
                                            ) {
                                              // alert("Am seeing a different screen");
                                              // setConfirmAlert(!confirmAlert);
                                              Swal.fire({
                                                icon: "info",
                                                title: "Ended",
                                                text: "Course unit is already done",
                                                focusConfirm: false,
                                              });
                                            } else if (
                                              myModule.time_in &&
                                              myModule.time_handin == null
                                            ) {
                                              // alert("Time to request for the booklet");
                                              // showDialog();
                                              // loadStudentRegBooklets(myModule.cunit_reg_id);
                                              // toggleBookletModal();
                                              Swal.fire({
                                                icon: "info",
                                                title: "Started",
                                                text: "Course unit in progress",
                                                focusConfirm: false,
                                              });
                                            } else if (
                                              myModule.exemption_status
                                            ) {
                                              Swal.fire({
                                                icon: "info",
                                                title: "Already Exempted",
                                                text: "Course unit is allowed to be done",
                                                focusConfirm: false,
                                              });
                                            } else {
                                              Swal.fire({
                                                title: "Are you sure?",
                                                text: `You want to allow ${regData.name} to sit for ${myModule.module_title}`,
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonText: "Yes",
                                              }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                  const dataToBeSent = {
                                                    stuNo: regData.stdno,
                                                    courseCode:
                                                      myModule.module_code,
                                                    courseName:
                                                      myModule.module_title,
                                                    exemptionStatus: 1,
                                                  };

                                                  const res =
                                                    await studentApi.saveExemption(
                                                      dataToBeSent
                                                    );

                                                  if (!res.ok) {
                                                    alert(
                                                      "Failed to save exemption, please check your internet connection"
                                                    );
                                                  }

                                                  if (res.data) {
                                                    Swal.fire(
                                                      "Allowed",
                                                      `${regData.name} can now sit for ${myModule.module_title}`,
                                                      "success"
                                                    );
                                                    getStudentsRegisteredModules(
                                                      regData.stdno,
                                                      regData.study_yr,
                                                      regData.current_sem,
                                                      regData.progcode,
                                                      regData.progversion
                                                    );
                                                  }
                                                  // console.log(
                                                  //   "Sending the data ",
                                                  //   dataToBeSent
                                                  // );
                                                }
                                              });
                                            }
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )
                              )}
                              {/* {studentRegisteredModules.length == 0 &&
                                !unitsLoading && (
                                  <span
                                    style={{
                                      textAlign: "center",
                                      // fontFamily: "poppins",
                                      fontSize: 18,
                                      textTransform: "capitalize",
                                    }}
                                  >{`${regData.name} has not enrolled in any course units yet`}</span>
                                )} */}

                              {/* {studentRegisteredModules.map(
                                (myModule, index) => {
                                  // if (m.module_code == myModule.module_code) {
                                  // }
                                  return (
                                    <div key={index}>
                                      <ModuleCard
                                        moduleName={myModule.module_title}
                                        onClick={() => console.log(myModule)}
                                      />
                       
                                    </div>
                                  );
                                }
                              )} */}
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
                      {/* <UserProfileActivityPage
                        updateSm={updateSm}
                        sm={sm}
                        biodata={regData ? regData : null}
                      /> */}
                    </div>
                  </div>
                </Card>
              ) : null}

              {/* ) : (
          <h2
            style={{
              textAlign: "center",
            }}
          >
            LOADING
          </h2>
        ) */}

              {/* } */}
            </PreviewCard>
            {/* <TabExample />{" "} */}
          </>
        )}
      </Content>
    </React.Fragment>
  );
};
export default InvoiceList;
