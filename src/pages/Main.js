import React, { useState, useEffect } from "react";
import ParentComp from "./ParentComp";
import TdDataMode from "./TdDataMode";

export default function Main() {
  //TODO: Display symbols, move chain data selection
  //TODO: Store previous selection in cache
  //TODO: Dates need to be in chart display and handled gracefully...
  //TODO: API call needs error handling and user updates
  //TODO: Remove hard coded data.
  //TODO: Add strategy selector to tdDataMode needs to be more intuitive

  const [state, setState] = useState({
    tdData: true,
    tdKey: "HULFYOXJ8NBCAEZRRDZWJWDFPTNJKUHF",
  });

  const toggleDataMode = (val, TDKey) =>
    setState({
      tdData: val,
      tdKey: TDKey,
    });

  useEffect(
    () => localStorage.setItem("tdData", JSON.stringify(state.tdData)),
    [state.tdData]
  );

  useEffect(() => {
    const getData = async () => {
      try {
        let tdData = await JSON.parse(localStorage.getItem("tdData"));
        //var cg = JSON.parse(localStorage.getItem("tdKey"));
        return tdData !== undefined
          ? setState(tdData)
          : console.warn("tdData not found");
      } catch (error) {
        console.error(error);
        localStorage.clear();
      }
    };
    getData();
    return () => {
      localStorage.removeItem("tdData");
    };
  }, []);

  return !state.tdData ? (
    <ParentComp
      tdKey={state.tdKey}
      toggleDataMode={toggleDataMode}
      dataModeState={state.tdData}
    />
  ) : (
    <TdDataMode
      tdKey={state.tdKey}
      toggleDataMode={toggleDataMode}
      dataModeState={state.tdData}
    />
  );
}
