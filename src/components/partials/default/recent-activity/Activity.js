import React, { useState } from "react";
import UserAvatar from "../../../user/UserAvatar";
import { activityData } from "./ActivityData";
import { CardTitle } from "reactstrap";
import {Button} from "reactstrap";

const RecentActivity = () => {
  const [recentUser, setRecentUser] = useState("");
  return (
    <React.Fragment>
      <div className="card-inner border-bottom">
        <div className="card-title-group">
          <CardTitle>
          <span><h6 className="title">Lecture Summary</h6></span>
          </CardTitle>
          <div className="card-tools">
            <ul className="card-tools-nav">
              <li className={recentUser === "Cancel" ? "active" : ""} onClick={() => setRecentUser("Cancel")}>
                <a
                  href="#cancel"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <span>On-going</span>
                </a>
              </li>
              <li className={recentUser === "" ? "active" : ""} onClick={() => setRecentUser("")}>
                <a
                  href="#all"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <span>Done</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
              <Button color="primary">More</Button>
         </div>
      <ul className="nk-activity">
        {recentUser === "Cancel"
          ? activityData.slice(0, 3).map((item) => {

            return (

              <li className="nk-activity-item" key={item.name}>
                  <UserAvatar
                    className="nk-activity-media"
                    theme={item.theme}
                    image={item.img}
                    text={item.initial}
                  ></UserAvatar>
                  <div className="nk-activity-data">
                    <div className="label">{item.name + " " + item.activity}</div>
                    <span className="time">{item.time}</span>
                  </div>
                </li>
                
              );
              
            })
            : activityData.map((item) => {
              return (
                <li className="nk-activity-item" key={item.name}>
                  <UserAvatar
                    className="nk-activity-media"
                    theme={item.theme}
                    image={item.img}
                    text={item.initial}
                  ></UserAvatar>
                  <div className="nk-activity-data">
                    <div className="label">{item.name + " " + item.activity}</div>
                    <span className="time">{item.time}</span>
                  </div>
                </li>
              );
            })}
      </ul>
    </React.Fragment>
  );
};
export default RecentActivity;
