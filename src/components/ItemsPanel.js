import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SelectedItems from "../components/SelectedItems";
// import clsx from "clsx";
// import HeaderBlock from "../components/HeaderBlock";

class ItemsPanel extends React.Component {
  render() {
    const classes = this.props.classes;

    return (
      <>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            {/* <HeaderBlock
              classes={classes}
              clearSelected={() => this.props.clearSelected()}
              updateRows={() => this.props.updateRows()}
              calculateOptionsPrice={() => this.props.calculateOptionsPrice()}
            ></HeaderBlock> */}
          </Grid>
          <SelectedItems
            className={classes}
            clearSelected={() => this.props.clearSelected()}
            getGuid={(e) => this.props.getGuid(e)}
            currentEditGuid={this.props.currentEditGuid}
            checksList={this.props.checksList}
            deleteRow={(e) => this.props.deleteRow(e)}
          ></SelectedItems>
        </Paper>
      </>
    );
  }
}

export default ItemsPanel;
