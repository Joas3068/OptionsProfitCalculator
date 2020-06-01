import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class SelectedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfExpiration: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ dateOfExpiration: value });
  }


  render() {
    const classes = this.props.className;
    return (
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Buy or Sell&nbsp;</TableCell>
              <TableCell align="left">Stock Price&nbsp;</TableCell>
              <TableCell align="left">Strike Price&nbsp;</TableCell>
              <TableCell align="left">Expiration&nbsp;</TableCell>
              <TableCell align="left">Volatility&nbsp;</TableCell>
              <TableCell align="left">Interest Free&nbsp;</TableCell>
              <TableCell align="left">
                <Button
                  className={classes.headerButton}
                  variant="contained"
                  color="primary"
                  onClick={this.props.clearSelected}
                >
                  Clear All
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.selectedItems.map((row) => (
              <TableRow key={row.GUID}>
                <TableCell align="left">
                  <Checkbox checked={true}></Checkbox>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="left">{row.buySell === 'buy'?"Buy":"Sell"}</TableCell>
                <TableCell align="left">{row.stockPrice}</TableCell>
                <TableCell align="left">{row.strikePrice}</TableCell>
                <TableCell align="left">{row.expiration}</TableCell>
                <TableCell align="left">{row.volatility}</TableCell>
                <TableCell align="left">{row.interestFree}</TableCell>

                <TableCell>
                Count
                  {/* <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                    <Select
                      native
                      value={22}
                      onChange={(event) =>
                        this.handleChange(event.target.value)
                      }
                      inputProps={{
                        name: "age",
                        id: "age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={10}>Ten</option>
                      <option value={20}>Twenty</option>
                      <option value={30}>Thirty</option>
                    </Select>
                  </FormControl> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default SelectedItems;
