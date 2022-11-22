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

//import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import {
  TabContent,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
const UserProfileLayout = () => {
  const studentDetails = useSelector((state) => state.student);
  const selectedRow = useSelector((state) => state.row);
  const [modal, setModal] = useState(false);
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

  const toggleModal = () => setModal(!modal);

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
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  return (
    <React.Fragment>
      {console.log("Selected in target copmponent", selectedRow)}
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <div
                style={{
                  backgroundColor: "blue",
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
                  // image={
                  //   hasLoadedImage
                  //     ? `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${
                  //         studentDetails ? studentDetails[0].stdno : "2000101041"
                  //       }`
                  //     : ""
                  // }
                  style={{ width: 100, height: 100, backgroundColor: "lightgray" }}
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
                  Mr Male Vicent
                </span>
                <span
                  style={{
                    fontSize: 18,
                    // fontWeight: "bold",
                  }}
                >
                  Database Management System
                </span>
                <span
                  style={{
                    fontSize: 18,
                    // fontWeight: "bold",
                    opacity: 0.3,
                  }}
                >
                  7:00AM - 8:00AM
                </span>
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
                      fontSize: 17,
                      width: "40%",
                    }}
                  >
                    Room
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      // marginLeft: 10,
                      width: "2%",
                      // marginRight: 10,
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      width: "58%",
                    }}
                  >
                    SK2
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
                      fontSize: 17,
                      width: "40%",
                    }}
                  >
                    Status
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      // marginLeft: 10,
                      width: "2%",
                      // marginRight: 10,
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      width: "58%",
                    }}
                  >
                    Ongoing
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
                      fontSize: 17,
                      width: "40%",
                    }}
                  >
                    Class Rep
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      // marginLeft: 10,
                      width: "2%",
                      // marginRight: 10,
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      width: "58%",
                    }}
                  >
                    Darlington
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
                      fontSize: 17,
                      width: "40%",
                    }}
                  >
                    Started At
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      // marginLeft: 10,
                      width: "2%",
                      // marginRight: 10,
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      width: "58%",
                    }}
                  >
                    7:45AM
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
                      fontSize: 17,
                      width: "40%",
                    }}
                  >
                    Ended At
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      // marginLeft: 10,
                      width: "2%",
                      // marginRight: 10,
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      width: "58%",
                    }}
                  >
                    8:45AM
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
                      fontSize: 17,
                      width: "40%",
                    }}
                  >
                    Duration
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      // marginLeft: 10,
                      width: "2%",
                      // marginRight: 10,
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      width: "58%",
                    }}
                  >
                    2 hours
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
                      fontSize: 17,
                      width: "40%",
                    }}
                  >
                    Lecture Mode
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      // marginLeft: 10,
                      width: "2%",
                      // marginRight: 10,
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      width: "58%",
                    }}
                  >
                    Physical
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
                <span
                  onClick={toggleModal}
                  style={{
                    textAlign: "center",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Click here to view online details
                </span>
                {/* </a> */}

                {/* <Button color="primary" onClick={toggleModal}>
                  Modal Default
                </Button> */}
                <Modal isOpen={modal} toggle={toggleModal}>
                  <ModalHeader
                    toggle={toggle}
                    close={
                      <button className="close" onClick={toggleModal}>
                        <Icon name="cross" />
                      </button>
                    }
                  >
                    Online Lecture Details
                  </ModalHeader>
                  <ModalBody>
                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 17,
                          width: "40%",
                        }}
                      >
                        Lecture Link
                      </span>
                      <span
                        style={{
                          fontSize: 17,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 17,
                          width: "58%",
                          // display: "flex",
                          // backgroundColor: "red",
                          // textAlign: "center",
                          // flexWrap: "wrap",
                        }}
                      >
                        <a
                          href="http://googlehhjfdhdjhjhdfjhdfhjdfh
                  gruofgrfeuiogeioeriogu.com"
                        >
                          {` http://googlehhjfdhdjhjhdfjhdfhjdfh
                        fgrfeuiogeioeriogu.com`}
                        </a>
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
                          fontSize: 17,
                          width: "40%",
                        }}
                      >
                        Meeting Id
                      </span>
                      <span
                        style={{
                          fontSize: 17,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 17,
                          width: "58%",
                        }}
                      >
                        6363636
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
                          fontSize: 17,
                          width: "40%",
                        }}
                      >
                        Passcode
                      </span>
                      <span
                        style={{
                          fontSize: 17,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 17,
                          width: "58%",
                        }}
                      >
                        7464784848
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
                  </ModalBody>
                  <ModalFooter className="bg-light">
                    <span
                      className="sub-text"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={toggleModal}
                    >
                      Close
                    </span>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <UserProfileActivityPage updateSm={updateSm} sm={sm} />
            </div>
          </div>
        </Card>
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
