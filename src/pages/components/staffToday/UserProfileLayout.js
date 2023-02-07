import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
// import UserProfileRegularPage from "./UserProfileRegular";
// import UserProfileSettingPage from "./UserProfileSetting";
// import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import { Route, Switch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon, UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import urls from "../../../api/apiConstants";

//import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import staffApi from "../../../api/staffApi";
const UserProfileLayout = () => {
  const studentDetails = useSelector((state) => state.student);
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [activeTab, setActivetab] = useState("1");
  const [profileName, setProfileName] = useState("Abu Bin Ishtiak");
  const [hasLoadedImage, setHasLoadedImage] = useState(false);
  const selectedRow = useSelector((state) => state.row);
  const [isLoading, setIsLoading] = useState(true);
  const [staffDetails, setStaffDetails] = useState([]);
  const [lectures, setLectures] = useState([]);

  const loadAllStaffDetails = async (staff_id) => {
    setIsLoading(true);

    const dataToBeSent = {
      lecturer_id: selectedRow.staff_id,
      day: new Date().getDay(),
    };
    const res = await staffApi.getAllStaffDetails(staff_id);
    const res2 = await staffApi.getLecturerCourseUnits(dataToBeSent);

    if (!res.ok || !res2.ok) {
      console.log("Failed to load all staff details");
    }

    console.log(res.data);
    console.log("Today's lectures of the lecturer", res2.data);
    setStaffDetails(res.data);
    setLectures(res2.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setHasLoadedImage(true);
    loadAllStaffDetails(selectedRow.staff_id);
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
      {console.log("The row selcted is", selectedRow)}
      <Content>
        {isLoading ? (
          <h2
            style={{
              textAlign: "center",
            }}
          >
            LOADING
          </h2>
        ) : (
          <Card className="card-bordered">
            <div className="card-aside-wrap">
              <div
                className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                  sm ? "content-active" : ""
                }`}
              >
                <div
                  style={{
                    backgroundColor: "purple",
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
                  <UserAvatar
                    text={findUpper(profileName)}
                    // theme="primary"
                    size="xl"
                    image={`${urls.baseUrl1}api/lecturer/image/${selectedRow.staff_id}`}
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "lightgray",
                    }}
                  >
                    {/* <div className="status dot dot-lg dot-success"></div> */}
                  </UserAvatar>
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
                      fontWeight: "bold",
                    }}
                  >
                    {staffDetails
                      ? `${staffDetails[0].title} ${staffDetails[0].staff_name}`
                      : "Mr Male Vicent"}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      // fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {staffDetails
                      ? `${staffDetails[0].role}`
                      : "Administrative Assistant"}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      // fontWeight: "bold",
                      opacity: 0.3,
                    }}
                  >
                    {staffDetails ? `${staffDetails[0].staff_id}` : "Half Time"}
                  </span>
                </div>

                <div
                  style={{
                    height: 1,
                    width: "100%",
                    opacity: 0.1,
                    marginTop: 5,
                    backgroundColor: "black",
                  }}
                ></div>

                {/* <Row
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
                      20
                    </span>
                    <span
                      style={{
                        opacity: 0.5,
                      }}
                    >
                      Enrolled
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
                      15
                    </span>
                    <span
                      style={{
                        opacity: 0.5,
                      }}
                    >
                      Attended
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
                      5
                    </span>
                    <span
                      style={{
                        opacity: 0.5,
                      }}
                    >
                      Absent
                    </span>
                  </div>
                </Col>
              </Row> */}
              </div>
              <div className="card-inner card-inner-lg">
                {sm && mobileView && (
                  <div
                    className="toggle-overlay"
                    onClick={() => updateSm(!sm)}
                  ></div>
                )}
                <UserProfileActivityPage
                  updateSm={updateSm}
                  sm={sm}
                  data={staffDetails}
                  lectures={lectures}
                />
              </div>
            </div>
          </Card>
        )}
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
      </Content>
    </React.Fragment>
  );
};

export default UserProfileLayout;
