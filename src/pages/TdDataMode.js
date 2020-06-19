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
import { TdData } from "../utils/StrategyData";

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
    minWidth: 0,
    backgroundColor: Colors.Tables,
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
    overflow: "scroll",
    display: "block",
  },
  paper: {
    backgroundColor: Colors.Secondary,
    padding: theme.spacing(2),
    // display: "flex",
    overflow: "auto",
    // // flexDirection: "row",
    maxHeight: "auto",
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
  expPanelCall: {
    backgroundColor: "rgb(0, 77, 0)",
  },
  expPanelPut: {
    backgroundColor: "#364156",
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
  },
  headerButton: {
    margin: theme.spacing(1),
    color: "black",
    backgroundColor: "rgb(204, 204, 204)",
    flexGrow: 1,
  },
  headerBlock: {
    // margin: theme.spacing(1),
    // backgroundColor: "rgb(128, 0, 0)",
    // color: "white",
    // padding: theme.spacing(2),
    //flexGrow: 1,
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
  }

  componentWillMount() {
    var a = TdData;

    this.setState({ tdData: TdData });
  }

  updateStrategy(obj) {}

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

          <Grid item xs={6}>
            <ChainData
              tdDataContract={this.state.tdData.callExpDateMap}
              checksList={this.state.checksList}
              addDataFunc={(val) => this.addData(val)}
              rowData={this.state.rowData}
              optionType={"CALL"}
              classes={classes}
            ></ChainData>
          </Grid>
          <Grid item xs={6}>
            <ChainData
              tdDataContract={this.state.tdData.putExpDateMap}
              checksList={this.state.checksList}
              addDataFunc={(val) => this.addData(val)}
              rowData={this.state.rowData}
              optionType={"PUT"}
              classes={classes}
            ></ChainData>
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
