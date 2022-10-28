import React, { useEffect, useState } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import studentApi from "../../../../api/studentApi";
import visitorsApi from "../../../../api/visitorsApi";
import staffApi from "../../../../api/staffApi";

const AudienceOverview = () => {
  const [auOverview, setAuOverview] = useState("month-1");
  const [numOfStudents2de, setNumOfStudents2de] = useState(0);
  const [totalNumOfStudents, setTotalNumOfStudents] = useState(0);
  const [numOfVisitors2de, setNumOfVisitors2de] = useState(0);
  const [numOfStaff2de, setNumOfStaff2de] = useState(0);
  const [totalNumOfStaff, setTotalNumOfStaff] = useState(0);

  const loadTotalStudentsToday = async () => {
    const res = await studentApi.getTotalStudentsToday();
    const res2 = await studentApi.getNumAllStudents();

    if (!res.ok || !res2.ok) {
      console.log("Failed to get the total number of students today");
    }

    // console.log("in campus", res.data);
    setNumOfStudents2de(res.data);
    console.log("Total", res2.data);
    setTotalNumOfStudents(res2.data);
  };

  const loadVisitors = async () => {
    const res = await visitorsApi.getVisitorsToday();

    if (!res.ok) {
      console.log("Failed to load visitors from the server");
    }

    // console.log(res.data.length);
    setNumOfVisitors2de(res.data.length);
  };

  const loadStaff = async () => {
    const staffRes = await staffApi.getAllStaffToday();
    const res2 = await staffApi.getNumAllStaff();
    if (!staffRes.ok) {
      console.log("Failed to load staff members");
    }

    if (!res2.ok) {
      console.log("Failed to load staff members today");
    }

    // console.log("Total Staff members", staffRes.data.length);
    setTotalNumOfStaff(res2.data);
    // console.log("Staff 2de", res2.data);
    setNumOfStaff2de(staffRes.data.length);
  };

  useEffect(() => {
    loadTotalStudentsToday();
    loadVisitors();
    loadStaff();
  }, []);
  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Tredumo Dashboard Analytics</h6>
          <p>The total number of Stakeholders at the Institution of Learning.</p>
        </div>
        <div className="card-tools shrink-0 d-none d-sm-block">
          <ul className="nav nav-switch-s2 nav-tabs bg-white">
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "day-7" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("day-7");
                }}
              >
                7 D
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "month-1" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("month-1");
                }}
              >
                1 M
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-3">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Students</div>
            <div className="amount">{auOverview === "month-1" ? numOfStudents2de : numOfStudents2de}</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon>{" "}
              {auOverview === "month-1"
                ? parseInt((numOfStudents2de / totalNumOfStudents) * 100)
                : parseInt((numOfStudents2de / totalNumOfStudents) * 100)}
              %
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Visitors</div>
            <div className="amount">{auOverview === "month-1" ? numOfVisitors2de : numOfStudents2de}</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon>{" "}
              {auOverview === "month-1"
                ? Math.round(numOfVisitors2de / 300) * 100
                : Math.round(numOfVisitors2de / 300) * 100}
              %
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Teaching Staff</div>
            <div className="amount">{auOverview === "month-1" ? numOfStaff2de : numOfStaff2de}</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon>{" "}
              {auOverview === "month-1"
                ? parseInt((numOfStaff2de / totalNumOfStaff) * 100)
                : parseInt((numOfStaff2de / totalNumOfStaff) * 100)}
              %
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Non-Teaching Staff</div>
            <div className="amount">{auOverview === "month-1" ? "0" : "0"}</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon> {auOverview === "month-1" ? "0.35" : "0.0"}%
            </div>
          </div>
        </div>
        <div className="analytic-ov-ck">
          <AudienceLineChart state={auOverview} />
        </div>
        <div className="chart-label-group ml-5">
          <div className="chart-label">01 Jan, 2020</div>
          <div className="chart-label d-none d-sm-block">{auOverview === "month-1" ? "15" : "4"} Jan, 2020</div>
          <div className="chart-label"> {auOverview === "month-1" ? "30" : "7"} Jan, 2020</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AudienceOverview;
