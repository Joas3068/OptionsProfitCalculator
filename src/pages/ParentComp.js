import React from "react";
//import ChainData from "../components/ChainData";
import Grid from "@material-ui/core/Grid";
import Chart from "../Chart";
import { withStyles } from "@material-ui/core/styles";
import ItemsPanel from "../components/ItemsPanel";
import { CalcBScholes } from "../utils/Bscholes";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import GitHubIcon from "@material-ui/icons/GitHub";
import OptionsForm from "../components/OptionsForm";
import OptionsDrawer from "../components/OptionsDrawer";
import Colors from "../utils/Colors";
import uuidv4 from "../utils/GuidGen";

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
    padding: theme.spacing(1),
    //display: "block",
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
      tdData: {},
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

  getRes(res) {
    this.setState({
      tdData: res,
    });
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
      var checksList = JSON.parse(localStorage.getItem("checksList"));
      var cg = JSON.parse(localStorage.getItem("currentEditGuid"));
      if (cg !== undefined && checksList !== null)
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
          <Grid container className={classes.chartz}>
            <Chart formattedData={this.state.formattedData}></Chart>
          </Grid>

          <Grid spacing={3} item xs={12}>
            <ItemsPanel
              classes={classes}
              clearSelected={() => this.clearSelected()}
              getGuid={(e, val) => this.getGuid(val, e)}
              calculateOptionsPrice={() => this.calculateOptionsPrice()}
              currentEditGuid={this.state.currentEditGuid}
              checksList={this.state.checksList}
              deleteRow={(e, val) => this.deleteRow(val, e)}
            ></ItemsPanel>
          </Grid>
          <Grid
            //spacing={3}
            item
            xs={12}
          >
            <OptionsForm
              getFormData={(val) => this.getFormData(val)}
              currentEditGuid={this.state.currentEditGuid}
              checksList={this.state.checksList}
            ></OptionsForm>
          </Grid>
          {/* <Grid item xs={6}>
            <ChainData
              checksList={this.state.checksList}
              addDataFunc={(val) => this.addData(val)}
              rowData={this.state.rowData}
              optionType={"Call"}
              classes={classes}
            ></ChainData>
          </Grid>
          <Grid item xs={6}>
            <ChainData
              checksList={this.state.checksList}
              addDataFunc={(val) => this.addData(val)}
              rowData={this.state.rowData}
              optionType={"Put"}
              classes={classes}
            ></ChainData>
          </Grid> */}
        </Grid>
        <BottomNavigation
          value={1}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            icon={<GitHubIcon />}
            href={"https://github.com/Joas3068/OptionsProfitCalculator"}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(useRowStyles)(ParentComp);
