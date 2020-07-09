import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formatDate } from "../utils/Misc";

import {
  Checkbox,
  //Paper,
  //Input,
  Grid,
  InputLabel,
  Button,
  //FormControl,
  //InputBase,
  Divider,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
} from "@material-ui/core";

class TdDataSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      endDate: undefined,
    };
    this.callNewRequest = this.callNewRequest.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  callNewRequest() {
    var r;

    const stringReq =
      "https://api.tdameritrade.com/v1/marketdata/chains?apikey=" +
      this.props.tdKey +
      "&symbol=SPY&strikeCount=6&fromDate=2020-07-06&toDate=" +
      this.state.endDate;

    fetch(stringReq)
      .then((response) => response.json())
      .then((data) => (r = data))
      .then(() => this.props.getNewData(r));
  }

  getDate(e) {
    var a = e.target.value;
    this.setState({ endDate: a });
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
            <Grid container >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={1}
                className={classes.papa}
              >
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
                  <TextField
                    label="Start Date"
                    type="date"
                    defaultValue={formatDate(new Date())}
                    onChange={this.getStartDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item className={classes.alignGridItems}>
                  <TextField
                    label="End Date"
                    type="date"
                    onChange={this.getDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item className={classes.alignGridItems}>
                  <Button
                    className={classes.controlRoot}
                    onClick={this.callNewRequest}
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
