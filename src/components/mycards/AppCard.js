import React from "react";
import { PreviewAltCard } from "../Component";
import { Card, Row } from "reactstrap";
import testImg from "./img.jpg";
import stuImg from "../../../src/assets/images/stu.png";

function AppCard({ title = "today's Students", total, image }) {
  return (
    // <PreviewAltCard>
    //   <div>App Carddd</div>
    // </PreviewAltCard>
    <div
      style={{
        marginTop: 20,
        width: window.innerWidth < 1200 ? "100%" : "auto",
        // marginBottom: 20,
        // display: "flex",
      }}
    >
      <Card
        className={`card-bordered`}
        style={{
          // backgroundColor: "red",
          // display: "flex",
          // justifyContent: "center",
          padding: "10px",
          marginRight: 10,
          marginBottom: 10,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              // backgroundColor: "red",
              marginTop: -25,
              marginRight: 20,
              // marginBottom: 20,
              // position: "absolute",
              zIndex: 3,
              width: window.innerWidth < 1200 ? "30%" : 80,
              // backgroundColor: "yellow",
            }}
          >
            {image}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // width: "70%",
              // backgroundColor: "red",
            }}
          >
            <span
              style={{
                fontSize: 12,
                opacity: 0.5,
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontSize: 24,
                textAlign: "right",
              }}
            >
              {total}
            </span>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "black",
            opacity: 0.2,
            marginTop: window.innerWidth < 1200 ? "2%" : 10,
            marginBottom: window.innerWidth < 1200 ? "2%" : 10,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span style={{ textAlign: "center" }}>View Details</span>
        </div>
      </Card>
    </div>
  );
}

export default AppCard;
