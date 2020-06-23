import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Button, InputBase } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
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
          // className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Strike Price&nbsp;</TableCell>
              <TableCell align="left">Expiration&nbsp;</TableCell>
              <TableCell align="left">Strike Price&nbsp;</TableCell>
              <TableCell align="left">Number of Contracts&nbsp;</TableCell>
              <TableCell align="left">Volatility&nbsp;</TableCell>
              <TableCell align="left">Interest Free&nbsp;</TableCell>
              <TableCell align="left">Mark&nbsp;</TableCell>
              <TableCell align="left">
                {/* <Button
                  className={classes.headerButton}
                  variant="contained"
                  color="primary"
                  onClick={this.props.clearSelected}
                >
                  Clear All
                </Button> */}
              </TableCell>
              <TableCell align="left">Number Of Contracts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(this.props.selectedTdData)
              ? this.props.selectedTdData.map((row) => (
                  <TableRow key={row.symbol}>
                    <TableCell align="left">
                      {/* <Checkbox
                    checked={row.GUID === cGui.GUID ? true : false}
                    value={row.GUID}
                    onChangeCapture={this.props.getGuid}
                  ></Checkbox> */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.putCall === "CALL" ? "Call" : "Put"}
                    </TableCell>
                    <TableCell align="left">
                      {/* {row.buySell === "buy" ? "Buy" : "Sell"} */}
                      {new Date(row.expirationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">
                      {row.theoreticalVolatility}
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
                    {/* <TableCell align="left">{row.expiration}</TableCell>
                <TableCell align="left">{row.volatility}</TableCell>
                <TableCell align="left">{row.interestFree}</TableCell> */}
                    {/* <TableCell align="left">
                  {Number.parseFloat(row.optionPriceAtPurchase / 100).toFixed(
                    2
                  )}
                </TableCell> */}
                    {/* <TableCell align="center">
                  <IconButton
                    value={row.GUID}
                    size="medium"
                    onClick={this.props.deleteRow}
                  >
                    <DeleteIcon />
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell> */}
                    {/* <TableCell align="center">
                   {row.numberOfContracts}
                </TableCell> */}
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
