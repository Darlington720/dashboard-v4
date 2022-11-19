import React, { useEffect, useState } from "react";
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
import {
  DataTableData,
  dataTableColumns,
  dataTableColumns2,
  userData,
} from "./TableData";
import paginationFactory from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Row } from "reactstrap";
import constraintsApi from "../../../api/constraintsApi";

const DataTablePage = () => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [constraints, setConstraints] = useState([]);

  const getConstraints = async () => {
    const response = await constraintsApi.getContraints();

    if (!response.ok) {
      console.log("Failed to load constraints");
    }

    setConstraints(response.data);
  };

  useEffect(() => {
    getConstraints();
  }, []);

  return (
    <React.Fragment>
      <Head title="Constraint List" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Constraint List</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ToolkitProvider
              keyField="c_id"
              exportCSV
              data={constraints}
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
                  <BootstrapTable
                    striped
                    hover
                    condensed
                    {...props.baseProps}
                    pagination={paginationFactory()}
                    // expandRow={expandRow}
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
