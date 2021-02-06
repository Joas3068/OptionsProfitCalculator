import React from "react";
import {
  Divider,
  Grid,
  withStyles,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import Chart from "../components/charts/DashboardLineChart";
import GitHubIcon from "@material-ui/icons/GitHub";
import OptionsDrawer from "../components/OptionsDrawer";
import Colors from "../utils/Colors";
import ChainData from "../components/ChainData";
import SelectedTdData from "../components/SelectedTdData";
import { CalcBScholesTdData } from "../utils/Bscholes";
import TdDataSelection from "../components/TdDataSelection";
import { compose } from "recompose";

const useRowStyles = (theme) => ({
  root: {
    margin: theme.spacing(1),
    // display: "table",
    backgroundColor: Colors.Primary,
    "& > *": {
      borderBottom: "unset",
    },
  },
  title: {
    flexGrow: 1,
  },
  table: {
    backgroundColor: "#dde7ed",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    display: "block",
  },
  drawer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },

  chainGrid: {
    maxHeight: "auto",
    display: "flex",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  chartGrid: {
    backgroundColor: Colors.Tables,
    padding: theme.spacing(1),
    display: "block",

    flexDirection: "row",
    flex: 1,
    maxHeight: "auto",
  },
  alignGridItems: {},
  fixedHeight: {
    height: 300,
  },

  expPanelChain: {
    //active, Controls all expansion panel
    backgroundColor: "#cccccc",
    overflow: "auto",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  chainDataTable: {
    backgroundColor: "#e6e6e6",
  },
  tableCellTrue: {
    //active
    backgroundColor: "#6aab72",
  },
  tableCellFalse: {
    //active
    backgroundColor: "#c74444",
  },
  addButton: {
    margin: theme.spacing(1),
  },
});

class TdDataMode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTdData: [],
      tdData: {},
      formattedData: [],
    };
    this.sendObject = this.sendObject.bind(this);
    this.getNewData = this.getNewData.bind(this);
    this.getPreviousChainData = this.getPreviousChainData.bind(this);
  }

  componentWillMount() {
    // const stringReq =
    //   "https://api.tdameritrade.com/v1/marketdata/chains?apikey=" +
    //   this.props.tdKey +
    //   "&symbol=SPY&strikeCount=6&fromDate=" +
    //   formatDate(new Date()) +
    //   "&toDate=" +
    //   this.state.endDate;
    // var r;
    // fetch(stringReq)
    //   .then((response) => response.json())
    //   .then((data) => (r = data))
    //   .then(() => this.props.getNewData(r));
    //this.setState({ tdData: TdBigData });
  }

  componentDidMount() {
    try {
      var selectedTdData = JSON.parse(localStorage.getItem("selectedTdData"));
      var prevTdData = {};
      prevTdData["underlyingPrice"] = Number(
        localStorage.getItem("underlyingPrice")
      );
      prevTdData["interestRate"] = Number(localStorage.getItem("interestRate"));
      prevTdData["volatility"] = Number(localStorage.getItem("volatility"));

      if (selectedTdData !== null)
        this.setState(
          { selectedTdData: selectedTdData, tdData: prevTdData },
          this.makeCalcs
        );
    } catch {
      localStorage.clear();
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      "selectedTdData",
      JSON.stringify(this.state.selectedTdData)
    );
    localStorage.setItem(
      "underlyingPrice",
      JSON.stringify(this.state.tdData.underlyingPrice)
    );
    localStorage.setItem(
      "interestRate",
      JSON.stringify(this.state.tdData.interestRate)
    );
    localStorage.setItem(
      "volatility",
      JSON.stringify(this.state.tdData.volatility)
    );
  }

  updateStrategy(obj) {}

  updateContractNumber(newObj) {
    //parse value to int get id from input
    var numInput = parseInt(newObj.target.value);
    const id = newObj.target.id;

    //find matching symbol GUID
    let index = this.state.selectedTdData.findIndex((x) => x.symbol === id);

    //if found replace array with new value.
    if (numInput > 0) {
      var stateReplace = this.state.selectedTdData;
      stateReplace[index]["numberOfContracts"] = numInput;

      this.setState({ selectedTdData: stateReplace }, this.makeCalcs);
    }
  }

  //check if symbol exists. If not add number of contracts or increment
  sendObject(obj, id) {
    if (Array.isArray(obj)) {
      var cData = this.state.selectedTdData.find((x) => {
        return x.symbol === obj[0].symbol;
      });

      if (cData) {
        var stateReplace;
        if (obj[0].buySell !== id) {
          obj[0]["numberOfContracts"] = 1;
          obj[0].buySell = id;
          let index = this.state.selectedTdData.findIndex(
            (x) => x.symbol === cData.symbol
          );
          stateReplace = this.state.selectedTdData;
          stateReplace[index] = obj[0];
          this.setState({ selectedTdData: stateReplace }, this.makeCalcs);
        } else {
          obj[0]["buySell"] = id;
          obj[0]["numberOfContracts"] += 1;
          let index = this.state.selectedTdData.findIndex(
            (x) => x.symbol === cData.symbol
          );
          stateReplace = this.state.selectedTdData;
          stateReplace[index] = obj[0];
          this.setState({ selectedTdData: stateReplace }, this.makeCalcs);
        }
      } else {
        obj[0]["numberOfContracts"] = 1;
        obj[0]["buySell"] = id;
        this.setState(
          (prevState) => ({
            selectedTdData: [...prevState.selectedTdData, obj[0]],
          }),
          this.makeCalcs
        );
      }
    }
  }

  makeCalcs() {
    var calc = CalcBScholesTdData(
      this.state.selectedTdData,
      this.state.tdData.underlyingPrice,
      this.state.tdData.interestRate,
      this.state.tdData.volatility
    );
    this.setState({ formattedData: calc });
  }

  clearAll() {
    this.setState({ selectedTdData: [] });
  }

  deleteRow(e, row) {
    const inputGuid = row.currentTarget.value;
    this.setState(
      {
        selectedTdData: this.state.selectedTdData.filter(
          (x) => x.symbol !== inputGuid
        ),
      },
      this.makeCalcs
    );
    //}
  }

  getNewData(obj) {
    if (obj.status !== "FAILED" && obj.error !== "Bad request.")
      this.setState({ tdData: obj, selectedTdData: [], formattedData: [] });
  }

  getPreviousChainData(obj) {
    if (obj.status !== "FAILED" && obj.error !== "Bad request.") {
      if (this.state.selectedTdData.length === 0) {
      }
      this.setState({ tdData: obj }, this.setFirst);
    }
  }

  setFirst() {
    //This mess sets a default contract to be more intuitive for a user
    if (
      this.state.selectedTdData !== null &&
      this.state.selectedTdData.length === 0
    ) {
      let sel = this.state.tdData.callExpDateMap;
      let keyz = Object.keys(sel);
      if (keyz.length > 0) {
        //get a key in the middle...
        let keyL = Math.floor((keyz.length - 1) / 2);
        let key = keyz[keyL];
        let selected = sel[key];
        //get strike keys
        let selectedStrikeKeyz = Object.keys(selected);
        if (selectedStrikeKeyz.length > 0) {
          //set a default contract here and make calculations
          let count = Math.floor((selectedStrikeKeyz.length - 1) / 2);
          let strikeKey = selectedStrikeKeyz[count];
          let finalData = selected[strikeKey];
          finalData[0]["numberOfContracts"] = 1;
          finalData[0]["buySell"] = "buy";
          this.setState({ selectedTdData: finalData }, this.makeCalcs);
        }
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid container spacing={3}>
            <OptionsDrawer
              className={classes.drawer}
              updateStrategy={(obj, val) => this.updateStrategy(obj, val)}
              toggleDataMode={this.props.toggleDataMode}
              dataModeState={this.props.dataModeState}
              tdKey={this.props.tdKey}
            ></OptionsDrawer>
          </Grid>
          <Grid container className={classes.drawer}>
            <Chart
              formattedData={this.state.formattedData}
              underlying={this.state.tdData.underlyingPrice}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectedTdData
              classes={classes}
              clearAll={() => this.clearAll()}
              deleteRow={(e, val) => this.deleteRow(val, e)}
              selectedTdData={this.state.selectedTdData}
              updateContractNumber={(obj, val) =>
                this.updateContractNumber(obj, val)
              }
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid className={classes.chainGrid} item xs={12}>
              <ChainData
                tdDataContract={this.state.tdData.callExpDateMap}
                tdData={this.state.tdData}
                checksList={this.state.checksList}
                addDataFunc={(val) => this.addData(val)}
                rowData={this.state.rowData}
                optionType={"CALL"}
                classes={classes}
                sendObject={(obj, e) => this.sendObject(obj, e)}
              />
            </Grid>
            <Grid className={classes.chainGrid} item xs={12}>
              <ChainData
                tdDataContract={this.state.tdData.putExpDateMap}
                tdData={this.state.tdData}
                checksList={this.state.checksList}
                addDataFunc={(val) => this.addData(val)}
                rowData={this.state.rowData}
                optionType={"PUT"}
                classes={classes}
                sendObject={(obj, e) => this.sendObject(obj, e)}
              />
            </Grid>
          </Grid>
          <Grid className={classes.chainGrid} item xs={12}>
            <Divider />
            <TdDataSelection
              classes={classes}
              getNewData={this.getNewData}
              getPreviousChainData={this.getPreviousChainData}
              tdKey={this.props.tdKey}
            />
          </Grid>
        </Grid>

        <BottomNavigation showLabels className={classes.root}>
          <BottomNavigationAction
            icon={<GitHubIcon />}
            href={"https://github.com/Joas3068/OptionsProfitCalculator"}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default compose(withStyles(useRowStyles))(TdDataMode);
