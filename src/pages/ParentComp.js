import React from "react";
import ChainData from "../components/ChainData";
import { withStyles } from "@material-ui/core";
import { Col, Collapse, Layout, Row, Typography } from "antd";
import Chart from "../components/charts/DashboardLineChart";
import ItemsPanel from "../components/ItemsPanel";
import { CalcBScholes } from "../utils/Bscholes";
import { GithubOutlined } from "@ant-design/icons";
import OptionsForm from "../components/OptionsForm";
import OptionsDrawer from "../components/OptionsDrawer";
import Colors from "../utils/Colors";
import uuidv4 from "../utils/GuidGen";
import { compose } from "recompose";

const useRowStyles = (theme) => ({
  chartz: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    marginLeft: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },

  chartGrid: {
    backgroundColor: Colors.Tables,
    padding: theme.spacing(1),
    flexDirection: "row",
    flex: 1,
    maxHeight: "auto",
  },
});

const mainObj = [
  {
    type: "call",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 455,
    expiration: 25,
    interestFree: 0.02,
    volatility: 20,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: uuidv4(),
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 2,
  },
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 25,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: uuidv4(),
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 465,
    expiration: 25,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: uuidv4(),
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

export class ParentComp extends React.Component {
  constructor(props) {
    super(props);
    mainObj.forEach((element) => {
      //create identity for each order
      element.GUID = uuidv4();
    });

    this.state = {
      checksList: mainObj, //current options
      currentEditGuid: mainObj[0].GUID, //GUID to access checksList
      calculatedPriceData: [[]], //final calcs for Charts
      formattedData: [],
    };
    this.addData = this.addData.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.getGuid = this.getGuid.bind(this);
  }

  addData(val) {
    var result = this.state.checksList.find((obj) => {
      return obj.GUID === val.GUID;
    });

    if (!result) {
      return () => {
        this.setState({
          checksList: this.state.checksList.concat(val),
        });
      };
    }
  }

  clearSelected() {
    var newObjec = [
      {
        type: "call",
        buySell: "buy",
        stockPrice: 450,
        strikePrice: 455,
        expiration: 5,
        interestFree: 0.02,
        volatility: 25,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: uuidv4(),
        isEditing: false,
        priceArray: [[]],
        numberOfContracts: 1,
      },
    ];
    this.setState({
      checksList: newObjec,
      currentEditGuid: newObjec[0].GUID,
    });
  }

  //returns current object related to state GUID
  getCurrentOptionObj() {
    var result = this.state.checksList.find((obj) => {
      return obj.GUID === this.state.currentEditGuid;
    });
    return result;
  }

  replaceOptionData(arrayCopy, replaceObj) {
    let index = arrayCopy.findIndex((x) => x.GUID === replaceObj.GUID);

    arrayCopy[index] = replaceObj;

    return arrayCopy;
  }

  componentDidMount() {
    //var r;
    //  fetch("https://localhost:44321/api/optionsdata")
    //  //fetch("https://api.maharristhepug.com/api/optionsdata")
    //  .then(response => response.json())
    //  .then(data => r = data)
    //  .then(() => this.getRes(r))
    //.then(data => console.log("API-DATA: " + data.symbol));
    try {
      let checksList = JSON.parse(localStorage.getItem("checksList"));
      let cg = JSON.parse(localStorage.getItem("currentEditGuid"));
      if (cg && checksList !== null)
        this.setState(
          { checksList: checksList, currentEditGuid: cg },
          this.calcData
        );
    } catch {
      localStorage.clear();
    }
  }

  //get form edit data
  getFormData(val) {
    var indexFound = -1;
    for (let i = 0; i < this.state.checksList.length; i++) {
      if (this.state.checksList[i].GUID === val.GUID) {
        indexFound = i;
        break;
      }
    }

    if (indexFound === -1) {
      //add
      this.setState(
        {
          checksList: this.state.checksList.concat(val),
        },
        this.calcData
      );
    } else {
      var newState = this.state.checksList;
      newState[indexFound] = val;
      this.setState(
        {
          checksList: newState,
        },
        this.calcData
      );
    }
  }

  //get guid for selected row to edit
  getGuid(e, row) {
    var result = this.state.checksList.find((obj) => {
      return obj.GUID === row.target.value;
    });
    this.setState({
      currentEditGuid: result.GUID,
    });
  }

  deleteRow(e, row) {
    const inputGuid = row.currentTarget.value;
    if (inputGuid === this.state.currentEditGuid) {
      if (this.state.checksList.length > 1) {
        const G = this.state.checksList[1].GUID;
        var result = this.state.checksList.find((obj) => {
          return obj.GUID === G;
        });
        this.setState(
          {
            currentEditGuid: result.GUID,
            checksList: this.state.checksList.filter(
              (x) => x.GUID !== inputGuid
            ),
          },
          this.calcData
        );
      }
    } else {
      this.setState(
        {
          checksList: this.state.checksList.filter((x) => x.GUID !== inputGuid),
        },
        this.calcData
      );
    }
  }

  calcData() {
    var a = CalcBScholes(this.state.checksList);
    this.setState({
      formattedData: a,
    });
  }

  componentDidUpdate() {
    localStorage.setItem("checksList", JSON.stringify(this.state.checksList));
    localStorage.setItem(
      "currentEditGuid",
      JSON.stringify(this.state.currentEditGuid)
    );
  }

  updateStrategy(newObject) {
    this.clearSelected();
    newObject.forEach((element) => {
      //create identity for each order
      element.GUID = uuidv4();
    });
    this.setState(
      {
        checksList: newObject,
        currentEditGuid: newObject[0].GUID,
      },
      this.calcData
    );
  }

  render() {
    const { classes } = this.props;
    const { Content, Header, Footer } = Layout;
    const { Panel } = Collapse;
    const { Title } = Typography;
    return (
      <Layout>
        <OptionsDrawer
          className={classes.drawer}
          updateStrategy={(obj, val) => this.updateStrategy(obj, val)}
          toggleDataMode={this.props.toggleDataMode}
          dataModeState={this.props.dataModeState}
          tdKey={this.props.tdKey}
        />
        <Layout>
          <Header className='site-layout-background' style={{ padding: 0 }} />
          <Content
            className='site-layout-background'
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Chart formattedData={this.state.formattedData} />
            <Collapse
              defaultActiveKey={["1"]}
              defaultExpanded={true}
              ghost={true}
              expandIconPosition='right'
            >
              <Panel
                header={
                  <Row gutter={16}>
                    <Col span={24}>
                      <Title level={4} style={{ fontWeight: "300" }}>
                        Selected Options
                      </Title>
                    </Col>
                  </Row>
                }
                key='1'
              >
                <ItemsPanel
                  classes={classes}
                  clearSelected={() => this.clearSelected()}
                  getGuid={(e, val) => this.getGuid(val, e)}
                  calculateOptionsPrice={() => this.calculateOptionsPrice()}
                  currentEditGuid={this.state.currentEditGuid}
                  checksList={this.state.checksList}
                  deleteRow={(e, val) => this.deleteRow(val, e)}
                />
              </Panel>
              <Panel
                header={
                  <Row gutter={16}>
                    <Col span={24}>
                      <Title level={4} style={{ fontWeight: "300" }}>
                        Add/Edit Options
                      </Title>
                    </Col>
                  </Row>
                }
                key='2'
              >
                <OptionsForm
                  getFormData={(val) => this.getFormData(val)}
                  currentEditGuid={this.state.currentEditGuid}
                  checksList={this.state.checksList}
                />
              </Panel>
              <Panel
                header={
                  <Row gutter={16}>
                    <Col span={24}>
                      <Title level={4} style={{ fontWeight: "300" }}>
                        Call
                      </Title>
                    </Col>
                  </Row>
                }
                key='3'
              >
                <ChainData
                  checksList={this.state.checksList}
                  addDataFunc={(val) => this.addData(val)}
                  rowData={this.state.rowData}
                  optionType={"Call"}
                  classes={classes}
                />
              </Panel>
              <Panel
                header={
                  <Row gutter={16}>
                    <Col span={24}>
                      <Title level={4} style={{ fontWeight: "300" }}>
                        Put
                      </Title>
                    </Col>
                  </Row>
                }
                key='4'
              >
                <ChainData
                  checksList={this.state.checksList}
                  addDataFunc={(val) => this.addData(val)}
                  rowData={this.state.rowData}
                  optionType={"Put"}
                  classes={classes}
                />
              </Panel>
            </Collapse>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <a href={"https://github.com/Joas3068/OptionsProfitCalculator"}>
              <GithubOutlined style={{ fontSize: "2rem", color: "#343a3f" }} />{" "}
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default compose(withStyles(useRowStyles))(ParentComp);
