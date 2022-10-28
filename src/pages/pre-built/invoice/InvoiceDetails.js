import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import LogoDark from "../../../images/logo-dark.png";
import {
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  BlockDes,
  BlockHeadContent,
  OverlineTitle,
  Block,
  BlockBetween,
  PreviewAltCard,
  PreviewCard,
  UserAvatar,
} from "../../../components/Component";
import AvatarB from "../../../images/avatar/b-sm.jpg";
import AvatarA from "../../../images/avatar/a-sm.jpg";
import AvatarC from "../../../images/avatar/c-sm.jpg";
import { invoiceData } from "./Invoice";
import { Link } from "react-router-dom";
import lecturerImage from "../../../assets/images/person.jpeg";
// import { Row, Col, Card } from "reactstrap";
import { Row, Col, Progress, Card } from "reactstrap";

const InvoiceDetails = ({ match }) => {
  const [data] = useState(invoiceData);
  const [user, setUser] = useState();

  useEffect(() => {
    const id = match.params.id;
    if (id !== undefined || null || "") {
      let spUser = data.find((item) => item.id === Number(id));
      setUser(spUser);
    } else {
      setUser(data[0]);
    }
  }, [match.params.id, data]);

  return (
    <React.Fragment>
      <Head title="Invoice Detail"></Head>
      {user && (
        <Content>
          <BlockHead>
            <BlockBetween className="g-3">
              <BlockHeadContent>
                <BlockTitle>
                  {/* Invoice <strong className="text-primary small">#{user.orderId}</strong> */}
                  Database Mangement Systems
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      By: <span className="text-base">{"Mr Male Vicent"}</span>
                    </li>
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Link to={`${process.env.PUBLIC_URL}/invoice-list`}>
                  <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                    <Icon name="arrow-left"></Icon>
                    <span>Back</span>
                  </Button>
                </Link>
                <Link to={`${process.env.PUBLIC_URL}/invoice-list`}>
                  <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                    <Icon name="arrow-left"></Icon>
                  </Button>
                </Link>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <div className="invoice">
              <div className="invoice-action">
                <Link to={`${process.env.PUBLIC_URL}/invoice-print/${user.id}`} target="_blank">
                  <Button size="lg" color="primary" outline className="btn-icon btn-white btn-dim">
                    <Icon name="printer-fill"></Icon>
                  </Button>
                </Link>
              </div>
              <div className="invoice-wrap">
                <div className="invoice-brand text-center">
                  <img src={LogoDark} alt="" />
                </div>

                <Card
                  className={`card-bordered`}
                  style={{
                    // backgroundColor: "red",
                    padding: "10px",
                  }}
                >
                  {/* <div className={`card-inner`}> */}
                  <div
                    style={{
                      display: "flex",
                      // backgroundColor: "red",
                    }}
                  >
                    <div
                      style={
                        {
                          // backgroundColor: "yellow",
                        }
                      }
                    >
                      <img
                        src={lecturerImage}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        marginLeft: 10,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        // backgroundColor: "green",
                      }}
                    >
                      <Row
                        style={{
                          // display: "flex",
                          // alignItems: "center",
                          // backgroundColor: "red",
                          width: "100%",
                          marginLeft: 10,
                        }}
                      >
                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Course Name</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Database Management Systems</span>
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Lecturer</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Mr Male Vicent</span>
                            </div>
                          </div>
                        </Col>
                        <div
                          style={{
                            backgroundColor: "lightgray",
                            height: 1,
                            width: "100%",
                            marginBottom: 5,
                          }}
                        ></div>
                      </Row>

                      <Row
                        style={{
                          // display: "flex",
                          // alignItems: "center",
                          // backgroundColor: "red",
                          width: "100%",
                          marginLeft: 10,
                        }}
                      >
                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Lecturer</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Mr Male Vicent</span>
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Class Rep </span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Akampa Darlington</span>
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Time</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>7:00AM - 8:00AM</span>
                            </div>
                          </div>
                        </Col>
                        <div
                          style={{
                            backgroundColor: "lightgray",
                            height: 1,
                            width: "100%",
                            marginBottom: 5,
                          }}
                        ></div>
                      </Row>

                      <Row
                        style={{
                          // display: "flex",
                          // alignItems: "center",
                          // backgroundColor: "red",
                          width: "100%",
                          marginLeft: 10,
                        }}
                      >
                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Started At</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>7:35AM</span>
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Ended At </span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>8:34AM</span>
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Mode</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Physical</span>
                            </div>
                          </div>
                        </Col>
                        <div
                          style={{
                            backgroundColor: "lightgray",
                            height: 1,
                            width: "100%",
                            marginBottom: 5,
                          }}
                        ></div>
                      </Row>

                      <Row
                        style={{
                          // display: "flex",
                          // alignItems: "center",
                          // backgroundColor: "red",
                          width: "100%",
                          marginLeft: 10,
                        }}
                      >
                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Status</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Ongoing</span>
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Ended At </span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>8:34AM</span>
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Mode</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Ongoing</span>
                            </div>
                          </div>
                        </Col>
                        <div
                          style={{
                            backgroundColor: "lightgray",
                            height: 1,
                            width: "100%",
                            marginBottom: 5,
                          }}
                        ></div>
                      </Row>
                      {/* <Row>
                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Course Name</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Database Management Systems</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Lecturer</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Mr Male Vicent</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Class Rep</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Akampa Darlington</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Status</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Ongoing</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Time</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>7:00AM - 10:00AM</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Started At</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>7:45AM</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Ended At</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>10:20AM</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                              <span style={{ fontSize: 16, fontWeight: "bold" }}>Lecture Mode</span>
                              <span style={{ marginLeft: 2, marginRight: 2 }}>:</span>
                              <span style={{ fontSize: 16 }}>Physical</span>
                            </div>
                            <div
                              style={{
                                backgroundColor: "lightgray",
                                height: 1,
                                width: "100%",
                                marginBottom: 5,
                              }}
                            ></div>
                          </div>
                        </Col>
                      </Row> */}
                    </div>
                  </div>
                  {/* </div> */}
                </Card>
                {/* <div className="invoice-head">
                    <div className="invoice-contact">
                      <span className="overline-title">Invoice To</span>
                      <div className="invoice-contact-info">
                        <h4 className="title">{user.name}</h4>
                        <ul className="list-plain">
                          <li>
                            <Icon name="map-pin-fill"></Icon>
                            <span>
                              House #65, 4328 Marion Street
                              <br />
                              Newbury, VT 05051
                            </span>
                          </li>
                          <li>
                            <Icon name="call-fill"></Icon>
                            <span>{user.phone}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="invoice-desc">
                      <h3 className="title">Invoice</h3>
                      <ul className="list-plain">
                        <li className="invoice-id">
                          <span>Invoice ID</span>:<span>{user.orderId}</span>
                        </li>
                        <li className="invoice-date">
                          <span>Date</span>:<span>{user.date.split(",")[0]}</span>
                        </li>
                      </ul>
                    </div>
                  </div> */}

                {/* 
                <div className="invoice-bills">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="w-150px">Item ID</th>
                          <th className="w-60">Description</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>24108054</td>
                          <td>Dashlite - Conceptual App Dashboard - Regular License</td>
                          <td>${user.invoiceItem1}</td>
                          <td>1</td>
                          <td>${user.invoiceItem1}</td>
                        </tr>
                        <tr>
                          <td>24108054</td>
                          <td>24 months premium support</td>
                          <td>${user.invoiceItem2}</td>
                          <td>1</td>
                          <td>${user.invoiceItem2}</td>
                        </tr>
                        <tr>
                          <td>23604094</td>
                          <td>Invest Management Dashboard - Regular License</td>
                          <td>${user.invoiceItem3}</td>
                          <td>1</td>
                          <td>${user.invoiceItem3}</td>
                        </tr>
                        <tr>
                          <td>23604094</td>
                          <td>6 months premium support</td>
                          <td>${user.invoiceItem4}</td>
                          <td>1</td>
                          <td>${user.invoiceItem4}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">Subtotal</td>
                          <td>
                            $
                            {Number(user.invoiceItem1) +
                              Number(user.invoiceItem2) +
                              Number(user.invoiceItem3) +
                              Number(user.invoiceItem4) +
                              ".00"}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">Processing fee</td>
                          <td>$10.00</td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">TAX</td>
                          <td>$50.00</td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">Grand Total</td>
                          <td>${user.totalAmount}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="nk-notes ff-italic fs-12px text-soft">
                      Invoice was created on a computer and is valid without the signature and seal.
                    </div>
                  </div>
                </div> */}

                {/* <PreviewCard> */}
                <Row>
                  <Col md="6" lg="4">
                    <OverlineTitle className="preview-title">Enrolled Students</OverlineTitle>
                    <ul className="custom-control-group custom-control-vertical w-100">
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox custom-control-pro">
                          {/* <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user-selection-s1"
                          name="user-selection"
                        /> */}
                          <label className="custom-control-label" htmlFor="user-selection-s1">
                            <span className="user-card">
                              <UserAvatar image={AvatarA} className="sq"></UserAvatar>
                              <span className="user-info">
                                <span className="lead-text">Keith Jensen</span>
                                <span className="sub-text">Senior Developer</span>
                              </span>
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox custom-control-pro">
                          {/* <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user-selection-s2"
                          name="user-selection"
                        /> */}
                          <label className="custom-control-label" htmlFor="user-selection-s2">
                            <span className="user-card">
                              <UserAvatar theme="pink" text="AB" className="sm"></UserAvatar>
                              <span className="user-info">
                                <span className="lead-text">Abu Bin Ishtiyak</span>
                                <span className="sub-text">Senior Developer</span>
                              </span>
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox custom-control-pro">
                          {/* <input
                          type="checkbox"
                          className="custom-control-input"
                          id="user-selection-s4"
                          name="user-selection"
                        /> */}
                          <label className="custom-control-label" htmlFor="user-selection-s4">
                            <span className="user-card">
                              <UserAvatar image={AvatarB} className="sm"></UserAvatar>
                              <span className="user-info">
                                <span className="lead-text">Daisy Morgan</span>
                                <span className="sub-text">UI/UX Designer</span>
                              </span>
                            </span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </Col>
                  <Col md="6" lg="4">
                    <OverlineTitle className="preview-title">Attended</OverlineTitle>
                    <ul className="custom-control-group custom-control-vertical custom-control-stacked w-100">
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input type="radio" className="custom-control-input" id="user-choose-s1" name="user-choose" />
                          <label className="custom-control-label" htmlFor="user-choose-s1">
                            <span className="user-card">
                              <UserAvatar image={AvatarA} className="sm"></UserAvatar>
                              <span className="user-name">Keith Jensen</span>
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input type="radio" className="custom-control-input" id="user-choose-s2" name="user-choose" />
                          <label className="custom-control-label" htmlFor="user-choose-s2">
                            <span className="user-card">
                              <UserAvatar theme="pink" text="AB" className="sm"></UserAvatar>
                              <span className="user-name">Abu Bin Ishtiyak</span>
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input type="radio" className="custom-control-input" id="user-choose-s3" name="user-choose" />
                          <label className="custom-control-label" htmlFor="user-choose-s3">
                            <span className="user-card">
                              <UserAvatar image={AvatarB} className="sm"></UserAvatar>
                              <span className="user-name">Daisy Morgan</span>
                            </span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input type="radio" className="custom-control-input" id="user-choose-s4" name="user-choose" />
                          <label className="custom-control-label" htmlFor="user-choose-s4">
                            <span className="user-card">
                              <UserAvatar image={AvatarC} className="sm"></UserAvatar>
                              <span className="user-name">Kyle Henderson</span>
                            </span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </Col>
                  <Col md="6" lg="4">
                    <OverlineTitle className="preview-title">Absent</OverlineTitle>
                    <ul className="custom-control-group custom-control-vertical w-100">
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input type="radio" className="custom-control-input" name="paymentCheck" id="paymentCheck1" />
                          <label className="custom-control-label" htmlFor="paymentCheck1">
                            <Icon className="icon-lg" name="cc-paypal"></Icon>
                            <span>Paypal</span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input type="radio" className="custom-control-input" name="paymentCheck" id="paymentCheck2" />
                          <label className="custom-control-label" htmlFor="paymentCheck2">
                            <Icon className="icon-lg" name="cc-mc"></Icon>
                            <span>Master Card</span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          <input type="radio" className="custom-control-input" name="paymentCheck" id="paymentCheck3" />
                          <label className="custom-control-label" htmlFor="paymentCheck3">
                            <Icon className="icon-lg" name="cc-visa"></Icon>
                            <span>Visa Card</span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                          {/* <input type="radio" className="custom-control-input" name="paymentCheck" id="paymentCheck4" /> */}
                          <label className="custom-control-label" htmlFor="paymentCheck4">
                            <Icon className="icon-lg" name="cc-stripe"></Icon>
                            <span>Stripe</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </Col>
                </Row>

                <Row
                  style={{
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Col md="6">
                    <OverlineTitle className="preview-title">Lecture Rating</OverlineTitle>
                    <PreviewAltCard>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignSelf: "center",
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
                    </PreviewAltCard>
                  </Col>
                </Row>
                {/* </PreviewCard> */}
              </div>
            </div>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default InvoiceDetails;
