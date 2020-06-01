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



function createData(type, buysell, stockPrice, strikePrice, expiration, interestFree,volatility, GUID) {
  return {
    type,
    buysell,
    stockPrice,
    strikePrice,
    expiration,
    interestFree,
    volatility,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const isPresent = props.currentSelection.find((o) => o.GUID === row.GUID);
  return (
    <React.Fragment>
      <TableRow >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Checkbox
            checked={isPresent ? true : false}
            onClick={props.update(row)}
          ></Checkbox>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.type}
        </TableCell>
        <TableCell align="left">{row.buysell}</TableCell>
        <TableCell align="left">{row.stockPrice}</TableCell>
        <TableCell align="left">{row.strikePrice}</TableCell>
        <TableCell align="left">{row.expiration}</TableCell>
        <TableCell align="left">{row.volatility}</TableCell>
        <TableCell align="left">{row.interestFree}</TableCell>
      </TableRow>
      <TableRow>
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
      </TableRow>
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
    this.state = { counter: 0, counterList: [], checksList: [] };
    this.appendToList = this.appendToList.bind(this);
  }

  countRows = () => {
    let rowsz = [];
    for (let index = 0; index < 25; index++) {
      rowsz.push(
        createData(
          index,
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random()
        )
      );
    }
    return rowsz;
  };

  appendToList(val) {
    return () => {
      this.setState({
        checksList: this.state.checksList.concat(val),
      });
    };
  }

  render() {
    const getR = this.props.rowData;
    const classes = this.props.classes;
    return (
      <ExpansionPanel className={ this.props.optionType==="Call"? classes.expPanelCall:classes.expPanelPut}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{this.props.optionType}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container maxWidth="lg" className={this.props.classes.container}>
            <TableContainer >
              <Table aria-label="collapsible table">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Buy or Sell&nbsp;</TableCell>
                    <TableCell align="left">Current Price&nbsp;</TableCell>
                    <TableCell align="left">Strike Price&nbsp;</TableCell>
                    <TableCell align="left">Expiration&nbsp;</TableCell>
                    <TableCell align="left">Volatility&nbsp;</TableCell>
                    <TableCell align="left">Interest Free&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getR.map((row) =>
                    row.optionType === this.props.optionType ? (
                      <Row
                        key={row.name}
                        row={row}
                        update={(row) => this.props.addDataFunc(row)}
                        currentSelection={this.props.checksList}
                        classes={this.props.classes}
                      />
                    ) : null
                  )}
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
