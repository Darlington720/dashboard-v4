import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
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
} from "../../../components/Component";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import paginationFactory from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Row } from "reactstrap";

// const customTotal = (from, to, size) => (
//   <span className="react-bootstrap-table-pagination-total">
//     Showing {from} to {to} of {size} Results
//   </span>
// );

// const options = {
//   paginationSize: 4,
//   pageStartIndex: 0,
//   // alwaysShowAllBtns: true, // Always show next and previous button
//   // withFirstAndLast: false, // Hide the going to First and Last page button
//   // hideSizePerPage: true, // Hide the sizePerPage dropdown always
//   // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
//   firstPageText: "First",
//   prePageText: "Back",
//   nextPageText: "Next",
//   lastPageText: "Last",
//   nextPageTitle: "First page",
//   prePageTitle: "Pre page",
//   firstPageTitle: "Next page",
//   lastPageTitle: "Last page",
//   showTotal: true,
//   paginationTotalRenderer: customTotal,
//   disablePageTitle: true,
//   sizePerPageList: [
//     {
//       text: "5",
//       value: 5,
//     },
//     {
//       text: "10",
//       value: 10,
//     },
//     {
//       text: "All",
//       value: products.length,
//     },
//   ], // A numeric array is also available. the purpose of above example is custom the text
// };

const DataTablePage = () => {
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
    <React.Fragment>
      <Head title="Basic Tables" />
      <Content page="component">
        {/* <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BackTo link="/components" icon="arrow-left">
              Components
            </BackTo>
            <BlockTitle tag="h2" className="fw-normal">
              DataTable Example
            </BlockTitle>
            <BlockDes>
              <p className="lead">
                The tables in this section has used the{" "}
                <a href="https://react-data-table-component.netlify.app/" target="_blank" rel="noreferrer">
                  React-Data-Table-Component
                </a>{" "}
                package. Visit the{" "}
                <a href="https://react-data-table-component.netlify.app/" target="_blank" rel="noreferrer">
                  documentation
                </a>{" "}
                for further understanding. The plugin has been customized for the purpose of React Dashlite.
              </p>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead> */}

        {/* <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">DataTable Default</BlockTitle>
              <p>
                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for react dashlite.
              </p>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ReactDataTable data={DataTableData} columns={dataTableColumns} expandableRows pagination />
          </PreviewCard>
        </Block> */}

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Visitors Today</BlockTitle>
              {/* <p>
                Pass in the <code>actions</code> props to add export option to the table.
              </p> */}
              <p>22 August 2022</p>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ToolkitProvider keyField="id" exportCSV data={DataTableData} columns={dataTableColumns} search>
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
