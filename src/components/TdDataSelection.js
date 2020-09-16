import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formatDate } from "../utils/Misc";

import {
  //Checkbox,
  //Paper,
  //Input,
  Grid,
  //InputLabel,
  Button,
  //FormControl,
  //InputBase,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@material-ui/core";

class TdDataSelection extends React.Component {
  constructor(props) {
    super(props);
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    var final = formatDate(futureDate);
    this.state = {
      endDate: final,
      userSymbol: "SPY",
      startDate: formatDate(new Date()),
    };
    this.callNewRequest = this.callNewRequest.bind(this);
    this.getDate = this.getDate.bind(this);
    this.updateSymbol = this.updateSymbol.bind(this);
    this.getStartDate = this.getStartDate.bind(this);
    this.prevDataCall = this.prevDataCall.bind(this);
  }

  componentDidMount() {
    try {
      var sym = localStorage.getItem("userSymbol");
      var end = localStorage.getItem("endDate");
      // if(end >= this.state.startDate)
      if (sym !== null && end !== null)
        this.setState({ userSymbol: sym, endDate: end }, this.prevDataCall);
    } catch {
      localStorage.clear();
    }
  }

  componentDidUpdate() {
    localStorage.setItem("userSymbol", this.state.userSymbol);
    localStorage.setItem("endDate", this.state.endDate);
  }

  prevDataCall() {
    var r;

    const stringReq =
      "https://api.tdameritrade.com/v1/marketdata/chains?apikey=" +
      this.props.tdKey +
      "&symbol=" +
      this.state.userSymbol +
      "&strikeCount=10&fromDate=" +
      this.state.startDate +
      "&toDate=" +
      this.state.endDate;

    fetch(stringReq)
      .then((response) => response.json())
      .then((data) => (r = data))
      .then(() => this.props.getPreviousChainData(r))
      .catch((er) => console.log(er));
  }

  callNewRequest() {
    var r;
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    var final = formatDate(futureDate); //if end date isn't selected just use a date 5 in advance

    const stringReq =
      "https://api.tdameritrade.com/v1/marketdata/chains?apikey=" +
      this.props.tdKey +
      "&symbol=" +
      this.state.userSymbol +
      "&strikeCount=10&fromDate=" +
      this.state.startDate +
      "&toDate=" +
      (!this.state.endDate || this.state.endDate === ""
        ? final
        : this.state.endDate);

    if (this.state.userSymbol && this.state.startDate) {
      fetch(stringReq)
        .then((response) => response.json())
        .then((data) => (r = data))
        .then(() => this.props.getNewData(r))
        .catch((er) => console.log(er));
    }
  }

  getDate(e) {
    var a = e.target.value;
    this.setState({ endDate: a });
  }

  getStartDate(e) {
    var a = e.target.value;
    this.setState({ startDate: a });
  }

  updateSymbol(e) {
    var a = e.target.value;
    a = a.toUpperCase();
    this.setState({ userSymbol: a });
  }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Accordion
          className={classes.expPanelChain}
          // style={{ backgroundColor: "gray",overflow:"scroll" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Data Selection</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
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
                  <TextField
                    className={classes.controlRoot}
                    label="Symbol"
                    value={this.state.userSymbol}
                    variant="outlined"
                    onChange={this.updateSymbol}
                  />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item className={classes.alignGridItems}>
                  <TextField
                    label="Start Date"
                    type="date"
                    disabled={true}
                    defaultValue={formatDate(new Date())}
                    //onChange={this.getStartDate}
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
                    value={this.state.endDate}
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
                    Get Chain Data
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default TdDataSelection;
