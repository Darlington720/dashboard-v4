import React, { useState, useEffect } from "react";
import Content from "../../src/layout/content/Content";
// import ActiveUser from "../components/partials/analytics/active-user/ActiveUser";
import OrderOverview from "../components/partials/crypto/order-overview/OrderOverview";
import UserActivity from "../components/partials/crypto/user-activity/UserActivity";
// import SalesOverview from "../components/partials/default/sales-overview/SalesOverview";
import AudienceOverview from "../components/partials/analytics/audience-overview/AudienceOverview";
// import TrafficChannel from "../components/partials/analytics/traffic-channel/Traffic";
import TrafficDougnut from "../components/partials/analytics/traffic-dougnut/TrafficDoughnut";
// import SessionDevice from "../components/partials/analytics/session-devices/SessionDevice";
import Head from "../../src/layout/head/Head";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import Calender from "../pages/app/calender/Calender";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
// import RatingWidgets from "../pages/components/widgets/RatingWidgets";
// import RatingWidgets from "./components/widgets/RatingWidgets";
// import "../../src/components/mystyles.css";
import {
  Block,
  BlockHead,
  BlockDes,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
  Icon,
  PreviewAltCard,
  // LineChartExample,
  // BackTo,
  BarChartExample,
  // PieChartExample,
  // DoughnutExample,
  // PolarExample,
} from "../components/Component";

import {
  barChartData,
  barChartMultiple,
  barChartDataTotalCourses2deTest,
  barChartMultipleTotalCoursesMissedAndTaught,
  barChartDataTotalAccessTest,
  barChartStacked,
  // filledLineChart,
  solidLineChart,
  straightLineChart,
  doughnutChartData,
  polarChartData,
} from "./ChartData";
import {
  Card,
  Col,
  Row,
  Collapse,
  Button,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import AppCard from "../components/mycards/AppCard";
import {
  analyticOvData,
  analyticAuData,
  worldMap,
  analyticOvDataSet2,
  analyticOvDataSet3,
  TrafficChannelDoughnutData,
  TrafficChannelDoughnutData2,
  TrafficChannelDoughnutData3,
  TrafficChannelDoughnutData4,
  deviceStatusData,
  deviceStatusDataSet2,
  deviceStatusDataSet3,
  deviceStatusDataSet4,
} from "./AnalyticsData";
import stuImg from "../../src/assets/images/stu.png";
import visitorImg from "../../src/assets/images/ntsw.png";
import staffImg from "../../src/assets/images/nts.png";
import ntsImg from "../../src/assets/images/staff.png";

import studentApi from "../api/studentApi";
import staffApi from "../api/staffApi";
import visitorsApi from "../api/visitorsApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actions from "../redux/actions/Actions";

// import {
//   barChartData,
// barChartMultiple,
//   barChartStacked,
//   filledLineChart,
//   solidLineChart,
//   straightLineChart,
//   doughnutChartData,
//   polarChartData,
// } from "./components/charts/ChartData";

export const TCDoughnut = ({ state, className }) => {
  const [data, setData] = useState(TrafficChannelDoughnutData);
  // useEffect(() => {
  //   if (state === "7") {
  //     setData(TrafficChannelDoughnutData2);
  //   } else if (state === "15") {
  //     setData(TrafficChannelDoughnutData3);
  //   } else {
  //     setData(TrafficChannelDoughnutData4);
  //   }
  // }, [state]);
  return (
    <Doughnut
      className={className}
      data={data}
      options={{
        legend: {
          display: false,
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          backgroundColor: "#fff",
          borderColor: "#eff6ff",
          borderWidth: 2,
          titleFontSize: 13,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
      }}
    ></Doughnut>
  );
};

const LineChartExample = ({ data, legend }) => {
  return (
    <Line
      className="line-chart"
      data={data}
      options={{
        legend: {
          display: legend,
          labels: {
            boxWidth: 12,
            padding: 20,
            fontColor: "#6783b8",
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          backgroundColor: "#eff6ff",
          titleFontSize: 13,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 10,
              },
              gridLines: {
                tickMarkLength: 0,
              },
            },
          ],
          xAxes: [
            {
              display: true,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 5,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 10,
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    />
  );
};

const PieChartExample = ({ data }) => {
  return (
    <Pie
      data={data}
      options={{
        legend: {
          display: false,
        },
        rotation: -0.2,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          backgroundColor: "#eff6ff",
          titleFontSize: 13,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
      }}
    />
  );
};

const schools = ["SBA", "SCI", "SLAW", "SCOS", "SOSS", "SCIAD", "SEDU"];

const ChartWidgets = () => {
  const [collapse3, setCollapse3] = useState(false);
  const [sessionDevice, setSessionDevices] = useState("30");
  const [schoolChosen, setSchoolChosen] = useState("SCI");
  const [studentsPerSchool, setStudentssPerSchool] = useState("Today");
  const [chartData, setChartData] = useState([]);
  const [students2de, setStudents2de] = useState(0);
  const [staff2de, setStaff2de] = useState(0);
  const [visitors2de, setVisitors2de] = useState(0);
  const [allStudentsInCampus, setAllStudentsInCampus] = useState(0);
  const [allStaff, setAllStaff] = useState(0);

  //Number of lectures in various schools
  const [numOfLecturesInSBA2de, setNumOfLecturesInSBA2de] = useState(0);
  const [numOfLecturesInSCI2de, setNumOfLecturesInSCI2de] = useState(0);
  const [numOfLecturesInSCOS2de, setNumOfLecturesInSCOS2de] = useState(0);
  const [numOfLecturesInSOSS2de, setNumOfLecturesInSOSS2de] = useState(0);
  const [numOfLecturesInSLAW2de, setNumOfLecturesInSLAW2de] = useState(0);
  const [numOfLecturesInSCIAD2de, setNumOfLecturesInSCIAD2de] = useState(0);
  const [numOfLecturesInSEDU2de, setNumOfLecturesInSEDU2de] = useState(0);

  //Number of Students in various schools
  const [numOfStudentsInSBA2de, setNumOfStudentsInSBA2de] = useState(0);
  const [numOfStudentsInSCI2de, setNumOfStudentsInSCI2de] = useState(0);
  const [numOfStudentsInSCOS2de, setNumOfStudentsInSCOS2de] = useState(0);
  const [numOfStudentsInSOSS2de, setNumOfStudentsInSOSS2de] = useState(0);
  const [numOfStudentsInSLAW2de, setNumOfStudentsInSLAW2de] = useState(0);
  const [numOfStudentsInSCIAD2de, setNumOfStudentsInSCIAD2de] = useState(0);
  const [numOfStudentsInSEDU2de, setNumOfStudentsInSEDU2de] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getStudentsTotalPerSchool2de = async (school) => {
    const res = await staffApi.getstudentsTotalBySchool(school);

    if (!res.ok) {
      console.log(
        `Failed to load the total number of students in ${school} 2de`
      );
    }

    // setAllStudentsInCampus(res.data);
    // console.log("All students", res.data);

    if (school === "SBA") setNumOfStudentsInSBA2de(res.data);

    if (school === "SCOS") setNumOfStudentsInSCOS2de(res.data);

    if (school === "SCIAD") setNumOfStudentsInSCIAD2de(res.data);

    if (school === "SCI") setNumOfStudentsInSCI2de(res.data);

    if (school === "SLAW") setNumOfStudentsInSLAW2de(res.data);

    if (school === "SEDU") setNumOfStudentsInSEDU2de(res.data);

    if (school === "SOSS") setNumOfStudentsInSOSS2de(res.data);
  };

  const getnumOfTodaysLectures = async (school) => {
    const res = await staffApi.getnumOfTodaysLectures(school);

    if (!res.ok) {
      console.log(`Failed to load all lectures in ${school} today`);
    }

    // setNumOfLecturesInSBA2de(res.data);
    // console.log("All Lectures in SBA", res.data);
    if (school === "SBA") setNumOfLecturesInSBA2de(res.data);

    if (school === "SCOS") setNumOfLecturesInSCOS2de(res.data);

    if (school === "SCIAD") setNumOfLecturesInSCIAD2de(res.data);

    if (school === "SCI") setNumOfLecturesInSCI2de(res.data);

    if (school === "SLAW") setNumOfLecturesInSLAW2de(res.data);

    if (school === "SEDU") setNumOfLecturesInSEDU2de(res.data);

    if (school === "SOSS") setNumOfLecturesInSOSS2de(res.data);
    // return res.data;
  };

  const getNumOfAllStudents = async () => {
    const res = await studentApi.getNumAllStudents();

    if (!res.ok) {
      console.log("Failed to load all students in the university");
    }

    setAllStudentsInCampus(res.data);
    console.log("All students", res.data);
  };

  const getNumOfAllStaff = async () => {
    const res = await staffApi.getNumAllStaff();

    if (!res.ok) {
      console.log("Failed to load all staff Members of the university");
    }

    setAllStaff(res.data);
    console.log("All staff", res.data);
  };

  const getStudentsToday = async () => {
    const studentRes = await studentApi.getTotalStudentsToday();

    if (!studentRes.ok) {
      console.log("Failed to load the students that came in 2de");
    }

    console.log("Num of students 2de", studentRes.data);

    setStudents2de(studentRes.data);
  };

  const getStaffToday = async () => {
    const staffRes = await staffApi.numOfStaffToday();

    if (!staffRes.ok) {
      console.log("Failed to load the students that came in 2de");
    }

    console.log("Num of staff 2de", staffRes.data);

    setStaff2de(staffRes.data);
  };

  const getVisitorsToday = async () => {
    const visitorsRes = await visitorsApi.numOfVisitorsToday();

    if (!visitorsRes.ok) {
      console.log("Failed to load the students that came in 2de");
    }

    console.log("Num of staff 2de", visitorsRes.data);

    setVisitors2de(visitorsRes.data);
  };

  const getChartData = async () => {
    const res = await studentApi.getChartData();
    if (!res.ok) {
      console.log("Failed to get chart Data from the server");
    }

    // console.log("Chart data", res.data);

    setChartData(res.data);
  };

  useEffect(() => {
    getChartData();
    getStudentsToday();
    getStaffToday();
    getVisitorsToday();
    getNumOfAllStudents();
    getNumOfAllStaff();

    dispatch(actions.saveUser(JSON.parse(localStorage.getItem("accessToken"))));

    // getnumOfTodaysLectures("SBA");
    schools.forEach((school) => {
      getnumOfTodaysLectures(school);
      getStudentsTotalPerSchool2de(school);
    });
  }, []);

  const filledLineChart = {
    // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    dataUnit: "units",
    datasets: [
      {
        label: "Students",
        lineTension: 0.4,
        borderColor: "#798bff",
        backgroundColor: "rgba(121, 139, 255, 0.4)",
        pointBorderWidth: 2,
        pointBackgroundColor: "white",
        pointHoverRadius: 3,
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 3,
        fill: true,
        data: chartData,
      },
    ],
  };

  const barChartDataTotalAccess = {
    labels: ["Students", "Staff", "Visitor", "N T S"],
    dataUnit: "Members",
    datasets: [
      {
        label: "Total",
        backgroundColor: "#9cabff",
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        data: [
          allStudentsInCampus ? allStudentsInCampus : 0,
          allStaff ? allStaff : 0,
          visitors2de ? visitors2de : 500,
          100,
        ],
      },
    ],
  };

  const barChartDataTotalAccessPerDay = {
    labels: ["Students", "Staff", "Visitor", "N T S"],
    dataUnit: "Members",
    datasets: [
      {
        label: "Total",
        backgroundColor: "#9cabff",
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        data: [
          students2de ? students2de : 0,
          staff2de ? staff2de : 0,
          visitors2de ? visitors2de : 0,
          100,
        ],
      },
    ],
  };

  const barChartDataTotalCourses2de = {
    labels: ["SBA", "SCI", "SCIAD", "SOSS", "SLAW", "SCOS", "SEDU"],
    dataUnit: "Courses",
    datasets: [
      {
        label: "Lectures",
        backgroundColor: "#9cabff",
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        data: [
          numOfLecturesInSBA2de,
          numOfLecturesInSCI2de,
          numOfLecturesInSCIAD2de,
          numOfLecturesInSOSS2de,
          numOfLecturesInSLAW2de,
          numOfLecturesInSCOS2de,
          numOfLecturesInSEDU2de,
        ],
      },
    ],
  };

  const barChartDataTotalStudents2de = {
    labels: ["SBA", "SCI", "SCIAD", "SOSS", "SLAW", "SCOS", "SEDU"],
    dataUnit: "Courses",
    datasets: [
      {
        label: "Lectures",
        backgroundColor: "#9cabff",
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        data: [
          numOfStudentsInSBA2de ? numOfStudentsInSBA2de : 0,
          numOfStudentsInSCI2de ? numOfStudentsInSCI2de : 0,
          numOfStudentsInSCIAD2de ? numOfStudentsInSCIAD2de : 0,
          numOfStudentsInSOSS2de ? numOfStudentsInSOSS2de : 0,
          numOfStudentsInSLAW2de ? numOfStudentsInSLAW2de : 0,
          numOfStudentsInSCOS2de ? numOfStudentsInSLAW2de : 0,
          numOfStudentsInSEDU2de ? numOfStudentsInSLAW2de : 0,
        ],
      },
    ],
  };

  return (
    <React.Fragment>
      <Head title="Dashboard"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            {console.log("User loged in", user)}
            <BlockTitle tag="h5" className="fw-normal">
              Tredumo Dashboard
            </BlockTitle>
          </BlockHeadContent>
        </BlockHead>
        <Block>
          {/* <Block size="lg"> */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexGrow: "initial",
              flexDirection: "row",
              marginBottom: 10,
              // backgroundColor: "green",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <AppCard
              title="Todays Students"
              total={students2de ? students2de : 0}
              image={
                <img
                  src={stuImg}
                  style={{
                    width: "100%",
                    backgroundColor: "lightblue",
                    height: "100%",
                    borderRadius: "50%",
                    boxShadow: "1px 2px 9px #D3D3D3",
                    // backgroundColor: "red",
                  }}
                />
              }
            />
            <AppCard
              title="Todays Staff"
              total={staff2de ? staff2de : 0}
              image={
                <img
                  src={visitorImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#ffcccb",
                    borderRadius: "50%",
                    boxShadow: "1px 2px 9px #D3D3D3",
                    // backgroundColor: "red",
                  }}
                />
              }
            />
            <AppCard
              title="Todays Visitors"
              total={visitors2de ? visitors2de : 0}
              image={
                <img
                  src={visitorImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: "#ffcccb",
                    boxShadow: "1px 2px 9px #D3D3D3",
                    // backgroundColor: "red",
                  }}
                />
              }
            />
            <AppCard
              title="Todays N T S"
              total={0}
              image={
                <img
                  src={ntsImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "lightgray",
                    borderRadius: "50%",
                    boxShadow: "1px 2px 9px #D3D3D3",
                    // backgroundColor: "red",
                  }}
                />
              }
            />
          </div>

          <div
            style={{
              marginBottom: 10,
            }}
          >
            <Row className="g-gs">
              <Col md={4}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Total Access</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <BarChartExample data={barChartDataTotalAccess} />
                  </div>
                </PreviewCard>
              </Col>
              <Col md={4}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Per Day</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <BarChartExample data={barChartDataTotalAccessPerDay} />
                  </div>
                </PreviewCard>
              </Col>
              <Col md={4}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Per Week</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <BarChartExample data={barChartDataTotalAccessTest} />
                  </div>
                </PreviewCard>
              </Col>
              {/* <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Straight Chart</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <LineChartExample legend={false} data={straightLineChart} />
                  </div>
                </PreviewCard>
              </Col> */}
            </Row>
          </div>
          {/* </Block> */}

          {/* <Block size="lg"> */}
          {/* <BlockHead>
              <BlockHeadContent>
                <BlockTitle tag="h4">Filled Line Chart</BlockTitle>
                <BlockDes>
                  <p>Alternatively, you can use line chart with some background to display more visually.</p>
                </BlockDes>
              </BlockHeadContent>
            </BlockHead> */}
          <div
            style={{
              marginBottom: 10,
            }}
          >
            <Row className="g-gs">
              <Col md={6}>
                {/* <PreviewCard > */}
                <Card
                  className={`card-bordered`}
                  style={{
                    // backgroundColor: "red",
                    // display: "flex",
                    // justifyContent: "center",
                    padding: "10px",
                    // paddingTop: "10px",
                    // marginRight: 10,
                    // marginBottom: 10,
                    height: 260,
                    width: "100%",
                  }}
                >
                  <div className="card-head">
                    <h6
                      className="title"
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Students Per School - {studentsPerSchool}
                    </h6>
                    <UncontrolledDropdown>
                      <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
                        {studentsPerSchool}
                      </DropdownToggle>
                      <DropdownMenu right className=" dropdown-menu-xs">
                        <ul className="link-list-opt no-bdr">
                          <li
                            className={
                              studentsPerSchool === "Today" ? "active" : ""
                            }
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setStudentssPerSchool("Today");
                              }}
                            >
                              <span>Today</span>
                            </DropdownItem>
                          </li>
                          <li
                            className={
                              schoolChosen === "Yesterday" ? "active" : ""
                            }
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setStudentssPerSchool("Yesterday");
                              }}
                            >
                              <span>Yesterday</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div
                    className="nk-ck-sm"
                    // style={{
                    //   marginTop: 10,
                    //   // backgroundColor: "red",
                    // }}
                  >
                    {/* <LineChartExample legend={false} data={filledLineChart} /> */}
                    <BarChartExample data={barChartDataTotalStudents2de} />
                  </div>
                </Card>
                {/* </PreviewCard> */}
              </Col>
              <Col md={6}>
                <Card
                  className={`card-bordered`}
                  style={{
                    // backgroundColor: "red",
                    // display: "flex",
                    // justifyContent: "center",
                    padding: 20,
                    // paddingTop: "10px",
                    // marginRight: 10,
                    // marginBottom: 10,
                    height: 260,
                    width: "100%",
                  }}
                >
                  <div className="card-head">
                    <h6 className="title">Attendance - Weekly </h6>
                  </div>
                  <div className="nk-ck-sm">
                    <LineChartExample legend={false} data={filledLineChart} />
                  </div>
                </Card>
              </Col>
              {/* <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Straight Chart</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <LineChartExample legend={false} data={straightLineChart} />
                  </div>
                </PreviewCard>
              </Col> */}
            </Row>
          </div>

          <div
            style={{
              marginBottom: 10,
            }}
          >
            <Row className="g-gs">
              <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Total Courses Today</h6>
                  </div>
                  <div className="nk-ck-sm">
                    {/* <LineChartExample legend={false} data={filledLineChart} /> */}
                    <BarChartExample data={barChartDataTotalCourses2de} />
                  </div>
                </PreviewCard>
              </Col>
              <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">
                      Total Courses Taught Vs Missed - Today
                    </h6>
                  </div>
                  <div className="nk-ck-sm">
                    <BarChartExample
                      stacked
                      data={barChartMultipleTotalCoursesMissedAndTaught}
                    />
                  </div>
                </PreviewCard>
              </Col>
              {/* <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Straight Chart</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <LineChartExample legend={false} data={straightLineChart} />
                  </div>
                </PreviewCard>
              </Col> */}
            </Row>
          </div>

          <div
            style={{
              marginBottom: 10,
            }}
          >
            <Row className="g-gs">
              <Col md={6}>
                {/* <PreviewCard > */}
                <Card
                  className={`card-bordered`}
                  style={{
                    // backgroundColor: "red",
                    // display: "flex",
                    // justifyContent: "center",
                    padding: "10px",
                    // paddingTop: "10px",
                    // marginRight: 10,
                    // marginBottom: 10,
                    height: 290,
                    width: "100%",
                  }}
                >
                  <div className="card-head">
                    <h6
                      className="title"
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Most Absentees Per Week
                    </h6>
                  </div>
                  <div
                    className="nk-ck-sm"
                    style={{
                      marginTop: 10,
                      // backgroundColor: "red",
                    }}
                  >
                    {/* <LineChartExample legend={false} data={filledLineChart} /> */}
                    <BarChartExample data={barChartDataTotalCourses2deTest} />
                  </div>
                </Card>
                {/* </PreviewCard> */}
              </Col>
              {/* <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Total Courses Taught Vs Missed</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <BarChartExample stacked data={barChartMultipleTotalCoursesMissedAndTaught} />
                  </div>
                </PreviewCard>
              </Col> */}

              <Col
                md="6"
                style={{
                  height: "100%",
                  // backgroundColor: "green",
                }}
              >
                {/* <PreviewAltCard> */}
                <Card
                  className={`card-bordered`}
                  style={{
                    // backgroundColor: "red",
                    // display: "flex",
                    // justifyContent: "center",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    paddingRight: "10px",
                    // marginRight: 10,
                    // marginBottom: 10,
                    height: 290,
                    width: "100%",
                  }}
                >
                  {/* <SessionDevice /> */}

                  <div className="card-title-group">
                    <div className="card-title card-title-sm">
                      <h6 className="title">
                        Online Lectures Vs Physical Lectures
                      </h6>
                    </div>
                    <UncontrolledDropdown>
                      <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
                        {schoolChosen}
                      </DropdownToggle>
                      <DropdownMenu right className=" dropdown-menu-xs">
                        <ul className="link-list-opt no-bdr">
                          <li
                            className={schoolChosen === "SCI" ? "active" : ""}
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SCI");
                              }}
                            >
                              <span>SCI</span>
                            </DropdownItem>
                          </li>
                          <li
                            className={schoolChosen === "SBA" ? "active" : ""}
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SBA");
                              }}
                            >
                              <span>SBA</span>
                            </DropdownItem>
                          </li>
                          <li
                            className={schoolChosen === "SCIAD" ? "active" : ""}
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SCIAD");
                              }}
                            >
                              <span>SCIAD</span>
                            </DropdownItem>
                          </li>
                          <li
                            className={schoolChosen === "SCOS" ? "active" : ""}
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SCOS");
                              }}
                            >
                              <span>SCOS</span>
                            </DropdownItem>
                          </li>
                          <li
                            className={schoolChosen === "SOSS" ? "active" : ""}
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SOSS");
                              }}
                            >
                              <span>SOSS</span>
                            </DropdownItem>
                          </li>
                          <li
                            className={schoolChosen === "SLAW" ? "active" : ""}
                          >
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SLAW");
                              }}
                            >
                              <span>SLAW</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <div
                      className="device-status-ck"
                      style={
                        {
                          // backgroundColor: "red",
                        }
                      }
                    >
                      {/* <SessionDoughnut className="analytics-doughnut" state={sessionDevice} /> */}
                      <PieChartExample data={doughnutChartData} />
                      {/* <TCDoughnut className="analytics-doughnut" state={sessionDevice} /> */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: 10,
                        }}
                      >
                        {/* <Icon style={{ color: "#798bff" }} name="monitor"></Icon> */}
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: "rgba(156, 171, 255, 0.8)",
                          }}
                        ></div>
                        <div className="title">Online</div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <Icon style={{ color: "#baaeff" }} name="monitor"></Icon> */}
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: "rgba(244, 170, 164, 0.8)",
                          }}
                        ></div>
                        <div className="title">Physical</div>
                      </div>
                    </div>

                    <div
                      // className="device-status-group"
                      style={{
                        backgroundColor: "red",
                        // width: "100%",
                        display: "flex",
                        // justifyContent: "space-between",
                        // alignItems: "center",
                        // flexWrap: "wrap",
                        marginTop: 10,
                      }}
                    ></div>
                  </div>
                </Card>
                {/* </PreviewAltCard> */}
              </Col>
            </Row>
          </div>

          <div
          // style={{
          //   marginBottom: 20,
          // }}
          >
            <Row className="g-gs">
              <Col md={6}>
                <Card
                  className={`card-bordered`}
                  style={{
                    // backgroundColor: "red",
                    // display: "flex",
                    // justifyContent: "center",
                    padding: "10px",
                    // paddingTop: "10px",
                    // marginRight: 10,
                    // marginBottom: 10,
                    height: 290,
                    width: "100%",
                  }}
                >
                  <div className="card-head">
                    <h6 className="title">
                      Lectures - Weekly (Ended and Missed)
                    </h6>
                  </div>
                  <div className="nk-ck-sm">
                    <BarChartExample data={barChartMultiple} />
                  </div>
                </Card>
              </Col>
              {/* <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Total Courses Taught Vs Missed</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <BarChartExample stacked data={barChartMultipleTotalCoursesMissedAndTaught} />
                  </div>
                </PreviewCard>
              </Col> */}

              <Col
                md="6"
                style={{
                  height: "100%",
                  // backgroundColor: "green",
                }}
              >
                {/* <PreviewAltCard> */}
                <Card
                  className={`card-bordered`}
                  style={{
                    // backgroundColor: "red",
                    // display: "flex",
                    // justifyContent: "center",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    paddingRight: "10px",
                    // marginRight: 10,
                    // marginBottom: 10,
                    height: 290,
                    width: "100%",
                  }}
                >
                  {/* <SessionDevice /> */}

                  <div className="card-title-group">
                    <div className="card-title card-title-sm">
                      <h6 className="title">
                        Online Lectures Vs Physical Lectures
                      </h6>
                    </div>
                    {/* <UncontrolledDropdown>
                      <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
                        {schoolChosen}
                      </DropdownToggle>
                      <DropdownMenu right className=" dropdown-menu-xs">
                        <ul className="link-list-opt no-bdr">
                          <li className={schoolChosen === "SCI" ? "active" : ""}>
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SCI");
                              }}
                            >
                              <span>SCI</span>
                            </DropdownItem>
                          </li>
                          <li className={schoolChosen === "SBA" ? "active" : ""}>
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SBA");
                              }}
                            >
                              <span>SBA</span>
                            </DropdownItem>
                          </li>
                          <li className={schoolChosen === "SCIAD" ? "active" : ""}>
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SCIAD");
                              }}
                            >
                              <span>SCIAD</span>
                            </DropdownItem>
                          </li>
                          <li className={schoolChosen === "SCOS" ? "active" : ""}>
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SCOS");
                              }}
                            >
                              <span>SCOS</span>
                            </DropdownItem>
                          </li>
                          <li className={schoolChosen === "SOSS" ? "active" : ""}>
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SOSS");
                              }}
                            >
                              <span>SOSS</span>
                            </DropdownItem>
                          </li>
                          <li className={schoolChosen === "SLAW" ? "active" : ""}>
                            <DropdownItem
                              tag="a"
                              href="#dropdownitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setSchoolChosen("SLAW");
                              }}
                            >
                              <span>SLAW</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown> */}
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <div
                      className="device-status-ck"
                      style={
                        {
                          // backgroundColor: "red",
                        }
                      }
                    >
                      {/* <SessionDoughnut className="analytics-doughnut" state={sessionDevice} /> */}
                      <PieChartExample data={doughnutChartData} />
                      {/* <TCDoughnut className="analytics-doughnut" state={sessionDevice} /> */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: 20,
                        }}
                      >
                        {/* <Icon style={{ color: "#798bff" }} name="monitor"></Icon> */}
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: "rgba(156, 171, 255, 0.8)",
                          }}
                        ></div>
                        <div className="title">Online</div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <Icon style={{ color: "#baaeff" }} name="monitor"></Icon> */}
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: "rgba(244, 170, 164, 0.8)",
                          }}
                        ></div>
                        <div className="title">Physical</div>
                      </div>
                    </div>

                    <div
                      // className="device-status-group"
                      style={{
                        backgroundColor: "red",
                        // width: "100%",
                        display: "flex",
                        // justifyContent: "space-between",
                        // alignItems: "center",
                        // flexWrap: "wrap",
                        marginTop: 20,
                      }}
                    ></div>
                  </div>
                </Card>
                {/* </PreviewAltCard> */}
              </Col>
              {/* <Col md={6}>
                <PreviewCard>
                  <div className="card-head">
                    <h6 className="title">Straight Chart</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <LineChartExample legend={false} data={straightLineChart} />
                  </div>
                </PreviewCard>
              </Col> */}
            </Row>
          </div>

          {/* </PreviewCard> */}
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default ChartWidgets;
