import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import staffApi from "../../../../api/staffApi";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import studentsApi from "../../../../api/studentApi";
// import { TCDoughnut } from "../../charts/analytics/AnalyticsCharts";

const TrafficDougnut = () => {
  const [traffic, setTraffic] = useState("30");
  const [statistics, setStatistics] = useState([]);
  const [totalNumOfStudents, setTotalNumOfStudents] = useState(0);
  const [totalSBAstudents, setTotalSBAstudents] = useState("0");
  const [totalSCIstudents, setTotalSCIstudents] = useState("0");
  const [totalSCIADstudents, setTotalSCIADstudents] = useState("0");
  const [totalSCOSstudents, setTotalSCOSstudents] = useState("0");
  const [totalSOSSstudents, setTotalSOSSstudents] = useState("0");

  var TrafficChannelDoughnutData = {
    labels: ["SCI", "SBA", "SCIAD", "SCOS"],
    dataUnit: "People",
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["#798bff", "#b8acff", "#ffa9ce", "#f9db7b"],
        data: [totalSCIstudents, totalSBAstudents, totalSCIADstudents, totalSCOSstudents],
      },
    ],
  };

  const loadTotalStudentsToday = async () => {
    // const res = await studentsApi.getTotalStudentsToday();
    const res2 = await studentsApi.getNumAllStudents();

    if (!res2.ok) {
      console.log("Failed to get the total number of students today");
    }

    // console.log("in campus", res.data);
    // setNumOfStudents2de(res.data);
    console.log("Total Num", res2.data);
    setTotalNumOfStudents(res2.data);
  };

  const TCDoughnut = ({ state, className }) => {
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

  const schools = ["SCI", "SOSS", "SBA", "SCOS", "SCIAD"];

  const loadTotalStudents = async () => {
    // const res = await studentApi.getTotalStudentsToday();
    const res2 = await studentsApi.getNumAllStudents();

    if (!res2.ok) {
      console.log("Failed to get the total number of students today");
    }

    // console.log("in campus", res.data);
    // setNumOfStudents2de(res.data);
    // console.log("Total", res2.data);

    setTotalNumOfStudents(res2.data);
  };

  const loadStudentsPerSchool = async () => {
    let data = [];
    schools.forEach(async (sch, i) => {
      const res = await studentsApi.getNumOfStudentsPerSchool(sch);

      if (!res.ok) {
        console.log("Failed to get students in ", sch);
      }

      data.push(...data, { sch: [sch, res.data] });
    });

    console.log("After data", data);
  };

  const getstudentsTotalBySchool = async (school) => {
    const res = await staffApi.getstudentsTotalBySchool(school);

    if (!res.ok) {
      console.log("Failed to get the required students from the server");
    }

    if (school == "SBA") {
      setTotalSBAstudents(res.data ? res.data : `0`);
    } else if (school === "SCI") {
      setTotalSCIstudents(res.data ? res.data : `0`);
    } else if (school === "SCIAD") {
      setTotalSCIADstudents(res.data ? res.data : `0`);
    } else if (school === "SCOS") {
      setTotalSCOSstudents(res.data ? res.data : `0`);
    } else if (school === "SOSS") {
      setTotalSOSSstudents(res.data ? res.data : `0`);
    }
    // console.log(school, res.data);
    // return res.data;
  };

  useEffect(() => {
    // loadStudentsPerSchool();
    loadTotalStudents();
    getstudentsTotalBySchool("SBA");
    getstudentsTotalBySchool("SCI");
    getstudentsTotalBySchool("SCIAD");
    getstudentsTotalBySchool("SOSS");
    getstudentsTotalBySchool("SCOS");
    loadTotalStudentsToday();
  }, []);
  return (
    <React.Fragment>
      {" "}
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Summary per Faculty or School</h6>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
            {traffic} Days
          </DropdownToggle>
          <DropdownMenu right className="dropdown-menu-xs">
            <ul className="link-list-opt no-bdr">
              <li className={traffic === "7" ? "active" : ""}>
                <DropdownItem
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setTraffic("7");
                  }}
                >
                  <span>7 Days</span>
                </DropdownItem>
              </li>
              <li className={traffic === "15" ? "active" : ""}>
                <DropdownItem
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setTraffic("15");
                  }}
                >
                  <span>15 Days</span>
                </DropdownItem>
              </li>
              <li className={traffic === "30" ? "active" : ""}>
                <DropdownItem
                  href="#dropdownitem"
                  onClick={(e) => {
                    e.preventDefault();
                    setTraffic("30");
                  }}
                >
                  <span>30 Days</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div className="traffic-channel">
        <div className="traffic-channel-doughnut-ck">
          <TCDoughnut state={traffic} className="analytics-doughnut"></TCDoughnut>
        </div>
        <div className="traffic-channel-group g-2">
          <div className="traffic-channel-data">
            <div className="title">
              <span className="dot dot-lg sq" style={{ background: "#798bff" }}></span>
              <span>SBA</span>
            </div>
            <div className="amount">
              {traffic === "7" ? totalSBAstudents : traffic === "15" ? totalSBAstudents : totalSBAstudents}{" "}
              <small>{parseInt(parseInt(totalSBAstudents) / parseInt(totalNumOfStudents)) * 100}%</small>
            </div>
          </div>
          <div className="traffic-channel-data">
            <div className="title">
              <span className="dot dot-lg sq" style={{ background: "#b8acff" }}></span>
              <span>SCI</span>
            </div>
            <div className="amount">
              {traffic === "7" ? totalSCIstudents : traffic === "15" ? totalSCIstudents : totalSCIstudents}{" "}
              <small>{parseInt(parseInt(totalSCIADstudents) / parseInt(totalNumOfStudents)) * 100}%</small>
            </div>
          </div>
          <div className="traffic-channel-data">
            <div className="title">
              <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
              <span>SCIAD</span>
            </div>
            <div className="amount">
              {traffic === "7"
                ? totalSCIADstudents === null
                  ? "0"
                  : totalSCIADstudents
                : traffic === "15"
                ? totalSCIADstudents
                : totalSCIADstudents}{" "}
              <small>{parseInt(parseInt(totalSBAstudents) / parseInt(totalNumOfStudents)) * 100}%</small>
            </div>
          </div>
          <div className="traffic-channel-data">
            <div className="title">
              <span className="dot dot-lg sq" style={{ background: "#f9db7b" }}></span>
              <span>SCOS</span>
            </div>
            <div className="amount">
              {traffic === "7" ? totalSCOSstudents : traffic === "15" ? totalSCOSstudents : totalSCOSstudents}{" "}
              <small>{parseInt(parseInt(totalSCOSstudents) / parseInt(totalNumOfStudents)) * 100}%</small>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default TrafficDougnut;
