import React, { useState } from "react";
import Icon from "../../../icon/Icon";
// import { UncontrolledDropdown, CardTitle, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
// import { DoubleBar } from "../../charts/default/Charts";
import { Row, Col } from "../../../grid/Grid";
// import { Link } from "react-router-dom";

const OrderOverview = () => {
  const [orderOverview] = useState("");
  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-3">
        {/* <CardTitle className="card-title">
           <h6 className="title">Orders Overview</h6>
          <p>
            In last {orderOverview === "set2" ? "30" : "15"} days buy and sells overview.{" "}
            <Link to={`${process.env.PUBLIC_URL}/invoice-list`} className="link link-sm">
              Detailed Stats
            </Link>
          </p> 
        </CardTitle> */}
        <div className="card-tools mt-n1 mr-n1"></div>
      </div>
      <div className="nk-order-ovwg">
        <Row className="g-4 align-end">
          <Col xxl="2">
            {/* Mbu flex style */}
            <Row className="g-4">
              <Col xxl="6" sm="4">
                <div className="nk-order-ovwg-data buy">
                  <div className="amount">
                    {orderOverview === "set2" ? "12,495" : "14"}{" "}
                    <small className="currenct currency-usd">Lectures</small>
                  </div>
                  <div className="info">
                    Yesterday {orderOverview === "set2" ? "30" : "15"} lectures where conducted.{" "}
                    {/* <strong>
                      {orderOverview === "set2" ? "39,000" : "14,050"}{" "}
                      <span className="currenct currency-usd">USD</span>
                    </strong> */}
                  </div>
                  <div className="title">
                    <Icon name="arrow-down-left"></Icon> More Details
                  </div>
                </div>
              </Col>
              <Col xxl="6" sm="4">
                <div className="nk-order-ovwg-data sell">
                  <div className="amount">
                    {orderOverview === "set2" ? "18,920" : "56"}{" "}
                    <small className="currenct currency-usd">Lectures</small>
                  </div>
                  <div className="info">
                    Yesterday {orderOverview === "set2" ? "30" : "19"} lectures where not taught.{" "}
                    {/* <strong>
                      {orderOverview === "set2" ? "39,258" : "18,365"}{" "}
                      <span className="currenct currency-usd">USD</span>
                    </strong> */}
                  </div>
                  <div className="title">
                    <Icon name="arrow-up-left"></Icon> Not Taught
                  </div>
                </div>
              </Col>

              <Col xxl="6" sm="4">
                <div className="nk-order-ovwg-data sell">
                  <div className="amount">
                    {orderOverview === "set2" ? "18,920" : "120"}{" "}
                    <small className="currenct currency-usd">Lectures</small>
                  </div>
                  <div className="info">
                    Yesterday {orderOverview === "set2" ? "30" : "112"} lectures where taught.{" "}
                    {/* <strong>
                      {orderOverview === "set2" ? "39,258" : "18,365"}{" "}
                      <span className="currenct currency-usd">USD</span>
                    </strong> */}
                  </div>
                  <div className="title">
                    <Icon name="arrow-up-left"></Icon> Taught Yesterday
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
export default OrderOverview;
