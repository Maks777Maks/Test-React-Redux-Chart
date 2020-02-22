import React from "react";
import classNames from "classnames";
import { Line } from "react-chartjs-2";
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  ButtonGroup,
  Button
} from "reactstrap";

let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};

class PersonsChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      isLoading: true,
      tmp_year: { value: '2020', label: '2020р' },   
    };
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue }, this.filterSearchData);
  }

  filterSearchData = () => {
    const { tmp_year } = this.state;
    let year = tmp_year.value;
    this.props.getPersonsData({ year });
  }

  componentDidMount = () => {
    const { tmp_year } = this.state;
    let year = tmp_year.value;
    this.props.getPersonsData({ year });
  }


  render() {
    let chartExample1 = {
      data1: canvas => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    
        return {
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
          ],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data:this.props.listData
            }
          ]
        };
      },
      options: chart1_2_options
    }
  
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Реєстрація</h5>
                      <CardTitle tag="h2">Графік</CardTitle>
                    </Col>                 
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Реєстрації
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        </ButtonGroup>
                        </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div>
        </React.Fragment>
          
          );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    listData: get(state, "registryShedule.list.data"),
    isListLoading: get(state, "registryShedule.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonsData: filter => {
      dispatch(getListActions.getPersonsData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonsChart);