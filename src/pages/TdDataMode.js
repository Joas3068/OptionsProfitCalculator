import React from "react";
//import ChainData from "../components/ChainData";
import Grid from "@material-ui/core/Grid";
import Chart from "../Chart";
import { withStyles } from "@material-ui/core/styles";
// import { CalcBScholes } from "../utils/Bscholes";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import GitHubIcon from "@material-ui/icons/GitHub";
import OptionsDrawer from "../components/OptionsDrawer";
import Colors from "../utils/Colors";
import ChainData from "../components/ChainData";
import { TdBigData } from "../utils/StrategyData";
import SelectedTdData from "../components/SelectedTdData";
import { CalcBScholesTdData } from "../utils/Bscholes";

const useRowStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    // display: "table",
    backgroundColor: Colors.Primary,
    "& > *": {
      borderBottom: "unset",
    },
    flexWrap: "wrap",
  },
  title: {
    flexGrow: 1,
  },
  table: {
    backgroundColor: "#dde7ed",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    display: "block",
  },
  drawer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },

  chainGrid: {
    //active
    // backgroundColor: "white",
    //margin:theme.spacing(2),
    // //display: "flex",
    // // // flexDirection: "row",
    // //maxHeight: "auto",
    //display: "flex",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    // //height: 500,
  },
  chartGrid: {
    backgroundColor: Colors.Tables,
    padding: theme.spacing(1),
    display: "block",
    // overflow: "auto",
    flexDirection: "row",
    flex: 1,
    maxHeight: "auto",
  },

  fixedHeight: {
    height: 300,
  },
  expPanelChain: {
    //active
    backgroundColor: "lighGray",
    overflow: "auto"
  },
  chainDataTable: {
    backgroundColor: "#f2f2f2",
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
  }

  componentWillMount() {
    this.setState({ tdData: TdBigData });
  }

  updateStrategy(obj) {}

  updateContractNumber(newObj) {
    //parse valu to int get id from input
    var numInput = parseInt(newObj.target.value);
    const id = newObj.target.id;

    //find matching symbol GUID
    let index = this.state.selectedTdData.findIndex((x) => x.symbol === id);

    //if found replace array with new value.
    if (numInput > 0) {
      var stateReplace = this.state.selectedTdData;
      stateReplace[index]["numberOfContracts"] = numInput;

      this.setState({ selectedTdData: stateReplace },this.makeCalcs);
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
          this.setState({ selectedTdData: stateReplace },this.makeCalcs);
        } else {
          obj[0]["buySell"]= id;
          obj[0]["numberOfContracts"] += 1;
          let index = this.state.selectedTdData.findIndex(
            (x) => x.symbol === cData.symbol
          );
          stateReplace = this.state.selectedTdData;
          stateReplace[index] = obj[0];
          this.setState({ selectedTdData: stateReplace },this.makeCalcs);
        }
      } else {
        obj[0]["numberOfContracts"] = 1;
        obj[0]["buySell"] = id;
        this.setState((prevState) => ({
          selectedTdData: [...prevState.selectedTdData, obj[0]],
        }),this.makeCalcs);
      }
      
    }
  }

  makeCalcs() {
    var calc = CalcBScholesTdData(
      this.state.selectedTdData,
      this.state.tdData.underlyingPrice,
      this.state.tdData.interestRate
    );
    this.setState({ formattedData: calc });
  }

  clearAll(){
    this.setState({selectedTdData: []});
  }

  deleteRow(e, row) {
    const inputGuid = row.currentTarget.value;
      this.setState(
        {
          selectedTdData: this.state.selectedTdData.filter((x) => x.symbol !== inputGuid),
        },
        this.makeCalcs
      );
    //}
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
            ></OptionsDrawer>
          </Grid>
          <Grid container className={classes.drawer}>
            <Chart formattedData={this.state.formattedData}></Chart>
          </Grid>
          <Grid  item xs={12}>
            <SelectedTdData
              classes={classes}
              clearAll={() => this.clearAll()}
              deleteRow={(e, val) => this.deleteRow(val, e)}
              //selectedItems={this.state.checksList}
              // calculateOptionsPrice={() => this.calculateOptionsPrice()}
              // currentEditGuid={this.state.currentEditGuid}
              selectedTdData={this.state.selectedTdData}
              updateContractNumber={(obj, val) =>
                this.updateContractNumber(obj, val)
              }
              // deleteRow={(e, val) => this.deleteRow(val, e)}
            ></SelectedTdData>
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
              ></ChainData>
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
              ></ChainData>
            </Grid>
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

export default withStyles(useRowStyles)(TdDataMode);
