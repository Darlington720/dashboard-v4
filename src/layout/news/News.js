import React from "react";
import Icon from "../../components/icon/Icon";

const News = () => {
  return (
    <div className="nk-news-list">
      <a className="nk-news-item" href="#news" onClick={(ev) => ev.preventDefault()}>
        <div className="nk-news-icon">
          <Icon name="card-view" />
        </div>
        <div className="nk-news-text">
          {/* <p>
            Do you know the latest update of 2022? <span> A overview of our is now available on YouTube</span>
          </p> */}
          <p>
            The percentage is now at 1% <span> </span>
          </p>
          <Icon name="external" />
        </div>
      </a>
    </div>
  );
};

export default News;
