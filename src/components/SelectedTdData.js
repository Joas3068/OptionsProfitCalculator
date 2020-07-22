import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  InputBase,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

class SelectedTdData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTdData: [],
    };
    this.testGuid = this.testGuid.bind(this);
  }

  testGuid = (event) => {
    this.props.getGuid(event);
  };

  render() {
    const classes = this.props.classes;

    return (
      <TableContainer component={Paper}>
        <Table
           className={classes.chainDataTable}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Strike Price&nbsp;</TableCell>
              <TableCell align="left">Expiration&nbsp;</TableCell>
              <TableCell align="left">Mark&nbsp;</TableCell>
              <TableCell align="left">Number of Contracts&nbsp;</TableCell>
              <TableCell align="left">Volatility&nbsp;</TableCell>
              <TableCell align="left">Delta&nbsp;</TableCell>
              <TableCell align="left">Open Interest&nbsp;</TableCell>
              <TableCell align="left">
                <Button
                  style={{ backgroundColor: "#bfbfbf", color: "black" }}
                  className={classes.headerButton}
                  variant="contained"
                  color="primary"
                  onClick={this.props.clearAll}
                >
                  Clear All
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(this.props.selectedTdData)
              ? this.props.selectedTdData.map((row) => (
                  <TableRow key={row.symbol}> 
                    <TableCell align="left">
                      <Checkbox
                        // checked={row.GUID === cGui.GUID ? true : false}
                        value={row.symbol}
                        onChangeCapture={this.props.getGuid}
                      ></Checkbox>
                    </TableCell>
                    <Tooltip title={row.buySell === "buy" ? "Buy" : "Sell"}>
                      <TableCell
                        className={
                          row.buySell === "buy"
                            ? this.props.classes.tableCellTrue
                            : this.props.classes.tableCellFalse
                        }
                        component="th"
                        scope="row"
                      >
                        {row.putCall === "CALL" ? "Call" : "Put"}
                      </TableCell>
                    </Tooltip>
                    <TableCell align="left">
                      {/* {row.buySell === "buy" ? "Buy" : "Sell"} */}
                      {row.strikePrice}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(row.expirationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">
                      {row.theoreticalOptionValue}
                    </TableCell>
                    <TableCell align="left">
                      <InputBase
                        inputProps={{
                          min: 0,
                          style: {
                            maxWidth: 50,
                            backgroundColor: "#f2f2f2",
                            textAlign: "center",
                          },
                        }}
                        onChange={this.props.updateContractNumber}
                        type="number"
                        value={row.numberOfContracts}
                        id={row.symbol}
                      ></InputBase>
                    </TableCell>
                    <TableCell align="left">{row.volatility}</TableCell>
                    <TableCell align="left">{row.delta}</TableCell>
                    <TableCell align="left">{row.openInterest}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        value={row.symbol}
                        size="medium"
                        onClick={this.props.deleteRow}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default SelectedTdData;
