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
import Grid from "@material-ui/core/Grid/";
import { Checkbox, Button, InputNumber, Divider } from "antd";

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
    this.setDefaultXCoords = this.setDefaultXCoords.bind(this);
    this.updateXMax = this.updateXMax.bind(this);
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
      if (e === "" || e === 0) {
        this.setState({ numberOfDays: undefined });
      } else if (e <= keyz.length && e > 0 && e) {
        this.setState({ numberOfDays: e });
      } else if (e > keyz.length) {
        let t = e - 1;
        this.setState({ numberOfDays: t });
      }
    }
  }

  componentDidMount() {
    try {
      var numberOfDays = JSON.parse(localStorage.getItem("numberOfDays"));
      var keyz;
      let length = 0;
      if (this.props.formattedData.length > 0) {
        keyz = Object.keys(this.props.formattedData[0]);
        length = keyz.length;
      }

      //if (numberOfDays !== undefined)
      numberOfDays = !numberOfDays ? length : numberOfDays;
      this.setState({ numberOfDays: numberOfDays });
    } catch {
      localStorage.clear();
    }
  }

  componentDidUpdate() {
    let days = this.state.numberOfDays;
    if (!this.state.numberOfDays && this.props.formattedData.length > 0) {
      var keyz = Object.keys(this.props.formattedData[0]);
      days = keyz.length - 1;
    }

    localStorage.setItem("numberOfDays", JSON.stringify(days));
  }

  updateXMin(e) {
    let val = e; //TODO some verification..
    if (this.props.formattedData.length > 0) {
      this.setState({ xMinVal: val });
    }
  }

  updateXMax(e) {
    let val = e;
    if (this.props.formattedData.length > 0) {
      this.setState({ xMaxVal: val });
    }
  }
  setDefaultXCoords() {
    this.setState({ xMaxVal: undefined, xMinVal: undefined });
  }

  render() {
    var formattedData = [];
    let underLyingPrice = undefined;
    var xMin = 1,
      xMax = 1;

    if (this.props.formattedData.length > 0) {
      let sliceMinIndex = 0; //get smallest
      let sliceMaxIndex = this.props.formattedData.length; //get largest
      let xMaxH = this.props.formattedData[this.props.formattedData.length - 1]
        .x;

      let i = 0;

      //If user inputs zoom values
      if (this.state.xMaxVal) {
        //search nearest value
        while (
          this.state.xMaxVal - this.props.formattedData[i].x >= 0 &&
          this.state.xMaxVal < xMaxH
          //&& val > formattedData[0].x
        ) {
          i++;
        }
        sliceMaxIndex = i > 0 ? i : this.props.formattedData.length;
        i = 0;
      }

      if (this.state.xMinVal) {
        while (
          this.state.xMinVal - this.props.formattedData[i].x > 0 &&
          this.state.xMinVal <
            this.props.formattedData[this.props.formattedData.length - 1].x &&
          this.state.xMinVal > this.props.formattedData[0].x
        ) {
          i++;
        }
        sliceMinIndex = i;
      }

      if (sliceMinIndex >= sliceMaxIndex) {
        sliceMinIndex = 0; //get smallest
        sliceMaxIndex = this.props.formattedData.length; //get largest
      }
      formattedData = this.props.formattedData.slice(
        sliceMinIndex,
        sliceMaxIndex
      );
      xMin = formattedData[0].x;
      xMax = formattedData[formattedData.length - 1].x;

      //find nearest underlying
      if (this.props.underlying) {
        let index = 0;
        while (this.props.underlying - this.props.formattedData[index].x > 0)
          index++;
        underLyingPrice = this.props.formattedData[index];
      }
    }

    return (
      <>
        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='center'
          spacing={1}
          className='papa'
        >
          <Grid item style={{ justifyContent: "center" }}>
            <label className='label'>Days</label>
            <InputNumber
              min={0}
              size={"small"}
              onChange={(e) => this.updateDaysNumber(e)}
              type='number'
              value={this.state.numberOfDays}
            />
          </Grid>
          <Divider type='vertical' />
          <Grid item style={{ justifyContent: "center" }}>
            <label className='label'>P/L</label>
            <Checkbox
              checked={this.state.showTip}
              size={"small"}
              onChange={(e) => this.changeToolTip(e)}
            ></Checkbox>
          </Grid>
          <Divider type='vertical' />
          <Grid item style={{ justifyContent: "center" }}>
            <label className='label'>X-Min</label>
            <InputNumber
              min={0}
              size={"small"}
              onChange={(e) => this.updateXMin(e)}
              type='number'
              value={this.state.xMinVal}
            />
          </Grid>
          <Grid item style={{ justifyContent: "center" }}>
            <label className='label'>X-Max</label>
            <InputNumber
              min={0}
              size={"small"}
              onChange={this.updateXMax}
              type='number'
              value={this.state.xMaxVal}
            />
          </Grid>
          <Grid item style={{ justifyContent: "center" }}>
            <Button onClick={this.setDefaultXCoords}>Reset</Button>
          </Grid>
          <Divider type='vertical' />
        </Grid>
        <Grid
          container
          style={{ width: "99%", height: 550, margin: "1% auto" }}
        >
          <ResponsiveContainer>
            <LineChart data={formattedData}>
              <CartesianGrid stroke={"#808080"} />
              <XAxis
                tickCount={25}
                interval='preserveStartEnd'
                tickSize={10}
                type='number'
                dataKey='x'
                stroke='white'
                domain={[xMin, xMax]}
              />
              <YAxis
                tickCount={15}
                type='number'
                minTickGap={0}
                tickSize={10}
              />
              <Legend formatter={this.renderColorfulLegendText} />
              <ReferenceLine
                y={0}
                stroke='white'
                strokeWidth={1}
                label={<Label fill={"white"} position='insideTopLeft' />}
              />
              {underLyingPrice !== undefined ? (
                <ReferenceLine
                  x={underLyingPrice.x}
                  stroke='#736916'
                  strokeWidth={1}
                  label={
                    <Label fill={"#736916"} position='insideTopLeft'>
                      {"Underlying " + this.props.underlying.toFixed(2)}
                    </Label>
                  }
                />
              ) : null}
              {this.state.showTip ? (
                <Tooltip
                  cursor={{ stroke: "rgb(204, 163, 0)", strokeWidth: 2 }}
                  //cursor={false}
                  offset={45}
                  animationEasing={"linear"}
                />
              ) : (
                <Tooltip
                  cursor={{ stroke: "rgb(204, 163, 0)", strokeWidth: 2 }}
                  //cursor={false}
                  offset={45}
                  animationEasing={"linear"}
                  content={
                    <CustomTooltip
                    //stylez={classes.toolTipContainer}
                    />
                  }
                />
              )}

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
        <p className='label'>{`${label}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
      </div>
    );
  }

  return null;
};

//TODO: Bug here not allowing all lines to be shown
function GetLines(arrs, numberOfDays) {
  var LineList = [];
  numberOfDays = Number(numberOfDays);
  if (arrs.length > 0) {
    var keyz = Object.keys(arrs[0]).slice(1);
    const LengthOfObj = keyz.length;
    if (!numberOfDays || numberOfDays === 0) {
      let dayMultiplier = 0;
      if (keyz.length > 10) {
        dayMultiplier = Math.floor(LengthOfObj / 10);
      }
      //days not specified
      for (let i = 1; i < LengthOfObj; i = i + dayMultiplier + 1) {
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
      let dayMultiplier = 0;
      if (numberOfDays > 10) {
        dayMultiplier = Math.floor(numberOfDays / 10);
      }
      for (let i = 1; i < numberOfDays; i = i + dayMultiplier + 1) {
        var colsD = GetColors();
        let rgb =
          "rgb(" +
          colsD.r.toString() +
          "," +
          colsD.g.toString() +
          "," +
          colsD.b.toString() +
          ")";
        LineList.push(
          <Line stroke={rgb} dataKey={keyz[i]} key={keyz[i]} dot={false} />
        );
      }
      // var colsD2 = GetColors();
      // let rgb2 =
      //   "rgb(" +
      //   colsD2.r.toString() +
      //   "," +
      //   colsD2.g.toString() +
      //   "," +
      //   colsD2.b.toString() +
      //   ")";
      // LineList.push(
      //   <Line stroke={rgb2} dataKey={keyz[LengthOfObj - 1]} dot={false} />
      // );
    }

    return LineList;
  } else return;
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

export default Chart;
