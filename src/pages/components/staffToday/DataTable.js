import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
  UserAvatar,
} from "../../../components/Component";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import { findUpper } from "../../../utils/Utils";
import staffApi from "../../../api/staffApi";
import actions from "../../../redux/actions/Actions";
import urls from "../../../api/apiConstants";
import { useDispatch } from "react-redux";

const damiData = [
  {
    id: "1",
    name: "Mr Jude Lubega",
    role: "Administrative Assistant",
    siginin_time: "7:00AM",
    siginin_gate: "Nabageleka",
    siginined_in_by: "Akampa",

    // last: "Otto",
  },
  {
    id: "2",
    name: "Mr Jude Lubega",
    role: "Administrative Assistant",
    siginin_time: "7:00AM",
    siginin_gate: "Nabageleka",
    siginined_in_by: "Akampa",

    // last: "Otto",
  },
  {
    id: "3",
    name: "Mr Jude Lubega",
    role: "Administrative Assistant",
    siginin_time: "7:00AM",
    siginin_gate: "Nabageleka",
    siginined_in_by: "Akampa",

    // last: "Otto",
  },
];

const DataTablePage = () => {
  const [stafftoday, setStaffToday] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [staffImage, setStaffImage] = useState("");
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const dataTableColumns = [
    {
      name: "Staff",
      selector: (row) => row.staff_name,
      compact: true,
      grow: 2,
      style: { paddingRight: "10px" },
      cell: (row) => (
        <div className="user-card mt-2 mb-2 ml-2">
          <UserAvatar
            theme={row.avatarBg}
            text={findUpper(row.staff_name)}
            image={`${urls.baseUrl1}api/lecturer/image/${row.staff_id}`}
          ></UserAvatar>
          <div className="user-info">
            <span className="tb-lead">
              {row.staff_name}{" "}
              {/* <span
                className={`dot dot-${
                  row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
                } d-md-none ml-1`}
              ></span> */}
            </span>
            <span>{row.staff_role}</span>
          </div>
        </div>
      ),
      sortable: true,
    },

    // {
    //   name: "Name",
    //   selector: (row) => row.age,
    //   sortable: true,
    //   hide: 370,
    // },
    // {
    //   name: "Reason",
    //   selector: (row) => row.gender,
    //   sortable: true,
    //   hide: "sm",
    // },
    // {
    //   name: "Office",
    //   selector: (row) => row.company,
    //   sortable: true,
    //   hide: "sm",
    // },
    // {
    //   name: "Date",
    //   selector: (row) => row.date,
    //   sortable: true,
    //   hide: "md",
    // },
    {
      name: "Signin Time",
      selector: (row) => row.signin_time,
      sortable: true,
      hide: "md",
    },
    {
      name: "Temp",
      selector: (row) => row.temperature,
      sortable: true,
      hide: "md",
    },
    // {
    //   name: "Signin gate",
    //   selector: (row) => row.siginin_gate,
    //   sortable: true,
    //   hide: "md",
    // },
    {
      name: "signed in by",
      selector: (row) => row.userfull_name,
      sortable: true,
      hide: "md",
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <div
            style={{
              // backgroundColor: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              to={`${process.env.PUBLIC_URL}/staffMemberDetails`}
              className="edit-button"
              style={{ color: "black" }}
            >
              <FontAwesomeIcon
                icon={faEye}
                color="#000"
                size="lg"
                style={{
                  cursor: "pointer",
                }}
                // onClick={() => handleView(row)}
                onClick={() => {
                  console.log("row clicked", row);
                  dispatch(actions.getRowData(row));
                }}
              ></FontAwesomeIcon>
            </Link>
          </div>
        </>
      ),
    },
  ];

  const loadStaffToday = async () => {
    const res = await staffApi.getAllStaffToday();
    if (!res.ok) {
      setHasError(true);
      console.log("Failed to get staff members");
    }

    setStaffToday(res.data);
  };

  // useEffect(() => {
  //   let defaultData = stafftoday;
  //   if (searchText !== "") {
  //     defaultData = data.filter((item) => {
  //       return item.staff_name.toLowerCase().includes(searchText.toLowerCase());
  //     });
  //     setTableData(defaultData);
  //   } else {
  //     setTableData(data);
  //   }
  // }, [searchText]);

  useEffect(() => {
    loadStaffToday();
  }, []);
  return (
    <React.Fragment>
      <Head title="Basic Tables" />
      <Content page="component">
        <Block size="lg">
          {hasError ? (
            <h1>Server Error</h1>
          ) : (
            <>
              <BlockHead>
                <BlockHeadContent>
                  {console.log("Staff", stafftoday)}
                  <BlockTitle tag="h4">Staff Today</BlockTitle>
                  {/* <p>
                Pass in the <code>actions</code> props to add export option to the table.
              </p> */}
                  <p>{new Date().toDateString()}</p>
                </BlockHeadContent>
              </BlockHead>

              <PreviewCard>
                {/* <ReactDataTable data={DataTableData} columns={dataTableColumns} expandableRows pagination actions /> */}
                <ReactDataTable
                  data={stafftoday}
                  columns={dataTableColumns}
                  pagination
                  className="nk-tb-list"
                />
              </PreviewCard>
            </>
          )}
        </Block>

        {/* <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">DataTable with custom markup</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ReactDataTable
              data={userData}
              columns={dataTableColumns2}
              pagination
              className="nk-tb-list"
              selectableRows
            />
          </PreviewCard>
        </Block> */}
      </Content>
    </React.Fragment>
  );
};
export default DataTablePage;
