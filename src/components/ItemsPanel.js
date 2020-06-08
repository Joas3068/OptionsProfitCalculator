import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SelectedItems from "../components/SelectedItems";
// import clsx from "clsx";
import HeaderBlock from "../components/HeaderBlock";
import { ExpansionPanel } from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

class ItemsPanel extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <ExpansionPanel
        className={
          this.props.optionType === "call"
            ? classes.expPanelCall
            : classes.expPanelPut
        }
        defaultExpanded={true}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Selected Options</Typography>
        </ExpansionPanelSummary>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <HeaderBlock
              classes={classes}
              clearSelected={() => this.props.clearSelected()}
              updateRows={() => this.props.updateRows()}
              calculateOptionsPrice={() => this.props.calculateOptionsPrice()}
            ></HeaderBlock>
          </Grid>
          <SelectedItems
            className={classes}
            clearSelected={() => this.props.clearSelected()}
            getGuid={(e) => this.props.getGuid(e)}
            currentEditGuid={this.props.currentEditGuid}
            checksList={this.props.checksList}
          ></SelectedItems>
        </Paper>
      </ExpansionPanel>
    );
  }
}

export default ItemsPanel;
