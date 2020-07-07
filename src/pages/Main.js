import React from "react";
import ParentComp from "./ParentComp";
import TdDataMode  from "./TdDataMode";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tdData: false,
      tdKey: "",
    };

    this.toggleDataMode = this.toggleDataMode.bind(this);
  }

  toggleDataMode(val,TDKey) {
    this.setState({
      tdData: val,
      tdKey:TDKey,
    });
  }

  componentDidMount(){
    try {
      var tdData = JSON.parse(localStorage.getItem("tdData"));
      var cg = JSON.parse(localStorage.getItem("tdKey"));
      if (cg !== undefined && tdData !== undefined)
        this.setState(
          { tdData: tdData, tdKey: cg },
        );
    } catch {
      localStorage.clear();
    }
  }

  componentDidUpdate(){
    localStorage.setItem("tdData", JSON.stringify(this.state.tdData));
    localStorage.setItem(
      "tdKey",
      JSON.stringify(this.state.tdKey)
    );
  }

  render() {
    let mainComp = !this.state.tdData ? (
      <ParentComp tdKey={this.state.tdKey} toggleDataMode={this.toggleDataMode} dataModeState={this.state.tdData}></ParentComp>
    ) : (
      <TdDataMode tdKey={this.state.tdKey} toggleDataMode={this.toggleDataMode} dataModeState={this.state.tdData}></TdDataMode>
    );

    return <div> {mainComp}</div>;
  }
}
