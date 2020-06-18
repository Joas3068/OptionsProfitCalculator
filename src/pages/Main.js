import React from "react";
import { render } from "@testing-library/react";
import ParentComp from "./ParentComp";
import TdDataMode  from "./TdDataMode";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tdData: true,
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

  render() {
    let mainComp = !this.state.tdData ? (
      <ParentComp toggleDataMode={this.toggleDataMode} dataModeState={this.state.tdData}></ParentComp>
    ) : (
      <TdDataMode tdKey={this.state.tdKey} toggleDataMode={this.toggleDataMode} dataModeState={this.state.tdData}></TdDataMode>
    );

    return <div> {mainComp}</div>;
  }
}
