import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import overlayFactory from "react-bootstrap-table2-overlay";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
} from "../../../components/Component";
// import {
//   DataTableData,
//   dataTableColumns,
//   dataTableColumns2,
//   userData,
// } from "./TableData";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Row } from "reactstrap";
import studentsApi from "../../../api/studentApi";

function rankFormatter(cell, row, rowIndex, formatExtraData) {
  return <p>{rowIndex + 1}</p>;
}

const dataTableColumns = [
  {
    dataField: "sl",
    text: "ID",
    sort: true,
    headerStyle: (column, colIndex) => {
      return {
        width: "80px",
      };
    },
    formatter: rankFormatter,
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
    dataField: "name",
    text: "Full Name",
    headerStyle: (column, colIndex) => {
      return {
        width: "200px",
      };
    },
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
    dataField: "stdno",
    text: "Stu No",
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
  {
    dataField: "r_time",
    text: "Time",
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
    // name: "Office",
    // selector: (row) => row.company,
    // sortable: true,
    // hide: "sm",
  },
  {
    dataField: "campus",
    text: "Campus",
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
  },
  {
    dataField: "userfull_name",
    text: "Registered By",
    minWidth: "900px",
    width: "900px",
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
    headerStyle: (column, colIndex) => {
      return {
        width: "180px",
      };
    },
    // name: "Time",
    // selector: (row) => row.salary,
    // sortable: true,
    // hide: "md",
  },
];

const DataTablePage = () => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadVoters = async (campus_id) => {
    setLoading(true);
    const res = await studentsApi.getVoters(campus_id);
    setLoading(false);
    if (!res.ok) {
      console.log("Failed to load the voters");
    }

    setVoters(res.data);
  };

  useEffect(() => {
    loadVoters(1);
  }, []);

  const NoDataIndication = () => (
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  );

  const expandRow = {
    renderer: (row) => (
      <div>
        <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
        <p>
          You can render anything here, also you can add additional data on
          every row object
        </p>
        <p>
          expandRow.renderer callback will pass the origin row object to you
        </p>
      </div>
    ),
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <b>-</b>;
      }
      return <b>+</b>;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return <b>-</b>;
      }
      return <b>+</b>;
    },
  };
  return (
    <React.Fragment>
      <Head title="Voters" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Voters</BlockTitle>
              {/* <p>
                Pass in the <code>actions</code> props to add export option to the table.
              </p> */}
              <p>{new Date().toDateString()}</p>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ToolkitProvider
              keyField="id"
              exportCSV
              data={voters}
              columns={dataTableColumns}
              search
            >
              {(props) => (
                <div>
                  {/* <h3>Input something at below input field:</h3> */}

                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                      }}
                    >
                      <SearchBar {...props.searchProps} />
                    </div>

                    <div
                      style={{
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ExportCSVButton {...props.csvProps}>
                        Export CSV!!
                      </ExportCSVButton>
                    </div>
                  </div>
                  {/* <hr /> */}
                  {/* <BootstrapTable
                    striped
                    hover
                    condensed
                    {...props.baseProps}
                    pagination={paginationFactory()}
                    // expandRow={expandRow}
                  /> */}
                  <BootstrapTable
                    striped
                    hover
                    condensed
                    // tabIndexCell
                    // remote
                    loading={loading}
                    {...props.baseProps}
                    pagination={paginationFactory()}
                    // expandRow={expandRow}

                    noDataIndication={"Table is empty"}
                    overlay={overlayFactory({
                      spinner: true,
                      styles: {
                        overlay: (base) => ({
                          ...base,
                          background: "lightblue",
                        }),
                      },
                    })}
                  />
                </div>
              )}
            </ToolkitProvider>
            {/* <BootstrapTable
              // bootstrap4
              keyField="id"
              striped
              hover
              condensed
              data={DataTableData}
              columns={dataTableColumns}
              pagination={paginationFactory()}
            /> */}
            {/* <ReactDataTable data={DataTableData} columns={dataTableColumns} expandableRows pagination actions /> */}
          </PreviewCard>
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
