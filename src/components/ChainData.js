import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import Container from "@material-ui/core/Container";
import { ExpansionPanel, Divider, Grid } from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
// import Paper from "@material-ui/core/Paper";
// import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

//expiration data and strike price are keys to access values
function Rows(props) {
  const [open, setOpen] = React.useState(false);

  var initialDateKey = Object.keys(props.contractData);
  var initialStrikeKey = Object.keys(props.contractData[initialDateKey[0]]);

  const [expirationKey, setExpirationKey] = React.useState(initialDateKey[0]);

  let index = 0;

  while (props.tdData.underlyingPrice - initialStrikeKey[index] > 0) index++;

  useEffect(() => {
    if (!(expirationKey in props.contractData)) {
      setExpirationKey(initialDateKey[0]);
      setStrikeKey(initialStrikeKey[index]);
    }
  }, [
    props.contractData,
    expirationKey,
    initialDateKey,
    initialStrikeKey,
    index,
  ]);
  const [strikeKey, setStrikeKey] = React.useState(initialStrikeKey[index]);

  const handleChange = (event) => {
    setExpirationKey(event.target.value);
  };

  const handleChangeStrike = (event) => {
    setStrikeKey(event.target.value);
  };

  function safeHandle(input) {
    try {
      return props.contractData[expirationKey][strikeKey][0][input];
    } catch {
      return "";
    }
  }
  function handleClick(e) {
    props.sendObject(
      props.contractData[expirationKey][strikeKey],
      e.currentTarget.id
    );
  }
  return (
    //ohgod
    <React.Fragment>
      {props.contractData[expirationKey] ? (
        <>
          <TableRow value={props.contractData[expirationKey][strikeKey]}>
            <TableCell>{+props.tdData.underlyingPrice.toFixed(2)}</TableCell>
            <TableCell component="th" scope="row">
              {
                <FormControl className={props.classes.formControl}>
                  <InputLabel shrink></InputLabel>
                  <Select
                    value={expirationKey}
                    onChange={handleChange}
                    //displayEmpty
                  >
                    {Object.keys(props.contractData).map((number, key) => (
                      <MenuItem key={key} value={number}>
                        {number}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
            </TableCell>
            <TableCell component="th" scope="row">
              {
                <FormControl>
                  <InputLabel shrink></InputLabel>
                  <Select
                    id="dateSelect"
                    value={strikeKey}
                    onChange={handleChangeStrike}
                    displayEmpty
                  >
                    {Object.keys(props.contractData[expirationKey]).map(
                      (ExpItem, index) => (
                        <MenuItem key={index} value={ExpItem}>
                          {ExpItem}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              }
            </TableCell>
            <TableCell align="left">
              <Tooltip title="Sell">
                <Button
                  className={props.classes.tableCellFalse}
                  id="sell"
                  onClick={handleClick}
                >
                  {safeHandle("bid")}
                </Button>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
              <Tooltip title="Buy">
                <Button
                  className={props.classes.tableCellTrue}
                  id="buy"
                  onClick={handleClick}
                >
                  {safeHandle("ask")}
                </Button>
              </Tooltip>
            </TableCell>
            <TableCell align="left">{safeHandle("volatility") + "%"}</TableCell>
            <TableCell align="left">{safeHandle("openInterest")}</TableCell>
            <TableCell
              className={
                safeHandle("inTheMoney")
                  ? props.classes.tableCellTrue
                  : props.classes.tableCellFalse
              }
              align="left"
            >
              {/* {new Date(safeHandle("expirationDate")).toLocaleDateString()} */}
              {safeHandle("inTheMoney") ? "ITM" : "OTM"}
            </TableCell>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            {/* <TableCell>
          <Typography style={{ display: "inline" }} variant="subtitle2">
            Add Selection
          </Typography>
          <Fab
            style={{ margin: 10, marginRight: 20 }} //change this
            size={"small"}
            className={props.classes.addButton}
            color="primary"
            aria-label="add"
            onClick={handleClick}
          >
            <AddIcon />
          </Fab>
        </TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Greeks&nbsp;
                    <Typography
                    //variant="srOnly"
                    >
                      {safeHandle("description")}
                    </Typography>
                  </Typography>
                  <Divider></Divider>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Delta</TableCell>
                        <TableCell align="left">Gamma</TableCell>
                        <TableCell align="left">Theta</TableCell>
                        <TableCell align="left">Vega</TableCell>
                        <TableCell align="left">Rho</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableCell align="left">{safeHandle("delta")}</TableCell>
                      <TableCell align="left">{safeHandle("gamma")}</TableCell>
                      <TableCell align="left">{safeHandle("theta")}</TableCell>
                      <TableCell align="left">{safeHandle("vega")}</TableCell>
                      <TableCell align="left">{safeHandle("rho")}</TableCell>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      ) : null}
    </React.Fragment>
  );
}

class ChainData extends React.Component {
  render() {
    const classes = this.props.classes;
    //var contractData = this.props.tdDataContract;
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
            <Typography className={classes.heading}>
              {this.props.optionType}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item xs={12}>
              <Table
                className={classes.chainDataTable}
                aria-label="collapsible table"
              >
                <TableHead>
                  <TableRow className={classes.tableRoot}>
                    <TableCell>Underlying Price</TableCell>
                    <TableCell>Expiration Date</TableCell>
                    <TableCell align="left">Strike Price</TableCell>
                    <TableCell align="left">Bid&nbsp;</TableCell>
                    <TableCell align="left">Ask&nbsp;</TableCell>
                    <TableCell align="left">Volatility&nbsp;</TableCell>
                    <TableCell align="left">Open Int.&nbsp;</TableCell>
                    <TableCell align="left">ITM/OTM&nbsp;</TableCell>
                    {/* <TableCell align="left">Greeks&nbsp;</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableRoot}>
                  <Rows
                    contractData={this.props.tdDataContract}
                    classes={classes}
                    sendObject={this.props.sendObject}
                    tdData={this.props.tdData}
                  ></Rows>
                </TableBody>
              </Table>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default ChainData;
