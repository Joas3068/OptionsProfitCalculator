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
  Divider,
  Typography,
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
    margin: theme.spacing(1),
    //display: "inlineBlock",
    //flexWrap: "wrap",
  },
  controlRoot: {
    //margin: theme.spacing(1),
    //padding: theme.spacing(2),
    //float:"left",
    //display: "inlineBlock",
  },
  alignGridItems: {
    //display: "flex",
    justifyContent: "center",
    //alignItems: "center",
  },
  toolTipContainer: {
    //boxSizing: "borderBox",
    border: "1px solid",
    // padding: 10px,
    // width: 800px,
    // height: 800px,
    backgroundColor: "#f2f2f2",
  },
});

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
      numberOfDays: undefined,
      showTip: true,
      xMinVal: undefined,
      xMaxVal: undefined,
    };
    this.changeToolTip = this.changeToolTip.bind(this);
    this.getCoord = this.getCoord.bind(this);
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

  updateXMin(e) {
    let val = e.target.valueAsNumber;
    let i = 0;
    var xMinH = 0;
    if (this.props.formattedData.length > 0) {
      var formattedData = this.props.formattedData;
      //if greater than min value
      if (val > formattedData[0].x) {
        xMinH = formattedData[0].x;
        while (
          val - this.props.formattedData[i].x > 0 &&
          val < formattedData[formattedData.length - 1].x &&
          val > formattedData[0].x
        ) {
          i++;
        }
        if (val < xMinH) i = 0;
        this.setState({ xMinVal: i });
      }
    }
  }

  updateXMax(e) {
    let val = e.target.valueAsNumber;
    let i = 0;
    var xMaxH = 0;
    if (this.props.formattedData.length > 0) {
      var formattedData = this.props.formattedData;
      if (val > formattedData[0].x) {
        xMaxH = formattedData[formattedData.length - 1].x;
        while (
          val - this.props.formattedData[i].x > 0 &&
          val < xMaxH &&
          val > formattedData[0].x
        ) {
          i++;
        }
        if (val > xMaxH) i = formattedData.length - 1;
        this.setState({ xMaxVal: i });
      }
    }
  }

  getCoord(e) {
    var a = e; //.target.value;
  }
  render() {
    var formattedData = [];
    var xMin = 1,
      xMax = 1;
    if (this.props.formattedData.length > 0) {
      //formattedData = this.props.formattedData;
      if (
        this.state.xMinVal !== undefined ||
        this.state.xMaxVal !== undefined
      ) {
        if (
          this.state.xMinVal !== undefined &&
          this.state.xMaxVal === undefined
        ) {
          formattedData = this.props.formattedData.slice(
            this.state.xMinVal,
            this.props.formattedData.length - 1
          );
          xMax = formattedData[formattedData.length - 1].x;
          xMin = this.state.xMinVal;
        } else if (
          this.state.xMaxVal !== undefined &&
          this.state.xMinVal === undefined
        ) {
          formattedData = this.props.formattedData.slice(0, this.state.xMaxVal);
          xMin = formattedData[0].x;
          xMax = this.state.xMaxVal;
        } else if (
          this.state.xMaxVal !== undefined &&
          this.state.xMinVal !== undefined
        ) {
          formattedData = this.props.formattedData.slice(
            this.state.xMinVal,
            this.state.xMaxVal
          );
          xMin = this.state.xMinVal;
          xMax = this.state.xMaxVal;
        }
      } else {
        formattedData = this.props.formattedData;
        xMin = this.props.formattedData[0].x;
        xMax = this.props.formattedData[this.props.formattedData.length - 1].x;
      }
    }

    const { classes } = this.props;
    return (
      <>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
          className={classes.papa}
        >
          <Grid item className={classes.alignGridItems}>
            <InputLabel>Days</InputLabel>
            <InputBase
              inputProps={{
                min: 0,
                style: {
                  maxWidth: 50,
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                },
              }}
              onChange={(e) => this.updateDaysNumber(e)}
              type="number"
              value={this.state.numberOfDays}
            ></InputBase>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item className={classes.alignGridItems}>
            <InputLabel>P/L</InputLabel>
            <Checkbox
              className={classes.controlRoot}
              checked={this.state.showTip}
              size={"small"}
              onChangeCapture={(e) => this.changeToolTip(e)}
            ></Checkbox>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item className={classes.alignGridItems}>
            <InputLabel>X-Min</InputLabel>
            <InputBase
              inputProps={{
                min: 0,
                style: {
                  maxWidth: 50,
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                },
              }}
              onChange={(e) => this.updateXMin(e)}
              type="number"
            ></InputBase>
          </Grid>
          <Grid item className={classes.alignGridItems}>
            <InputLabel>X-Max</InputLabel>
            <InputBase
              inputProps={{
                min: 0,
                style: {
                  maxWidth: 50,
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                },
              }}
              onChange={(e) => this.updateXMax(e)}
              type="number"
            ></InputBase>
          </Grid>
          <Grid item className={classes.alignGridItems}>
            <Button
              className={classes.controlRoot}
              //style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',backgroundColor:"gray"}}
              onChangeCapture={(e) => this.changeToolTip(e)}
            >
              <Typography variant="button">Default</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container xs={12} style={{ width: "99%", height: 700 }}>
          <ResponsiveContainer>
            <LineChart data={formattedData} onClick={(e) => this.getCoord(e)}>
              <CartesianGrid stroke={"#808080"} />
              <XAxis
                tickCount={25}
                interval="preserveStartEnd"
                tickSize={10} 
                type="number"
                dataKey="x"
                stroke="white"
                domain={[{ xMin }, { xMax }]}
              />
              <YAxis  tickCount={15} type="number" minTickGap={0} tickSize={10} />
              <Legend formatter={this.renderColorfulLegendText} />
              <ReferenceLine
                y={0}
                stroke="white"
                strokeWidth={1}
                label={
                  <Label
                    
                    fill={"white"}
                    position="insideTopLeft"
                  />
                }
              />

              <Tooltip
                //viewBox={{ x: 0, y: 0, width: 400, height: 200 }}
                content={
                  !this.state.showTip ? (
                    <CustomTooltip stylez={classes.toolTipContainer} />
                  ) : null
                }
                //position={{ x: 400, y: 0 }}
                cursor={{ stroke: "rgb(204, 163, 0)", strokeWidth: 2 }}
                //cursor={false}
                offset={45}
                animationEasing={"linear"}
              />

              {GetLines(formattedData, this.state.numberOfDays)}
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </>
    );
  }
}

const CustomTooltip = ({ active, payload, label, stylez }) => {
  if (active) {
    return (
      <div className={stylez}>
        <p className="label">{`${label}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
      </div>
    );
  }

  return null;
};

function GetLines(arrs, numberOfDays) {
  var LineList = [];
  if (arrs.length > 0) {
    var keyz = Object.keys(arrs[0]);
    const LengthOfObj = keyz.length;
    if (numberOfDays === undefined) {
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
