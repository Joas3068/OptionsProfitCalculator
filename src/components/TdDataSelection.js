import React from "react";
// import Box from "@material-ui/core/Box";
// import Collapse from "@material-ui/core/Collapse";
// import IconButton from "@material-ui/core/IconButton";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Tooltip from "@material-ui/core/Tooltip";

import {
  Checkbox,
  //Paper,
  //Input,
  Grid,
  InputLabel,
  Button,
  FormControl,
  InputBase,
  Divider,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";

class TdDataSelection extends React.Component {
  constructor(props) {
    super(props);

    this.callNewRequest = this.callNewRequest.bind(this);
  }

  callNewRequest() {
    var r;
    //      fetch("https://api.tdameritrade.com/v1/marketdata/chains?apikey=HULFYOXJ8NBCAEZRRDZWJWDFPTNJKUHF&symbol=SPY&strikeCount=6&fromDate=2020-07-06&toDate=2020-07-09")
    //  //fetch("https://api.maharristhepug.com/api/optionsdata")
    //  .then(response => response.json())
    //  .then(data => r = data)
    // //  .then(() => this.getRes(r))
    // .then(data => console.log("API-DATA: " + data))
    // .then( ()=>this.props.getNewData(r));
    this.props.getNewData(r);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <ExpansionPanel
          className={classes.expPanelChain}
          // style={{ backgroundColor: "gray",overflow:"scroll" }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Data Selection</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item xs={12}>
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
                    //onChange={(e) => this.updateDaysNumber(e)}
                    type="number"
                   // value={this.state.numberOfDays}
                  ></InputBase>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item className={classes.alignGridItems}>
                  <InputLabel>P/L</InputLabel>
                  <Checkbox
                    className={classes.controlRoot}
                    //checked={this.state.showTip}
                    size={"small"}
                    //onChangeCapture={(e) => this.changeToolTip(e)}
                  ></Checkbox>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item className={classes.alignGridItems}>
                  <InputLabel>X-Min</InputLabel>
                  <InputBase
                    inputProps={{
                      min: 0,
                      style: {
                        maxWidth: 55,
                        backgroundColor: "#f2f2f2",
                        textAlign: "center",
                      },
                    }}
                    //onChange={(e) => this.updateXMin(e)}
                    type="number"
                  ></InputBase>
                </Grid>
                <Grid item className={classes.alignGridItems}>
                  <InputLabel>X-Max</InputLabel>
                  <InputBase
                    inputProps={{
                      min: 0,
                      style: {
                        maxWidth: 55,
                        backgroundColor: "#f2f2f2",
                        textAlign: "center",
                      },
                    }}
                    //onChange={(e) => this.updateXMax(e)}
                    type="number"
                  ></InputBase>
                </Grid>
                <Grid item className={classes.alignGridItems}>
                  <Button
                    className={classes.controlRoot}
                    //style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',backgroundColor:"gray"}}
                    onClick={this.props.getNewData}
                  >
                    Default
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default TdDataSelection;
