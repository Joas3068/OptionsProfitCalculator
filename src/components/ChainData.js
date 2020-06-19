import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import { ExpansionPanel } from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

function Rows(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);


  var initialDateKey = Object.keys(props.contractData);
  var initialStrikeKey = Object.keys(props.contractData[initialDateKey[0]])
  const [expirationKey, setExpirationKey] = React.useState(initialDateKey[0]);
  const [strikeKey, setStrikeKey] = React.useState(initialStrikeKey[0]);
  const handleChange = (event) => {
    setExpirationKey(event.target.value);
  };
  const handleChangeStrike = (event) => {
    setStrikeKey(event.target.value);
  };


  return (
    <React.Fragment>
      <TableRow>
        {/* <TableCell> */}
        {/* <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        {/* <Checkbox
            checked={isPresent ? true : false}
            onClick={props.update(row)}
          ></Checkbox> */}
        {/* </TableCell> */}
        <TableCell component="th" scope="row">
          {
            <FormControl
            //className={classes.formControl}
            >
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
               
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={expirationKey}
                onChange={handleChange}
                displayEmpty
                //className={classes.selectEmpty}
              >
                {Object.keys(props.contractData).map((number) => (
                  <MenuItem value={number}>{number}</MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>Label + placeholder</FormHelperText> */}
            </FormControl>
          }
        </TableCell>
        <TableCell component="th" scope="row">
          {
            <FormControl
            >
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
               
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={strikeKey}
                onChange={handleChangeStrike}
                displayEmpty
              >
              
                {Object.keys(props.contractData[expirationKey]).map((number) => (
                  <MenuItem value={number}>{number}</MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>Label + placeholder</FormHelperText> */}
            </FormControl>
          }
        </TableCell>
        <TableCell align="left">{props.contractData[expirationKey][strikeKey][0].mark}</TableCell>
        <TableCell align="left">{props.contractData[expirationKey][strikeKey][0].strikePrice}</TableCell>
        <TableCell align="left">{props.contractData[expirationKey][strikeKey][0].strikePrice}</TableCell>
        <TableCell align="left">{props.contractData[expirationKey][strikeKey][0].openInterest}</TableCell>
        <TableCell align="left">
          {new Date(props.contractData[expirationKey][strikeKey][0].expirationDate).toLocaleDateString()}
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Greeks
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Volatility</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.greeks.map((greeksRow) => (
                    <TableRow key={greeksRow.volatility}>
                      <TableCell component="th" scope="row">
                        {greeksRow.volatility}
                      </TableCell>
                      <TableCell>{greeksRow.delta}</TableCell>
                      <TableCell align="right">{greeksRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(greeksRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

class ChainData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tdData: {} };
  }

  getChainList(chain) {
    var chainList = [];
    var keys = Object.keys(chain);
    for (let index = 0; index < keys.length; index++) {
      var DateObject = chain[keys[index]];
      var strikeKeys = Object.keys(DateObject);
      for (let j = 0; j < strikeKeys.length; j++) {
        for (let k = 0; k < DateObject[strikeKeys[j]].length; k++) {
          console.log(DateObject[strikeKeys[j]][k]);
          chainList.push(DateObject[strikeKeys[j]][k]);
        }
      }
    }
    return chainList;
  }

  render() {
    const classes = this.props.classes;
    var contractData = this.props.tdDataContract;
    var keys = Object.keys(contractData);
    var optionsList = this.getChainList(contractData);
    const listItems = optionsList.map((number) => (
      <li key={number.symbol}>{number.symbol + "----" + number.strikePrice}</li>
    ));
    return (
      <ExpansionPanel
      // className={
      //   this.props.optionType === "CALL"
      //     ? classes.expPanelCall
      //     : classes.expPanelPut
      // }
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
          <Container
            maxWidth="lg"
            //className={this.props.classes.container}
          >
            <TableContainer>
              <Table aria-label="collapsible table">
                <TableHead
                //className={classes.tableHead}
                >
                  <TableRow>
                    <TableCell>Expiration Date</TableCell>
                    <TableCell align="left">Strike Price</TableCell>
                    <TableCell align="left">Buy or Sell&nbsp;</TableCell>
                    <TableCell align="left">Current Price&nbsp;</TableCell>
                    <TableCell align="left">Strike Price&nbsp;</TableCell>
                    <TableCell align="left">Expiration&nbsp;</TableCell>
                    <TableCell align="left">Volatility&nbsp;</TableCell>
                    <TableCell align="left">Interest Free&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {keys.map((number) => (
                    <Row key={number.symbol} row={number}>
                      
                    </Row>
                    
                  ))} */}
                  <Rows contractData={contractData}></Rows>
                  {/* {listItems} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ChainData;
//export default (ChainData);
