import React, { useState, useEffect } from "react";
import Icon from "../../components/icon/Icon";
import constraintsApi from "../../../src/api/constraintsApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actions from "../../../src/redux/actions/Actions";

const News = () => {
  const [constraints, setConstraints] = useState();
  const dispatch = useDispatch();
  const percentage = useSelector((state) => state.percentage);

  const loadConstraints = async () => {
    const res = await constraintsApi.getContraints();
    if (!res.ok) {
      console.log("Failed to fetch the constraints");
    }

    setConstraints(res.data);
    // console.log("Current constraint---", constraints);
  };

  useEffect(() => {
    loadConstraints();
    // console.log("Constraint", constraints);
    dispatch(
      actions.percentage(
        constraints
          ? constraints[0].c_percentage
            ? constraints[0].c_percentage
            : 0
          : 0
      )
    );
  }, [constraints]);

  return (
    <div className="nk-news-list">
      {/* {console.log("Current constraint 101", constraints)} */}
      <a
        className="nk-news-item"
        href="#news"
        onClick={(ev) => ev.preventDefault()}
      >
        <div className="nk-news-icon">
          <Icon name="card-view" />
        </div>
        <div className="nk-news-text">
          {/* <p>
            Do you know the latest update of 2022? <span> A overview of our is now available on YouTube</span>
          </p> */}
          <p
            style={{
              width: 200,
              fontSize: 16,
            }}
          >
            Fees Percentage:{" "}
            <span
              style={{
                fontSize: 16,
              }}
            >
              {" "}
              {percentage}%{" "}
            </span>
          </p>
          {/* <Icon name="external" /> */}
        </div>
      </a>
    </div>
  );
};

export default News;
