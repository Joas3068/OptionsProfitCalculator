import React from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export class HeaderBlock extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     // this.state = {

  //     // };
  //   }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Grid className={classes.headerBlock} xs={12}>

          <Grid xs={12} item>
            <Button
              className={classes.headerButton}
              variant="contained"
              color="primary"
              onClick={this.props.calculateOptionsPrice}
            >
              Calculate
            </Button>

            {/* <Button
              className={classes.headerButton}
              variant="contained"
              color="secondary"
              onClick={this.props.updateRows}
            >
              Update
            </Button> */}
          </Grid>

          {/* <Grid xs={6}>
            <TextField
              id="ticker"
              label="Ticker Symbol"
              variant="outlined"
              //   fullWidth
            />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

export default HeaderBlock;
