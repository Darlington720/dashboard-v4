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
} from "../../../components/Component";
import { Route, Switch, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { DataTablePagination } from "../../../components/Component";
import actions from "../../../redux/actions/Actions";
import studentApi from "../../../api/studentApi";
import { Col, Modal, ModalBody, Row, Button } from "reactstrap";

// import { DataTableData, dataTableColumns } from "./TableData";

const Export = ({ data }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button className="buttons-copy buttons-html5" onClick={() => copyToClipboard()}>
              <span>Copy</span>
            </Button>
          </CopyToClipboard>{" "}
          <button className="btn btn-secondary buttons-csv buttons-html5" type="button" onClick={() => exportCSV()}>
            <span>CSV</span>
          </button>{" "}
          <button className="btn btn-secondary buttons-excel buttons-html5" type="button" onClick={() => exportExcel()}>
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data ? data.length : 0} rows to clipboard</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const ExpandableRowComponent = ({ data }) => {
  return (
    <ul className="dtr-details p-2 border-bottom ml-1">
      <li className="d-block d-sm-none">
        <span className="dtr-title">Company</span> <span className="dtr-data">{data.company}</span>
      </li>
      <li className="d-block d-sm-none">
        <span className="dtr-title ">Gender</span> <span className="dtr-data">{data.gender}</span>
      </li>
      <li>
        <span className="dtr-title">Start Date</span> <span className="dtr-data">{data.startDate}</span>
      </li>
      <li>
        <span className="dtr-title">Salary</span> <span className="dtr-data">{data.salary}</span>
      </li>
    </ul>
  );
};

const CustomCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-control-sm custom-checkbox notext">
    <input
      id={rest.name}
      type="checkbox"
      className="custom-control-input form-control"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="custom-control-label" htmlFor={rest.name} />
  </div>
));

const DataTablePage = () => {
  const stu = [
    {
      Address: null,
      DOB: null,
      admissions_form_no: "F20001002027",
      campus: "MAIN",
      current_sem: "2",
      email: null,
      entry_ac_yr: "2020/2021",
      entry_study_yr: "1",
      facultycode: "SBA",
      facultytitle: "SCHOOL OF BUSINESS  AND INFORMATION TECHNOLOGY",
      for_wc_cu: null,
      gendar: "Male",
      id: 14,
      intake: "FEBRUARY",
      is_class_rep: null,
      name: "MUGENYI ABDUL BASET",
      nationality: "UGANDAN",
      password: "NUSG001",
      percentage: null,
      phoneNo: null,
      progduration: "3",
      programlevel: "BAC",
      progtitle: "BACHELOR OF SCIENCE IN COMPUTER SCIENCE",
      regno: "2021/FEB/BCS/B228027/DAY",
      residence_status: "NON-RESIDENT",
      role: "Askari",
      sex: "M",
      signed_in_by: 14,
      signin_date: " 2022-08-23",
      signin_time: "08:20:31",
      sponsorship: "PRIVATE",
      stdno: "2000101519",
      stu_id: 2000101519,
      stu_no: "NUSG001",
      stu_status: null,
      study_time: "DAY",
      study_yr: "2",
      telno: "+256708524529",
      temperature: 18,
      user_image: "NUSG001",
      userfull_name: "MAJOR KIGUULI GERALD",
      username: "NUSG001",
    },
  ];
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [students, setStudents] = useState([]);
  const [tableData, setTableData] = useState(students);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPageS, setRowsPerPage] = useState(10);
  const [mobileView, setMobileView] = useState();
  const [pending, setPending] = useState(false);

  const getAllStudentDetails = async (studentNo) => {
    try {
      const res = await studentApi.getForSpecificStudent(studentNo);
      if (!res.ok) {
        setHasError(true);
        console.log("Failed to get today's details");
      }

      dispatch(actions.getDetailsForStudent(res.data));
    } catch (error) {
      alert("There is a problem with the server");
    }
  };

  const handleView = (row) => {
    getAllStudentDetails(row.stu_id);

    // console.log("result ", result);
  };

  const dataTableColumns = [
    // {
    //   name: "ID",
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: "Full Name",
      width: "200px",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Stu No",
      selector: (row) => row.stdno,
      sortable: true,
      hide: 370,
    },
    {
      name: "Date",
      selector: (row) => row.signin_date,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Time",
      selector: (row) => row.signin_time,
      sortable: true,
      hide: "sm",
    },
    // {
    //   name: "Time",
    //   selector: (row) => row.startDate,
    //   sortable: true,
    //   hide: "md",
    // },
    {
      name: "Temp",
      selector: (row) => row.temperature,
      width: "100px",
      sortable: true,
      hide: "md",
    },
    {
      name: "Signed in by",
      selector: (row) => row.userfull_name,
      sortable: true,
      hide: "md",
    },
    // {
    //   name: "Action",
    //   selector: (row) => row.salary,
    //   sortable: true,
    //   hide: "md",
    //   // cell: () => <Button>Download Poster</Button>,
    // },
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
              to={`${process.env.PUBLIC_URL}/user-profile-activity`}
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
                onClick={() => handleView(row)}
                //onClick={() => {console.log("row clicked", row)}}
              ></FontAwesomeIcon>
            </Link>
          </div>
        </>
      ),
    },
  ];

  const loadTodaysStudents = async () => {
    try {
      setPending(true);
      const res = await studentApi.getAllStudents();
      setPending(false);
      if (!res.ok) {
        setHasError(true);
        console.log("Failed to get students");
      }

      setStudents(res.data);
    } catch (error) {
      setHasError(true);
      // alert("There is an unknown problem with the server");
    }
    // console.log(res.data);
  };

  useEffect(() => {
    loadTodaysStudents();
  }, []);

  useEffect(() => {
    let defaultData = students;
    if (searchText !== "") {
      defaultData = students.filter((item) => {
        return item.stdno.toLowerCase().includes(searchText.toLowerCase());
      });
      setStudents(defaultData);
    } else {
      // setStudents(students);
      loadTodaysStudents();
    }
  }, [searchText]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 960 && expandableRows) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Head title="Students Today" />
      {/* {console.log("Students", students)} */}
      <Content page="component">
        <Block size="lg">
          {hasError ? (
            <h1>Server Error</h1>
          ) : (
            <>
              <BlockHead>
                <BlockHeadContent>
                  <BlockTitle tag="h4">Students Today</BlockTitle>
                  <p>
                    {/* {" Pass in the <code>actions</code> props to add export option to the table."} */}
                    {"22 August 2021"}
                  </p>
                </BlockHeadContent>
              </BlockHead>

              <PreviewCard>
                {/* <ReactDataTable data={students} columns={dataTableColumns} expandableRows pagination actions /> */}
                <div className={`dataTables_wrapper dt-bootstrap4 no-footer`}>
                  <Row className={`justify-between g-2 with-export`}>
                    <Col className="col-7 text-left" sm="4">
                      <div id="DataTables_Table_0_filter" className="dataTables_filter">
                        <label>
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder="Search by Student Number"
                            onChange={(ev) => setSearchText(ev.target.value)}
                          />
                        </label>
                      </div>
                    </Col>
                    <Col className="col-5 text-right" sm="8">
                      <div className="datatable-filter">
                        <div className="d-flex justify-content-end g-2">
                          {<Export data={students} />}
                          <div className="dataTables_length" id="DataTables_Table_0_length">
                            <label>
                              <span className="d-none d-sm-inline-block">Show</span>
                              <div className="form-control-select">
                                {" "}
                                <select
                                  name="DataTables_Table_0_length"
                                  className="custom-select custom-select-sm form-control form-control-sm"
                                  onChange={(e) => setRowsPerPage(e.target.value)}
                                  value={rowsPerPageS}
                                >
                                  <option value="10">10</option>
                                  <option value="25">25</option>
                                  <option value="40">40</option>
                                  <option value="50">50</option>
                                </select>{" "}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <DataTable
                    keyField="stdno"
                    data={students}
                    progressPending={pending}
                    columns={dataTableColumns}
                    // className={className}
                    // selectableRows={selectableRows}
                    selectableRowsComponent={CustomCheckbox}
                    striped
                    highlightOnHover
                    expandableRowsComponent={ExpandableRowComponent}
                    expandableRows={mobileView}
                    noDataComponent={<div className="p-2">There are no records found</div>}
                    sortIcon={
                      <div>
                        <span>&darr;</span>
                        <span>&uarr;</span>
                      </div>
                    }
                    pagination={true}
                    paginationPerPage={10}
                    // paginationComponent={({ currentPage, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage }) => (
                    //   <DataTablePagination
                    //     customItemPerPage={rowsPerPageS}
                    //     itemPerPage={rowsPerPage}
                    //     totalItems={rowCount}
                    //     paginate={onChangePage}
                    //     currentPage={currentPage}
                    //     onChangeRowsPerPage={onChangeRowsPerPage}
                    //     setRowsPerPage={setRowsPerPage}
                    //   />
                    // )}
                  ></DataTable>
                </div>
              </PreviewCard>
            </>
          )}
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default DataTablePage;
