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
  ReferenceDot,
} from "recharts";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
    };
  }

  fetchUsers() {
    fetch()
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          data: {
            symbol: data[0].symbol,
          },
          left: "dataMin",
          right: "dataMax",
          refAreaLeft: "",
          refAreaRight: "",
          top: "dataMax+1",
          bottom: "dataMin-1",
          top2: "dataMax+20",
          bottom2: "dataMin-20",
          animation: true,
        })
      )
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  renderColorfulLegendText(value, entry) {
    entry.color = "#ffffff";
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
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

    return (
      <div style={{ width: "100%", height: 700 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={250}
            data={formatedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
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
            {/* <ReferenceLine
              x={700}
              stroke="white"
              strokeWidth={1}
              label={
                <Label
                  value="Break-Even"
                  fill={"white"}
                  position="insideTopLeft"
                />
              }
            /> */}
            {/* {PlotBreakEvens(getBreakEven)} */}
            <Tooltip
              viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
              //position={{ x: 400, y: 0 }}
              //cursor={{ stroke: "rgb(204, 163, 0)", strokeWidth: 2 }}
              cursor={false}
              animationEasing={"linear"}
            />
            {GetLines(formatedData)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

function getBreakEvens(fmtArray) {
  var keys;
  var dataPoints = [];
  if (fmtArray.length > 0) {
    keys = Object.keys(fmtArray[0]);
    var foundKeys = [];
    for (let i = 0; i < keys.length; i++) {
      let currentKey = keys[i];
      let j = 1;
      if (currentKey === "x" || foundKeys.includes(currentKey)) continue;
      else {
        let currentSign = fmtArray[j - 1][currentKey] >= 0 ? 1 : -1;
        while (j < fmtArray.length) {
          if (
            fmtArray[j][currentKey] / Math.abs(fmtArray[j][currentKey]) !==
            currentSign
          ) {
            dataPoints.push({ x: fmtArray[j - 1].x, Exp: currentKey });
            foundKeys.push(currentKey);
            break;
          }
          j++;
        }
      }
    }
  }
  return dataPoints;
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

function PlotBreakEvens(breakEvenList) {
  var refLines = [];

  for (let i = 0; i < breakEvenList.length; i++) {
    refLines.push(
      <ReferenceDot
        x={breakEvenList[i].x}
        y={0}
        //stroke="#ff33cc"
        fill="rgb(128, 0, 0)"
        r={4}
      />
    );
  }

  return refLines;
}

function GetLines(arrs) {
  var LineList = [];
  if (arrs.length > 0) {
    var keyz = Object.keys(arrs[0]);
    const LengthOfObj = keyz.length;
    let dayMultiplier = 0;
    if (keyz.length > 20) {
      dayMultiplier = Math.round(LengthOfObj / 10);
    }

    for (let i = 1; i < LengthOfObj - 1; i = i + dayMultiplier + 1) {
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

    //Always add expiration
    var colLast = GetColors();
    let rgb =
      "rgb(" +
      colLast.r.toString() +
      "," +
      colLast.g.toString() +
      "," +
      colLast.b.toString() +
      ")";
    LineList.push(<Line stroke={rgb} dataKey={keyz[keyz.length-1]} dot={false} />);
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
