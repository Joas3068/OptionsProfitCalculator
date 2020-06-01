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
    const length = this.props.optionsPriceData.optionPrice.length;
    const optData = this.props.optionsPriceData;
<<<<<<< HEAD
    const xmin = this.props.optionsPriceData.optionPrice[0].sPrice;

    const xmax = this.props.optionsPriceData.optionPrice[length - 1].sPrice;
=======
    const xmin = 
    this.props.optionsPriceData.optionPrice[0].sPrice

    const xmax = 
    this.props.optionsPriceData.optionPrice[length-1].sPrice;
>>>>>>> 1bafc5ef4831ed5598e7f3554e7eebf4137a5fb0

    return (
      <div style={{ width: "100%", height: 700 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={250}
            data={optData.optionPrice}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="sPrice"
              //interval={0}
              stroke="white"
<<<<<<< HEAD
              // minTickGap={0}
              //tickSize={1}
              // type="number"
=======
             // minTickGap={0}
              //tickSize={1}
             // type="number"
>>>>>>> 1bafc5ef4831ed5598e7f3554e7eebf4137a5fb0
              //domain={['auto','auto']}
            />
            <YAxis minTickGap={0} tickSize={1} />
            {/* <ReferenceLine x={305.85} stroke="green"  */}
<<<<<<< HEAD
            label={<Label value="Break-Even" fill={"white"} />}
            />
            <Tooltip label={<Label value="Break-Even" fill={"white"} />} />
=======
            label={<Label value="Break-Even" fill={'white'} /> }  

            />

            <Tooltip 
            label={<Label value="Break-Even" fill={'white'} /> } 
             />
>>>>>>> 1bafc5ef4831ed5598e7f3554e7eebf4137a5fb0
            <Line
              type="natural"
              dataKey="oPrice"
              stroke="#8884d8"
              activeDot={{ r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
