import React from "react";
//import ChainData from "../components/ChainData";
import Grid from "@material-ui/core/Grid";
import Chart from "../Chart";
import { withStyles } from "@material-ui/core/styles";
import { CalcBScholes } from "../utils/Bscholes";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import GitHubIcon from "@material-ui/icons/GitHub";
import OptionsDrawer from "../components/OptionsDrawer";
import Colors from "../utils/Colors";
import ChainData from "../components/ChainData";
import { TdBigData } from "../utils/StrategyData";

const useRowStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    // display: "table",
    backgroundColor: Colors.Primary,
    "& > *": {
      borderBottom: "unset",
    },
    //width: "100%",
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
  container: {
    backgroundColor: Colors.Secondary,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: 500,
    //overflow: "scroll",
    display: "block",
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
    padding: theme.spacing(2),
    display: "block",
    // overflow: "auto",
    flexDirection: "row",
    flex: 1,
    maxHeight: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paperHeader: {
    backgroundColor: "#364156",
    padding: theme.spacing(0),
    flexDirection: "row",
  },
  fixedHeight: {
    height: 300,
  },
  expPanelChain: {
    //active
    backgroundColor: "lighGray",
  },
  selectedTable: {
    backgroundColor: "gray",
  },
  headerPaper: {
    //Top level
    margin: theme.spacing(3),
    // color: "rgb(191, 191, 191)",
    // backgroundColor: "rgb(128, 0, 0)",
    display: "block",
    flexGrow: 1,
    //overflow: "scroll",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  headerButton: {
    margin: theme.spacing(1),
    color: "black",
    backgroundColor: "rgb(204, 204, 204)",
    flexGrow: 1,
  },
  tableRoot: {
    // borderColor: 'red',borderStyle: 'solid',borderTopWidth: 1
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

  sendObject(obj) {
    if (Array.isArray(obj)) var a = obj[0];
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
          <Grid container spacing={3}>
            <Grid className={classes.chainGrid} item xs={12}>
              <ChainData
                tdDataContract={this.state.tdData.callExpDateMap}
                checksList={this.state.checksList}
                addDataFunc={(val) => this.addData(val)}
                rowData={this.state.rowData}
                optionType={"CALL"}
                classes={classes}
                sendObject={(obj) => this.sendObject(obj)}
              ></ChainData>
            </Grid>
            <Grid className={classes.chainGrid} item xs={12}>
              <ChainData
                tdDataContract={this.state.tdData.putExpDateMap}
                checksList={this.state.checksList}
                addDataFunc={(val) => this.addData(val)}
                rowData={this.state.rowData}
                optionType={"PUT"}
                classes={classes}
                sendObject={(obj) => this.sendObject(obj)}
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
