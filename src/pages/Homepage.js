import React, { useState } from "react";
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
// import RatingWidgets from "../pages/components/widgets/RatingWidgets";
// import RatingWidgets from "./components/widgets/RatingWidgets";
// import "../../src/components/mystyles.css";
import {
  Block,
  BlockHead,
  // BlockDes,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
  Icon,
  PreviewAltCard,
  // LineChartExample,
  // BackTo,
  // BarChartExample,
  // PieChartExample,
  // DoughnutExample,
  // PolarExample,
} from "../components/Component";
import { Card, Col, Row, Collapse, Button } from "reactstrap";
// import {
//   barChartData,
//   barChartMultiple,
//   barChartStacked,
//   filledLineChart,
//   solidLineChart,
//   straightLineChart,
//   doughnutChartData,
//   polarChartData,
// } from "./components/charts/ChartData";

const ChartWidgets = () => {
  const [collapse3, setCollapse3] = useState(false);
  return (
    <React.Fragment>
      <Head title="Card Widgets"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BlockTitle tag="h5" className="fw-normal">
              Tredumo Dashboard
            </BlockTitle>
          </BlockHeadContent>
        </BlockHead>
        <Block>
          <PreviewCard>
            <Row>
              <Col md="12">
                <PreviewAltCard>
                  <AudienceOverview className="Componenti" />
                  <OrderOverview />
                </PreviewAltCard>
              </Col>
            </Row>
          </PreviewCard>
        </Block>
        <Block size="lg">
          <Row className="g-gs">
            <Col md={6}>
              <PreviewCard>
                <div className="card-head">
                  <h6 className="title">Blended Learning</h6>
                </div>
                {/* <div className="nk-ck-sm">
                  <LineChartExample legend={false} data={filledLineChart} />
                </div> */}
                <UserActivity />
              </PreviewCard>
            </Col>
            <Col md={6}>
              <PreviewCard>
                <div className="card-head">
                  <h6 className="title">Number of Students Per School</h6>
                </div>
                {/* <div className="nk-ck-sm">
                  <LineChartExample legend={false} data={straightLineChart} />
                </div> */}
                <TrafficDougnut />
              </PreviewCard>
            </Col>
          </Row>
        </Block>
        <Block size="lg">
          <Row className="g-gs">
            <Col md={6}>
              <PreviewCard>
                <div className="card-head">
                  <h6 className="title">Rounded Chart</h6>
                </div>
                {/* <div className="nk-ck-sm">
                  <LineChartExample legend={false} data={filledLineChart} />
                </div> */}
                <RecentActivity />
              </PreviewCard>
            </Col>
            <Col md={6}>
              <PreviewCard>
                {/* <div className="nk-ck-sm">
                  <LineChartExample legend={false} data={straightLineChart} />
                </div> */}
                {/* <Calender/> */}
                <Block size="lg">
                  <BlockHead>
                    <BlockHeadContent>
                      <BlockTitle tag="h5">Lecture Review</BlockTitle>
                    </BlockHeadContent>
                  </BlockHead>
                  <Card className="card-bordered">
                    <div className="card-inner">
                      <h5 className="card-title mb-1">Database Management</h5>
                      <div className="rating-wrap my-1">
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
                            <Icon name="star-fill"></Icon>
                          </li>
                          <li>
                            <Icon name="star-half-fill"></Icon>
                          </li>
                        </ul>
                        <span className="amount ml-2"> (99)</span>
                      </div>

                      <h5 className="card-title mb-1">MOIS</h5>
                      <div className="rating-wrap my-1">
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
                        <span className="amount ml-2">4.4 (78)</span>
                      </div>

                      <h5 className="card-title mb-1">Computer Algorithms</h5>
                      <div className="rating-wrap my-1">
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
                        <span className="amount ml-2">4.4 (78)</span>
                      </div>

                      <h5 className="card-title mb-1">Data Structures</h5>
                      <div className="rating-wrap my-1">
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
                        <span className="amount ml-2">4.4 (78)</span>
                      </div>

                      <h5 className="card-title mb-1">Computer Graphics</h5>
                      <div className="rating-wrap my-1">
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
                        <span className="amount ml-2">4.4 (78)</span>
                      </div>

                      <h5 className="card-title mb-1">Data Mining</h5>
                      <div className="rating-wrap my-1">
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
                        <span className="amount ml-2">4.4 (78)</span>
                      </div>

                      {/* <h5 className="card-title mt-4">Criteria on Softnio</h5>
    <div className="rating-card">
      <div className="d-flex align-center justify-content-between py-1">
        <span className="text-muted">Productivity</span>
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
            <Icon name="star-fill"></Icon>
          </li>
          <li>
            <Icon name="star-fill"></Icon>
          </li>
        </ul>
      </div>
      <div className="d-flex align-center justify-content-between py-1">
        <span className="text-muted">Competitive Position</span>
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
            <Icon name="star-fill"></Icon>
          </li>
          <li>
            <Icon name="star"></Icon>
          </li>
        </ul>
      </div>
      <div className="d-flex align-center justify-content-between py-1">
        <span className="text-muted">Brand Value</span>
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
            <Icon name="star-fill"></Icon>
          </li>
          <li>
            <Icon name="star-fill"></Icon>
          </li>
        </ul>
      </div>
      <div className="d-flex align-center justify-content-between py-1">
        <span className="text-muted">Environment</span>
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
            <Icon name="star-fill"></Icon>
          </li>
          <li>
            <Icon name="star"></Icon>
          </li>
        </ul>
      </div>
    </div> */}
                      <Collapse isOpen={collapse3}>
                        <div className="divider"></div>
                        <div className="rating-card-description">
                          <h5 className="card-title">Review Description</h5>
                          <p className="text-muted">
                            These are the top rated lectures at Nkumba University rated by the students them selves as
                            the lectures come to an end. This data is provided by the students and valid accordingly.
                          </p>
                          {/* <ul className="pt-2 gy-1">
          <li>
            <Icon name="check-circle"></Icon>
            <span>30 days off</span>
          </li>
          <li>
            <Icon name="check-circle"></Icon>
            <span>Free drinks</span>
          </li>
          <li>
            <Icon name="check-circle"></Icon>
            <span>Paid leave</span>
          </li>
          <li>
            <Icon name="check-circle"></Icon>
            <span>Healthcare</span>
          </li>
        </ul> */}
                        </div>
                      </Collapse>
                    </div>
                    <div className="card-footer rating-card-footer bg-light border-top d-flex align-center justify-content-between">
                      <a
                        className="switch-text collapsed"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setCollapse3(!collapse3);
                        }}
                        href="#collapseDes1"
                      >
                        {collapse3 ? (
                          <div className="link link-gray switch-text-normal">
                            <span>Less Info</span>
                            <Icon name="upword-ios"></Icon>
                          </div>
                        ) : (
                          <div className="link link-gray switch-text-collapsed">
                            <span>More Info</span>
                            <Icon name="downward-ios"></Icon>
                          </div>
                        )}
                      </a>
                      <Button color="primary">More</Button>
                    </div>
                  </Card>
                </Block>
              </PreviewCard>
            </Col>
          </Row>
        </Block>

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Calendar showing Uni Events</BlockTitle>
              <p>Details for various events on the educational Curriculum</p>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Row>
              <Col lg="12">
                <Card className="card-bordered">
                  {/* <TrafficChannel /> */}
                  <Calender />
                </Card>
              </Col>
            </Row>
          </PreviewCard>
        </Block>

        {/* <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Doughnut Charts</BlockTitle>
              <p>
                Doughnut charts are probably the most commonly used charts. It use to show relational proportions
                between data.
              </p>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Row>
              <Col md="6">
                <PreviewAltCard>
                  <TrafficDougnut />
                </PreviewAltCard>
              </Col>
            </Row>
          </PreviewCard>
        </Block> */}

        {/* <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Doughnut Charts with icons</BlockTitle>
              <p>
                Doughnut charts are probably the most commonly used charts. It use to show relational proportions
                between data.
              </p>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Row>
              <Col md="6">
                <PreviewAltCard>
                  <SessionDevice />
                </PreviewAltCard>
              </Col>
            </Row>
          </PreviewCard>
        </Block> */}
      </Content>
    </React.Fragment>
  );
};

export default ChartWidgets;
