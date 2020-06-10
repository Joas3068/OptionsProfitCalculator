import React from "react";
import ChainData from "../components/ChainData";
import Grid from "@material-ui/core/Grid";
import Chart from "../Chart";
import { withStyles } from "@material-ui/core/styles";
import ItemsPanel from "../components/ItemsPanel";
import {GetSchole,GetBreakEvens,CalcBScholes} from "../utils/Bscholes";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import GitHubIcon from "@material-ui/icons/GitHub";
import OptionsForm from "../components/OptionsForm";
import { Button } from "@material-ui/core";

const useRowStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    // display: "table",
    backgroundColor: "rgb(38, 38, 38)",
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
    backgroundColor: "rgb(179, 179, 179)",
  },
  container: {
    backgroundColor: "lightgray",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: 500,
    overflow: "scroll",
    display: "block",
  },
  paper: {
    backgroundColor: "rgb(128, 0, 0)",
    padding: theme.spacing(2),
    // display: "flex",
    overflow: "auto",
    // // flexDirection: "row",
    maxHeight: "auto",
  },
  chartGrid: {
    backgroundColor: "rgb(128, 0, 0)",
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
    backgroundColor: "rgb(128, 0, 0)",
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
    backgroundColor: "rgb(128, 26, 0)",
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

const TempPrice = [[]];
const mainObj = [
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 465,
    expiration: 4,
    interestFree: 0.02,
    volatility: 25,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: TempPrice,
    breakEvens:[],
  },
  {
    type: "call",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 460,
    expiration: 4,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: TempPrice,
    breakEvens:[],
  },
  {
    type: "put",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 440,
    expiration: 4,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: TempPrice,
    breakEvens:[],
  },
   {
    type: "put",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 4,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: TempPrice,
    breakEvens:[],
  },
];

export class ParentComp extends React.Component {
  constructor(props) {
    super(props);

    mainObj.forEach(element => {
      element.GUID = this.uuidv4();
    });
    this.state = {
      checksList: mainObj, //current options
      currentEditGuid: mainObj[0].GUID, //GUID to access checksList
      calculatedPriceData: TempPrice, //final calcs for Charts
      optionsData: mainObj[0], //remove this
      formattedData:[],
    };
    this.addData = this.addData.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.calculateOptionsPrice = this.calculateOptionsPrice.bind(this);
    this.getGuid = this.getGuid.bind(this);
    this.calcData = this.calcData.bind(this);
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
        stockPrice: 0,
        strikePrice: 0,
        expiration: 1,
        interestFree: 0,
        volatility: 0,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.uuidv4(),
        isEditing: false,
        priceArray: TempPrice,
      },
    ];
    this.setState({
      checksList: newObjec,
      currentEditGuid: newObjec[0].GUID,
    });
  }

  createData(
    type,
    buysell,
    stockPrice,
    strikePrice,
    expiration,
    interestFree,
    volatility,
    GUID
  ) {
    return {
      type,
      buysell,
      stockPrice,
      strikePrice,
      expiration,
      interestFree,
      volatility,
      greeks: [
        { volatility: "55%", delta: ".5", amount: 3 },
        { volatility: "59%", delta: ".2", amount: 1 },
      ],
      GUID,
    };
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

  calculateOptionsPrice() {
    // var inpu = this.getCurrentOptionObj();
    // const res = GetSchole(inpu);

    // //Make new calcs on price array for each object
    // var newArr = this.replaceOptionData([...this.state.checksList], res);
    // GetBreakEvens(this.state.checksList);
    // this.setState({
    //   checksList: newArr,
    // });
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  componentWillMount() {
    // this.setState({
    //   checksList: this.state.checksList.concat(this.state.optionsData),
    // });
    this.calculateOptionsPrice();
  }

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
      this.setState({
        checksList: this.state.checksList.concat(val),
      });
    } else {
      //var newState = [...this.state.checksList];
      var newState = this.state.checksList;
      newState[indexFound] = val;
      this.setState({
        checksList: newState,
      });
    }
    this.calcData()
  }

  getGuid(e, row) {
    //var a = row.target.value;
    var result = this.state.checksList.find((obj) => {
      return obj.GUID === row.target.value;
    });
    //return () => {
    this.setState({
      currentEditGuid: result.GUID,
    });
    //};
  }

  calcData(){

    var a = CalcBScholes(this.state.checksList);
        this.setState({
          formattedData: a,
    });
  }
  render() {
    const { classes } = this.props;

    //var a = this.state.checksList[0].priceArray;
    return (
      <div className={classes.root}>
      {/* <Button onClick={this.calcData}>asdfasdfcv</Button> */}
        <Grid container spacing={3}>
          <Grid container>
            <Chart
              checksList={this.state.checksList}
              currentEditGuid={this.state.currentEditGuid}
              priceArray={this.getCurrentOptionObj()}
              formattedData={this.state.formattedData}
            ></Chart>
          </Grid>
          
          <Grid spacing={3} item xs={12}>
          
            <ItemsPanel
              classes={classes}
              clearSelected={() => this.clearSelected()}
              getGuid={(e, val) => this.getGuid(val, e)}
              //selectedItems={this.state.checksList}
              calculateOptionsPrice={() => this.calculateOptionsPrice()}
              currentEditGuid={this.state.currentEditGuid}
              checksList={this.state.checksList}
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

function fMat(myUsers) {
  var finalObj = [];
  for (let i = 0; i < myUsers[0].length; i++) {
    var tobj = { x: myUsers[0][i].sPrice };
    for (let j = 0; j < myUsers.length; j++) {
      tobj["DAY" + (j + 1)] = +myUsers[j][i].oPrice.toFixed(2);
    }
    finalObj.push(tobj);
  }
  return finalObj;
}

export default withStyles(useRowStyles)(ParentComp);
