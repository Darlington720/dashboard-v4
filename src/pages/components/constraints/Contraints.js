import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
// import makeAnimated from "react-select/animated";
import { FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import Swal from "sweetalert2";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
  OverlineTitle,
  OutlinedInput,
  Icon,
} from "../../../components/Component";
import { defaultOptions, groupedData, colourData } from "./SelectData";
import { RSelect } from "../../../components/Component";
import constraintsApi from "../../../api/constraintsApi";
import { useDispatch } from "react-redux";
import actions from "../../../redux/actions/Actions";

function Contraints() {
  const [selectedItem, setSelectedItem] = useState();
  const [typedConstraint, setTypedConstraint] = useState("");
  const [constraints, setConstraints] = useState([]);
  const dispatch = useDispatch();

  //   const addConstraint = async (constraint) => {
  //     const res = await constraintsApi.addConstraint(constraint);
  //     if (!res.ok) {
  //       console.log("failed to add the constraint");
  //     }

  //     // successAlert();
  //   };

  const getConstraints = async () => {
    const response = await constraintsApi.getContraints();

    if (!response.ok) {
      console.log("Failed to load constraints");
    }
    let arr = [];

    response.data.forEach((constraint) => {
      arr.push({
        value: constraint.c_id,
        label: constraint.c_name,
      });
    });

    setConstraints(arr);
  };

  const updateConstraint = async (constraint) => {
    const res = await constraintsApi.updateConstraint(constraint);

    if (!res.ok) {
      console.log("failed to update the constraint");
    }

    // successAlert();
    // console.log("response", res.data);
  };

  const defaultOptions = [
    { value: constraints.c_id, label: constraints.c_name },
    // { value: "strawberry", label: "Strawberry" },
    // { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    getConstraints();
  }, []);

  const handleSuccess = () => {
    dispatch(actions.percentage(parseInt(typedConstraint)));
    const data = {
      c_id: selectedItem.value,
      c_name: selectedItem.label,
      c_percentage: parseInt(typedConstraint),
    };
    updateConstraint(data);
    console.log(data);
    setSelectedItem({ label: "", value: "" });
    setTypedConstraint("");
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Percentage Updated Successfully",
      focusConfirm: false,
    });
  };

  return (
    <React.Fragment>
      {/* {console.log("constraaints", constraints)} */}
      {/* {console.log(typedConstraint)} */}
      <Head title="Dashboard"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BlockTitle tag="h5" className="fw-normal">
              Constraints
            </BlockTitle>
          </BlockHeadContent>
        </BlockHead>
        <Block>
          <PreviewCard>
            <Row className="gy-4">
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Constraint</label>
                  <RSelect
                    options={constraints}
                    value={selectedItem}
                    onChange={(value) => setSelectedItem(value)}
                  />
                </div>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="default-0" className="form-label">
                    {"Percentage"}
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      id="default-0"
                      placeholder="Percentage"
                      value={typedConstraint}
                      onChange={(e) => setTypedConstraint(e.target.value)}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col xs="6" md="3">
                {/* <OverlineTitle tag="span" className="preview-title">
                  Primary
                </OverlineTitle> */}
                {/* <Button color="primary">Add</Button> */}
                <Button
                  color="primary"
                  className="eg-swal-default"
                  onClick={() => handleSuccess()}
                >
                  Set
                </Button>
              </Col>
              {/* <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Grouped</label>
                  <RSelect options={groupedData} />
                </div>
              </Col> */}
              {/* <Col sm={6}>
          <div className="form-group">
            <label className="form-label">Select Animated</label>
            <RSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultData={[colourData[0], colourData[1]]}
              isMulti
              options={colourData}
            />
          </div>
        </Col> */}
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
}

export default Contraints;
