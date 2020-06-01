import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import PageHeader from "../components/PageHeader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      counter: 0,
      GetTickerUrl: "https://cloud.iexapis.com/stable/tops?token=pk_14d7056bd568486cadda6c45dfcbdcf1&symbols=spy"
    };
    
  }



  render() {
    return (
      <div className="App">
        <Dashboard ></Dashboard>
      </div>
    );
  }
}
export default App;
