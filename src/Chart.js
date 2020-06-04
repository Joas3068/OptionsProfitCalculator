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

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(this.props.selectedItems);
  }

  initialState(selectedItems) {
    var start = {
      selectedItems,
    };
    return start;
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

  render() {
    //const length = this.props.priceArray; //.optionPrice.length;
    // const optData = this.props.optionsPriceData;
    // const xmin = this.props.optionsPriceData.optionPrice[0].sPrice;

    // const xmax = this.props.optionsPriceData.optionPrice[length - 1].sPrice;
    var xAxis = [];

    for (let i = 0; i < this.props.priceArray[0].length; i++) {
      xAxis.push(this.props.priceArray[0][i].sPrice);
    }

    var breakEven = { oPrice: 0, sPrice: 0 };
    var formatedData = fMat(this.props.priceArray);
    // var prevVal = -1;
    // var getFirstPositive = 0;
    // while (
    //   getFirstPositive < optData.optionPrice.length-1 &&
    //   optData.optionPrice[getFirstPositive].oPrice <= 0

    // ) {
    //   getFirstPositive++;
    // }

    // if (optData.optionPrice[getFirstPositive].oPrice === 0)
    //   breakEven = optData.optionPrice[getFirstPositive];
    // else breakEven = optData.optionPrice[getFirstPositive - 1];

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
            <XAxis
              dataKey="x"
              //interval={0}
              stroke="white"
              // minTickGap={0}
              //tickSize={1}
              // type="number"

              domain={[xAxis]}
            />
            <YAxis minTickGap={0} tickSize={1} />
            <Legend  stroke="white" style={{fill: "white"}} />
            {/* <ReferenceLine
              x={breakEven.sPrice}
              stroke="aqua"
              strokeWidth={3}
              label={<Label value="Break-Even" fill={"white"} />}
            /> */}
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
            {GetLines(formatedData)}
           
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

function fMat(myUsers) {
  var finalObj = [];
  for (let i = 0; i < myUsers[0].length; i++) {
    var tobj = { x: myUsers[0][i].sPrice };
    for (let j = 0; j < myUsers.length; j++) {
      tobj["DAY" + j] = myUsers[j][i].oPrice;
    }
    finalObj.push(tobj);
  }
  return finalObj;
}

function GetLines(arrs) {
  var LineList = [];
  if (arrs.length > 0) {
    var keyz = Object.keys(arrs[0]);
    const LengthOfObj = keyz.length;

    for (let i = 1; i < LengthOfObj; i++) {
      //for (let j = 0; j < arrs.length; j++) {
        LineList.push(<Line stroke="#8884d8" dataKey={keyz[i]} dot={false} />);
      //}
    }


    return LineList;
  } else return null;
}
