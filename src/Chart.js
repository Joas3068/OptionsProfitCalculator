import React from "react";
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import {
  Checkbox,
  Paper,
  Input,
  Grid,
  InputLabel,
  Button,
  FormControl,
  InputBase,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

const useRowStyles = (theme) => ({
  root: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    // display: "table",
    //backgroundColor: Colors.Primary,
    "& > *": {
      borderBottom: "unset",
    },
    flexWrap: "wrap",
  },
  papa: {
    backgroundColor: "white",
    margin: theme.spacing(2),
    flexGrow: 1,
  },
  controlRoot: {
    margin: theme.spacing(1),
  },
});

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
      numberOfDays: null,
      showTip: true,
    };
    this.changeToolTip = this.changeToolTip.bind(this);
  }

  renderColorfulLegendText(value, entry) {
    entry.color = "#ffffff";
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  }

  changeToolTip(e) {
    const a = e.target.checked;
    this.setState({ showTip: a });
  }
  updateDaysNumber(e) {
    if (this.props.formattedData.length > 0) {
      var keyz = Object.keys(this.props.formattedData[0]);
      if (e.target.value <= keyz.length && e.target.value > 0) {
        this.setState({ numberOfDays: e.target.value });
      } else if (e.target.value > keyz.length) {
        let t = e.target.value - 1;
        this.setState({ numberOfDays: t });
      }
    }
  }

  componentDidMount() {
    try {
      var numberOfDays = JSON.parse(localStorage.getItem("numberOfDays"));

      if (numberOfDays !== undefined)
        this.setState({ numberOfDays: numberOfDays });
    } catch {
      localStorage.clear();
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      "numberOfDays",
      JSON.stringify(this.state.numberOfDays)
    );
  }

  render() {
    var formatedData = [];
    var xMin = 0,
      xMax = 0;
    if (this.props.formattedData.length > 0) {
      formatedData = this.props.formattedData;
      xMin = formatedData[0].x;
      xMax = formatedData[formatedData.length - 1].x;

      // if(this.state.colors.length===0){
      //   fo
      //   this.setState({
      //     colors: ,
      //   });
      // }
    }
    const { classes } = this.props;
    return (
      <>
        <Grid container xs={12}>
          <Paper
            className={classes.papa}
            square={true}
            //style={{ backgroundColor: "white", flexWrap: "wrap" }}
          >
            <InputLabel htmlFor="component-simple">Days</InputLabel>
            <InputBase
              inputProps={{
                min: 0,
                style: {
                  maxWidth: 50,
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                },
              }}
              className={classes.controlRoot}
              onChange={(e) => this.updateDaysNumber(e)}
              type="number"
              value={this.state.numberOfDays}
            ></InputBase>
            <InputLabel>Display Values</InputLabel>
            <Checkbox
              checked={this.state.showTip}
              size={"small"}
              onChangeCapture={(e) => this.changeToolTip(e)}
            ></Checkbox>
          </Paper>
        </Grid>
        <Grid container xs={12} style={{ width: "100%", height: 700 }}>
          <ResponsiveContainer>
            <LineChart data={formatedData}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="x" stroke="white" domain={[{ xMin }, { xMax }]} />
              <YAxis minTickGap={0} tickSize={1} />
              <Legend formatter={this.renderColorfulLegendText} />
              <ReferenceLine
                y={0}
                stroke="white"
                strokeWidth={1}
                label={
                  <Label
                    value="Break-Even"
                    fill={"white"}
                    position="insideTopLeft"
                  />
                }
              />
              {this.state.showTip ? (
                <Tooltip
                  viewBox={{ x: 0, y: 0, width: 400, height: 200 }}
                  //position={{ x: 400, y: 0 }}
                  //cursor={{ stroke: "rgb(204, 163, 0)", strokeWidth: 2 }}
                  cursor={false}
                  offset={80}
                  animationEasing={"linear"}
                />
              ) : null}

              {GetLines(formatedData, this.state.numberOfDays)}
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </>
    );
  }
}

function GetLines(arrs, numberOfDays) {
  var LineList = [];
  if (arrs.length > 0) {
    var keyz = Object.keys(arrs[0]);
    const LengthOfObj = keyz.length;
    if (numberOfDays === null) {
      let dayMultiplier = 0;
      if (keyz.length > 20) {
        dayMultiplier = Math.round(LengthOfObj / 10);
      }

      for (let i = 1; i <= LengthOfObj - 1; i = i + dayMultiplier + 1) {
        var cols = GetColors();
        let rgb =
          "rgb(" +
          cols.r.toString() +
          "," +
          cols.g.toString() +
          "," +
          cols.b.toString() +
          ")";
        LineList.push(<Line stroke={rgb} dataKey={keyz[i]} dot={false} />);
      }
    } else {
      for (let i = 1; i <= numberOfDays; i++) {
        var colsD = GetColors();
        let rgb =
          "rgb(" +
          colsD.r.toString() +
          "," +
          colsD.g.toString() +
          "," +
          colsD.b.toString() +
          ")";
        LineList.push(<Line stroke={rgb} dataKey={keyz[i]} dot={false} />);
      }
    }

    return LineList;
  } else return null;
}

function GetColors() {
  var cols = { r: 0, g: 0, b: 0 };
  let count = 0;
  while (cols.r + cols.g + cols.b < 300 && count < 4) {
    cols.r = Math.floor(Math.random() * 255);
    cols.g = Math.floor(Math.random() * 255);
    cols.b = Math.floor(Math.random() * 255);
    count++;
  }
  return cols;
}

export default withStyles(useRowStyles)(Chart);
