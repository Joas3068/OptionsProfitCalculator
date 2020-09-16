import React from "react";
import ParentComp from "./ParentComp";
import TdDataMode from "./TdDataMode";

export default class Main extends React.Component {
  //TODO: Display symbols, move chain data selection
  //TODO: Store previous selection in cache
  //TODO: Dates need to be in chart display and handled gracefully...
  //TODO: API call needs error handling and user updates
  //TODO: Remove hard coded data.
  //TODO: Add strategy selector to tdDataMode needs to be more intuitive
  constructor(props) {
    super(props);

    this.state = {
      tdData: true,
      tdKey: "HULFYOXJ8NBCAEZRRDZWJWDFPTNJKUHF",
    };

    this.toggleDataMode = this.toggleDataMode.bind(this);
  }

  toggleDataMode(val, TDKey) {
    this.setState({
      tdData: val,
      //tdKey:TDKey,
    });
  }

  componentDidMount() {
    try {
      var tdData = JSON.parse(localStorage.getItem("tdData"));
      //var cg = JSON.parse(localStorage.getItem("tdKey"));
      if (
        //cg !== undefined &&
        tdData !== undefined
      )
        this.setState({
          tdData: tdData,
          //tdKey: cg
        });
    } catch {
      localStorage.clear();
    }
  }

  componentDidUpdate() {
    localStorage.setItem("tdData", JSON.stringify(this.state.tdData));
    //localStorage.setItem("tdKey", JSON.stringify(this.state.tdKey));
  }

  render() {
    let mainComp =
      this.state.tdData === false ? (
        <ParentComp
          tdKey={this.state.tdKey}
          toggleDataMode={this.toggleDataMode}
          dataModeState={this.state.tdData}
        ></ParentComp>
      ) : (
        <TdDataMode
          tdKey={this.state.tdKey}
          toggleDataMode={this.toggleDataMode}
          dataModeState={this.state.tdData}
        ></TdDataMode>
      );

    return <> {mainComp}</>;
  }
}
