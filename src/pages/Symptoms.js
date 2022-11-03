
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {baseURL} from "../routes";
import { Form } from '@themesberg/react-bootstrap';
import { Modal } from '@themesberg/react-bootstrap';

import ReactSpeedometer from "react-d3-speedometer"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
import { PageVisitsTable } from "./components/Tables";
// import { trafficShares, totalOrders } from "../../data/charts";

export default () => {

const [inputFields, setInputFields] = useState([
  {symptom: '', priority: ''}
])

const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const handleFormChange = (index, event) => {
  let data = [...inputFields];
  data[index][event.target.name] = event.target.value;
  setInputFields(data);
}

const addFields = () => {
  let newfield = { symptom: '', priority: '' }
  setInputFields([...inputFields, newfield])
}

const submit = (e) => {
  e.preventDefault();
  const data={
    "action": "liver_failure",
    "condition": "YES",
    "symptomsRequestList" : inputFields
  }

  axios.post(`${baseURL}/api/expert-system/condition&actionAdd`,data)
  .then(function (response) {
   console.log(response,"success")
   setShowDefault(true)
   setInputFields([{symptom: '', priority: ''}]);

  })
}

  const options = [
    { label: "Nausea", value: "nausea" },
    { label: "Change in mental status", value: "changes_in_mental_status" },
    { label: "musty or seeet breath odor", value: "musty_or_sweet_breath_odor" }, 
    { label: "Family Hepatitis", value: "Family Hepatitis" },
    { label: "Poor Vision", value: "PoorVision" },
    { label: "Vomiting blood", value: "vomiting_blood" },
    { label: "Hepatitis", value: "Hepatitis" },
    { label: "Jaundice", value: "jaundice" },
    { label: "Family Diabetes", value: "Family Diabetes" },
    { label: "Movement problems", value: "movement_problems" },
    { label: "Loss of appetite", value: "loss_of_appetite" },
    { label: "Extreme tiredness", value: "extreme_tiredness" },
    { label: "Bleeding", value: "bleeding" },
    { label: "General feeling of unwell", value: "general_feeling_of_unwell" },
    { label: "Alcohol Consumption", value: "Alcohol Consumption" },
    { label: "Disorientation", value: "disorientation" },
    { label: "Diabetes", value: "Diabetes" },
    { label: "Fluid buildup", value: "fluid buildup" },
    { label: "Diarrhea", value: "diarrhea" },
    { label: "Obesity", value: "Obesity" },


  ];

  
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">

      
       
<Button onClick={addFields} style={{float:"right"}}variant="primary" className="m-1"> <FontAwesomeIcon icon={faPlus} className="me-2" />add symptom</Button>


        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>
      </div>



      <Row className="justify-content-md-center">
        {/* <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col> */}
        &nbsp;

        <Form>
  <Form.Group className="mb-3">
  <Form.Label>Action</Form.Label>
    <Form.Select required >
      <option defaultValue>liver failure</option>
    </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3">
    <Form.Label>Condition</Form.Label>
    <Form.Select required >
      <option defaultValue>select</option>
      <option>Yes</option>
      <option>No</option>
    </Form.Select>  
  </Form.Group>

        {inputFields.map((input, index) => {
            return (
              <div style={{borderStyle:"outset"}}>
              <Form.Group  key={index} className="mb-3">
                <Form.Label>Symptom {index+1} name: </Form.Label>
                <Form.Control name="symptom" onChange={event => handleFormChange(index, event)}  type="text" value={input.symptom} placeholder="symptom name here" />
              </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Symptom {index+1} priority: </Form.Label>
            <Form.Select name="priority" value={input.priority} onChange={event => handleFormChange(index, event)} required >
            <option defaultValue >select</option>

              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </Form.Select>  
            </Form.Group>
            </div>
             )
        })}



</Form>

       
      </Row>

      <Row >
      <Button variant="primary" className="m-1" onClick={submit}>Submit</Button>


      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title className="h6">Success</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
      <p>successfully added the symptom.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={handleClose}>
        Okay
    </Button>
      {/* <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        Close
    </Button> */}
    </Modal.Footer>
  </Modal>
    
        {/* <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col> */}
      </Row>
    </>
  );
};
