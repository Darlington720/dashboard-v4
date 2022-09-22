import React from "react";
// import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import paginationFactory from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

function AppTable({ data, columns }) {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const expandRow = {
    renderer: (row) => (
      <div>
        <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p>
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
    <ToolkitProvider keyField="id" exportCSV data={data} columns={columns} search>
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
              <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
            </div>
          </div>
          {/* <hr /> */}
          <BootstrapTable
            striped
            hover
            condensed
            {...props.baseProps}
            pagination={paginationFactory()}
            expandRow={expandRow}
          />
        </div>
      )}
    </ToolkitProvider>
  );
}

export default AppTable;
