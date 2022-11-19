import User from "../../../images/avatar/b-sm.jpg";
import User2 from "../../../images/avatar/c-sm.jpg";
import User3 from "../../../images/avatar/a-sm.jpg";
import User4 from "../../../images/avatar/d-sm.jpg";
import React from "react";
import { UserAvatar, Icon } from "../../../components/Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { findUpper } from "../../../utils/Utils";

export const basicData = {
  header: ["#", "First", "Last"],
  data: [
    {
      id: "1",
      first: "Mark",
      last: "Otto",
    },
    {
      id: "2",
      first: "Jacob",
      last: "Thornton",
    },
    {
      id: "3",
      first: "Larry",
      last: "the bird",
    },
  ],
};

export const dataTableColumns = [
  {
    dataField: "c_id",
    text: "ID",
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return (
          <span>
            &nbsp;&nbsp;{" "}
            <FontAwesomeIcon
              icon={faArrowDown}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faArrowUp}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
          </span>
        );
      else if (order === "asc")
        return (
          <span>
            &nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faArrowDown}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
            <font color="#000">
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </font>
          </span>
        );
      else if (order === "desc")
        return (
          <span>
            &nbsp;&nbsp;
            <font color="#000">
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </font>
            <FontAwesomeIcon
              icon={faArrowUp}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
          </span>
        );
      return null;
    },
    // name: "ID",
    // selector: (row) => row.name,
    // sortable: true,
  },
  {
    dataField: "c_name",
    text: "Name",
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return (
          <span>
            &nbsp;&nbsp;{" "}
            <FontAwesomeIcon
              icon={faArrowDown}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faArrowUp}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
          </span>
        );
      else if (order === "asc")
        return (
          <span>
            &nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faArrowDown}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
            <font color="#000">
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </font>
          </span>
        );
      else if (order === "desc")
        return (
          <span>
            &nbsp;&nbsp;
            <font color="#000">
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </font>
            <FontAwesomeIcon
              icon={faArrowUp}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
          </span>
        );
      return null;
    },
    // name: "Name",
    // selector: (row) => row.age,
    // sortable: true,
    // hide: 370,
  },
  {
    dataField: "c_percentage",
    text: "Percentage",
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return (
          <span>
            &nbsp;&nbsp;{" "}
            <FontAwesomeIcon
              icon={faArrowDown}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faArrowUp}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
          </span>
        );
      else if (order === "asc")
        return (
          <span>
            &nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faArrowDown}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
            <font color="#000">
              <FontAwesomeIcon
                icon={faArrowUp}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </font>
          </span>
        );
      else if (order === "desc")
        return (
          <span>
            &nbsp;&nbsp;
            <font color="#000">
              <FontAwesomeIcon
                icon={faArrowDown}
                // color="#000"
                size="sm"
                // style={{
                //   cursor: "pointer",
                // }}
                // onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </font>
            <FontAwesomeIcon
              icon={faArrowUp}
              // color="#000"
              size="sm"
              // style={{
              //   cursor: "pointer",
              // }}
              // onClick={() => handleView(row)}
              //onClick={() => {console.log("row clicked", row)}}
            ></FontAwesomeIcon>
          </span>
        );
      return null;
    },
    // name: "Reason",
    // selector: (row) => row.gender,
    // sortable: true,
    // hide: "sm",
  },
];

export const dataTableColumns2 = [
  {
    name: "User",
    selector: (row) => row.name,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar
          theme={row.avatarBg}
          text={findUpper(row.name)}
          image={row.image}
        ></UserAvatar>
        <div className="user-info">
          <span className="tb-lead">
            {row.name}{" "}
            <span
              className={`dot dot-${
                row.status === "Active"
                  ? "success"
                  : row.status === "Pending"
                  ? "warning"
                  : "danger"
              } d-md-none ml-1`}
            ></span>
          </span>
          <span>{row.email}</span>
        </div>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Balance",
    selector: (row) => row.balance,
    minWidth: "140px",
    cell: (row) => (
      <span className="tb-amount">
        {row.balance} <span className="currency">USD</span>
      </span>
    ),
    sortable: true,
    hide: 480,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
    cell: (row) => <span>{row.phone}</span>,
    hide: "md",
  },
  {
    name: "Verified",
    selector: (row) => row.verified,
    sortable: true,
    minWidth: "170px",
    hide: "md",
    cell: (row) => (
      <ul className="list-status d-flex">
        <li>
          <Icon
            className={`text-${
              row.emailStatus === "success"
                ? "success"
                : row.emailStatus === "pending"
                ? "info"
                : "secondary"
            }`}
            name={`${
              row.emailStatus === "success"
                ? "check-circle"
                : row.emailStatus === "alert"
                ? "alert-circle"
                : "alarm-alt"
            }`}
          ></Icon>{" "}
          <span>Email</span>
        </li>
        <li>
          <Icon
            className={`text-${
              row.kycStatus === "success"
                ? "success"
                : row.kycStatus === "pending"
                ? "info"
                : row.kycStatus === "warning"
                ? "warning"
                : "secondary"
            }`}
            name={`${
              row.kycStatus === "success"
                ? "check-circle"
                : row.kycStatus === "pending"
                ? "alarm-alt"
                : "alert-circle"
            }`}
          ></Icon>{" "}
          <span>KYC</span>
        </li>
      </ul>
    ),
  },
  {
    name: "Last Login",
    selector: (row) => row.lastLogin,
    sortable: true,
    cell: (row) => <span>{row.lastLogin}</span>,
    hide: "lg",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    hide: "sm",
    cell: (row) => (
      <span
        className={`tb-status ml-1 text-${
          row.status === "Active"
            ? "success"
            : row.status === "Pending"
            ? "warning"
            : "danger"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

export const DataTableData = [
  {
    id: 0,
    name: "Fees",
    percentage: 24,
  },
  {
    id: 1,
    name: "Voting",
    percentage: 24,
  },
  {
    id: 2,
    name: "Fees",
    percentage: 24,
  },
];
