
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {baseURL, pythonURL} from "../../routes";
import { MultiSelect } from "react-multi-select-component";
import ReactSpeedometer from "react-d3-speedometer";
import Chart from 'react-apexcharts'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

export default () => {
  const [selected, setSelected] = useState([]);
  const [conditionValue, setConditionValue] = useState([]);
  const [apexSeries, setApexSeries] = useState([]);
  const [pieSeries, setPieSeries] = useState([]);



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


  const apexOptions =  {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['obesity', 'dyslipidemia', 'pvd', 'alcohol_consumption', 'hypertension', 'familyhypertension',
      'diabetes', 'family_diabetes', 'hepatitis', 'family_hepatitis', 'chronic_fatigue', 'alf']
    },
    colors: ["#008FFB"],
    title: {
      text: 'Heat Map Chart'
    },
  }

  useEffect(()=>{

    let res = selected.map(({label, value}) => (value));
    const data = {
      "action": "liver_failure",
      "condition": "YES",
      "symptoms":res
    }

    
    axios.get(`${pythonURL}/expert-system/get-symptoms-ratio?isAlf=true`)
    .then(function (response) {
      var pieData = []
      response.data.payload.forEach((e,i)=>
      {
        pieData = [...pieData,{
          id: i+1, 
          label: e.symptoms, 
          value: e.ratioTrue, 
          // color: "secondary", 
       }]
       }
      )
      setPieSeries(pieData)


    //  console.log(pieData)
    })

      axios.get(`${pythonURL}/expert-system/get-symptoms-corr`)
      .then(function (response) {
        var apexData = []
       response.data.payload.forEach((e,i)=>
       {
         apexData = [...apexData,{
          name: `metric ${i+1}`,
          data: e
        }]
        }
       )
       setApexSeries(apexData)
      })
  


    axios.post(`${baseURL}/api/expert-system/condition&action`,data,{
      params: {
        "addFlag":false,
      }
      
    })
    .then(function (response) {
      if(response.data.code == "Success"){
        setConditionValue({chances_ratio:response.data.payload.chancesRatio, symptoms_ratio:response.data.payload.symptomsRatio})
      }
      else{
        setConditionValue({chances_ratio:0, symptoms_ratio:0})
      }
    })
  },[selected])
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        {/* <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>
      </div>

      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>


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

        <Col sm={4}  className="mb-4">
        <ReactSpeedometer
            maxValue={100}
            value={conditionValue.symptoms_ratio}
            segments={10}
            currentValueText="Symptoms ratio"
            startColor="green"
            endColor="red"

          />
        </Col>

        <Col  sm={4}  className="mb-4">
        <ReactSpeedometer
            maxValue={100}
            value={conditionValue.chances_ratio}
            segments={10}
            currentValueText="Chances ratio"
            startColor="green"
            endColor="red"
            

          />

        </Col>

        <Col  sm={8}  className="mb-4">
          <CircleChartWidget data={pieSeries} title="symptoms" />
        </Col>

        <Col  sm={10}  className="mb-4">
          <Chart options={apexOptions} series={apexSeries} type="heatmap" height={350} />
        </Col>

      </Row>

      <Row>
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
