import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";

import UserProfileActivityPage from "./UserProfileActivity";
import { Route, Switch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon, UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";

//import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { Card } from "reactstrap";
const UserProfileLayout = () => {
  const studentDetails = useSelector((state) => state.student);
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [activeTab, setActivetab] = useState("1");
  const [profileName, setProfileName] = useState("Abu Bin Ishtiak");
  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  useEffect(() => {
    setHasLoadedImage(true);
    // studentDetails.then((data) => setStudentRequired(data));
  }, []);

  const toggle = () => {
    setActivetab(!activeTab);
  };

  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document
      .getElementsByClassName("nk-header")[0]
      .addEventListener("click", function () {
        updateSm(false);
      });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  return (
    <React.Fragment>
      <Content>
        {console.log("student Required", studentDetails)}
        {studentDetails ? (
          <Card className="card-bordered">
            <div className="card-aside-wrap">
              <div
                className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                  sm ? "content-active" : ""
                }`}
              >
                <div className="card-inner-group">
                  <div className="card-inner">
                    <div
                      className="user-card"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div>
                        <UserAvatar
                          text={findUpper(profileName)}
                          // theme="primary"
                          size="xl"
                          image={
                            hasLoadedImage
                              ? `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${
                                  studentDetails
                                    ? studentDetails[0].stdno
                                    : "2000101041"
                                }`
                              : ""
                          }
                          style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "lightgray",
                          }}
                        >
                          <div className="status dot dot-lg dot-success"></div>
                        </UserAvatar>
                      </div>
                      <div
                        // className="user-info"
                        style={{
                          // backgroundColor: "red",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {/* <span className="lead-text">{profileName}</span> */}
                        <span
                          className="lead-text"
                          style={{
                            fontSize: 20,
                            textTransform: "uppercase",
                            textAlign: "center",
                          }}
                        >
                          {studentDetails[0]
                            ? studentDetails[0].name
                            : "Akampa Darlington"}
                        </span>

                        <span
                          className="sub-text"
                          style={{
                            fontSize: 15,
                            textTransform: "uppercase",
                          }}
                        >
                          {studentDetails[0]
                            ? studentDetails[0].stdno
                            : "2000101041"}
                        </span>
                        <span
                          className="sub-text"
                          style={{
                            fontSize: 15,
                            textTransform: "uppercase",
                          }}
                        >
                          {studentDetails[0]
                            ? studentDetails[0].regno
                            : "2021/FEB/BCS/B223456/DAY"}
                        </span>
                      </div>
                      {/* <div className="user-action">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon btn-trigger mr-n2">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="camera-fill"></Icon>
                                <span>Change Photo</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="edit-fill"></Icon>
                                <span>Update Profile</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div> */}
                    </div>
                  </div>
                  {/* <div className="card-inner">
                  <div className="user-account-info py-0">
                    <h6 className="overline-title-alt">Nio Wallet Account</h6>
                    <div className="user-balance">
                      12.395769 <small className="currency currency-btc">BTC</small>
                    </div>
                    <div className="user-balance-sub">
                      Locked{" "}
                      <span>
                        0.344939 <span className="currency currency-btc">BTC</span>
                      </span>
                    </div>
                  </div>
                </div> */}
                  <div className="card-inner p-0">
                    <ul className="link-list-menu">
                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>School</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span
                          style={{
                            width: "58%",
                            fontWeight: "bold",
                            fontSize: 10,
                          }}
                        >
                          {studentDetails[0]
                            ? studentDetails[0].facultytitle
                            : "SCHOOL OF COMPUTING AND INFORMATICS"}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Course</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span
                          style={{
                            width: "58%",
                            fontWeight: "bold",
                            fontSize: 10,
                          }}
                        >
                          {studentDetails[0]
                            ? studentDetails[0].progtitle
                            : "BACHELOR OF SCIENCE IN COMPUTER SCIENCE"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Study Year</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span style={{ width: "58%", fontWeight: "bold" }}>
                          {studentDetails[0] ? studentDetails[0].study_yr : "2"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Semester</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span style={{ width: "58%", fontWeight: "bold" }}>
                          {studentDetails[0]
                            ? studentDetails[0].current_sem
                            : "2"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Study Time</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span style={{ width: "58%", fontWeight: "bold" }}>
                          {studentDetails[0]
                            ? studentDetails[0].study_time
                            : "DAY"}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Campus</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span style={{ width: "58%", fontWeight: "bold" }}>
                          {studentDetails[0]
                            ? studentDetails[0].campus
                            : "Main"}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Nationality</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span style={{ width: "58%", fontWeight: "bold" }}>
                          {studentDetails[0]
                            ? studentDetails[0].nationality
                            : "UGANDAN"}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Entry Ac Yr</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span style={{ width: "58%", fontWeight: "bold" }}>
                          {studentDetails[0]
                            ? studentDetails[0].entry_study_yr
                            : "2019/2020"}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          marginLeft: 25,
                          marginRight: 25,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ width: "40%" }}>Residence Status</span>
                        <span style={{ width: "2%" }}>:</span>
                        <span style={{ width: "58%", fontWeight: "bold" }}>
                          {studentDetails[0]
                            ? studentDetails[0].residence_status
                            : "Non Resident"}
                        </span>
                      </div>

                      {/* <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-notification`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-notification`
                            ? "active"
                            : ""
                        }
                      >
                        <Icon name="bell-fill"></Icon>
                        <span>Notification</span>
                      </Link>
                    </li>
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-activity`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-activity` ? "active" : ""
                        }
                      >
                        <Icon name="activity-round-fill"></Icon>
                        <span>Account Activity</span>
                      </Link>
                    </li>
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-setting`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-setting` ? "active" : ""
                        }
                      >
                        <Icon name="lock-alt-fill"></Icon>
                        <span>Security Setting</span>
                      </Link>
                    </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-inner card-inner-lg">
                {sm && mobileView && (
                  <div
                    className="toggle-overlay"
                    onClick={() => updateSm(!sm)}
                  ></div>
                )}
                <Switch>
                  {/* <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-regular`}
                  render={() => <UserProfileRegularPage updateSm={updateSm} sm={sm} setProfileName={setProfileName} />}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-notification`}
                  render={() => <UserProfileNotificationPage updateSm={updateSm} sm={sm} />}
                ></Route> */}
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/user-profile-activity`}
                    render={() => (
                      <UserProfileActivityPage updateSm={updateSm} sm={sm} />
                    )}
                  ></Route>
                  {/* <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-setting`}
                  render={() => <UserProfileSettingPage updateSm={updateSm} sm={sm} />}
                ></Route> */}
                </Switch>
              </div>
            </div>
          </Card>
        ) : (
          <h2
            style={{
              textAlign: "center",
            }}
          >
            LOADING
          </h2>
        )}
      </Content>
    </React.Fragment>
  );
};

export default UserProfileLayout;
