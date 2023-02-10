import React, { Component } from "react";
import "./App.css";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import * as XLSX from "xlsx";
import Content from "../../../layout/content/Content";
import Icon from "../../../components/icon/Icon";
import { Alert } from "reactstrap";
import Head from "../../../layout/head/Head";
import { Spinner } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
} from "../../../components/Component";
import {
  Jumbotron,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Label,
  Button,
  Fade,
  FormFeedback,
  Container,
  Card,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import staffApi from "../../../api/staffApi";
import { get } from "react-hook-form";

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const CloseButton = () => {
  return (
    <span className="btn-trigger toast-close-button" role="button">
      <Icon name="cross"></Icon>
    </span>
  );
};

const CustomToast = ({ success, message }) => {
  return (
    <div className="toastr-text">
      <h5>{success ? "Uploaded Successfully" : "Upload Failed"}</h5>
      <p>{message}</p>
    </div>
  );
};

const messageToast = (success, message) => {
  toast.success(<CustomToast message={message} success={success} />, {
    position: "top-center",
    autoClose: 2000,

    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: false,
    closeButton: <CloseButton />,
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
      file: null,
      excelObj: null,
      loading: false,
      lastUploadedDateAndTime: "",
      uploadedDateLoading: false,
    };
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.openNewPage = this.openNewPage.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.getLastUpload();
  }

  renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      const reader = new FileReader();

      // when the file is loaded, parse it with SheetJS
      // reader.onload = (event) => {
      //   const data = event.target.result;
      //   const workbook = XLSX.read(data, { type: "binary" });
      //   const firstSheetName = workbook.SheetNames[0];
      //   const worksheet = workbook.Sheets[firstSheetName];
      //   const sheetData = XLSX.utils.sheet_to_json(worksheet);
      //   // console.log("Results from excel", sheetData);
      //   this.setState({
      //     excelObj: sheetData,
      //   });
      //   // setData(sheetData);
      // };

      // reader.readAsBinaryString(fileObj);

      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf(".") + 1) === "xlsx") {
        this.setState({
          uploadedFileName: fileName,
          file: fileObj,
          isFormInvalid: false,
        });
        this.renderFile(fileObj);
      } else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: "",
        });
      }
    }
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  };

  openNewPage = (chosenItem) => {
    const url =
      chosenItem === "github"
        ? "https://github.com/ashishd751/react-excel-renderer"
        : "https://medium.com/@ashishd751/render-and-display-excel-sheets-on-webpage-using-react-js-af785a5db6a7";
    window.open(url, "_blank");
  };

  handleUpload = async (e) => {
    e.preventDefault();
    // console.log(this.state.file);

    let objToSend = {};

    const formData = new FormData();

    // console.log("The data i shud send", { ...this.state.excelObj[0]["stdno"] });

    this.setState({
      loading: true,
    });

    formData.append("excelFile", this.state.file);
    // formData.append("excelObj", modifiedArray);

    // console.log("FormData", formData);
    // this.state.excelObj.forEach((o) => {
    //   objToSend = { ...o };
    // });

    // console.log("The data i shud send", modifiedArray[0].stdno);

    const res = await staffApi.importExcelToDB(formData);

    this.setState({
      loading: false,
    });

    if (!res.ok) {
      console.log("failed to post the excel to server");
      return;
    }

    console.log(res.data); 

    if (res.data.success) {
      messageToast(res.data.success, res.data.message);
      this.getLastUpload();
    } else {
      toast.error(
        <CustomToast success={res.data.success} message={res.data.message} />,
        {
          position: "top-center",
          autoClose: 2000,

          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
          closeButton: <CloseButton />,
        }
      );
    }
  };

  getLastUpload = async () => {
    this.setState({
      uploadedDateLoading: true,
    });
    const res = await staffApi.getLastUploadedDateAndTime();

    this.setState({
      uploadedDateLoading: false,
    });

    if (!res.ok) {
      console.log("Failed to get the last uploaded date and time");
    }

    // console.log("Data", res.data);
    this.setState({
      lastUploadedDateAndTime: res.data.upload_date,
    });
  };

  render() {
    return (
      <div
        style={{
          marginTop: 60,
        }}
      >
        <Head title="Upload Finance Data" />
        <Content page="component">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Upload File</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <form onSubmit={this.handleUpload}>
              <FormGroup row>
                <Col xs={12} sm={12} lg={12}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Button
                        color="primary"
                        style={{ color: "white", zIndex: 0 }}
                        onClick={this.openFileBrowser.bind(this)}
                      >
                        <i className="cui-file"></i> Browse&hellip;
                      </Button>
                      <input
                        type="file"
                        hidden
                        onChange={this.fileHandler.bind(this)}
                        ref={this.fileInput}
                        onClick={(event) => {
                          event.target.value = null;
                        }}
                        style={{ padding: "10px" }}
                      />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      className="form-control"
                      value={this.state.uploadedFileName}
                      readOnly
                      invalid={this.state.isFormInvalid}
                    />
                    <FormFeedback>
                      <Fade
                        in={this.state.isFormInvalid}
                        tag="h6"
                        style={{ fontStyle: "italic" }}
                      >
                        Please select a .xlsx file only !
                      </Fade>
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>
              {this.state.dataLoaded && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      margin: "auto",
                      width: "100%",
                      // border: "3px solid green",
                      // padding: 10,
                    }}
                  >
                    <Card
                      body
                      outline
                      color="secondary"
                      className="restrict-card"
                    >
                      <OutTable
                        data={this.state.rows}
                        columns={this.state.cols}
                        tableClassName="ExcelTable2007"
                        tableHeaderRowClass="heading"
                      />
                    </Card>
                  </div>
                  <div
                    style={{
                      alignSelf: "center",
                      marginTop: 10,
                    }}
                  >
                    <Button
                      color="primary"
                      type="submit"
                      style={{
                        width: 140,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.loading ? (
                        <Spinner
                          style={{
                            textAlign: "center",
                          }}
                          size="sm"
                        />
                      ) : (
                        "Confirm Upload"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </PreviewCard>
          <div
            style={{
              marginTop: 5,
              display: "flex",
              justifyContent: "center",
              // margin: "auto",
              // width: "50%",
            }}
          >
            <Alert
              // className="alert-icon"
              color="primary"
              style={{
                padding: 5,
                width: "auto",
                fontSize: 13,
              }}
            >
              {/* <Icon name="alert-circle" /> */}
              <strong>Last Uploaded:</strong>{" "}
              {this.state.uploadedDateLoading ? (
                <Spinner
                  style={{
                    textAlign: "center",
                  }}
                  size="sm"
                  type="grow"
                />
              ) : (
                `${new Date(
                  this.state.lastUploadedDateAndTime
                ).toDateString()} at ${new Date(
                  this.state.lastUploadedDateAndTime
                ).toLocaleTimeString()}`
              )}
            </Alert>
          </div>
        </Content>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
