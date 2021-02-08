import React from "react";
import clsx from "clsx";
//import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { secondaryListItems } from "../listItems";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function fetchUsers(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) =>
      this.setState({
        data: {
          symbol: data[0].symbol,
        },
      })
    )
    // Catch any errors we hit and update the app
    .catch((error) => this.setState({ error, isLoading: false }));
}

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checksList: [],
      rowData: this.countRows(),
      isOpen: false,
    };
    this.updateChecks = this.updateChecks.bind(this);
    this.addData = this.addData.bind(this);
  }

  handleDrawerOpen = () => {
    this.setOpen(true);
  };
  handleDrawerClose = () => {
    this.setOpen(false);
  };

  setOpen = (props) => {
    this.setState = {
      isOpen: props,
    };
  };

  clearSelected() {
    this.setState({
      checksList: [],
    });
  }

  updateRows() {
    this.setState({
      rowData: this.countRows(),
      checksList: [],
    });
  }
  countRows = () => {
    let rowsz = [];
    for (let index = 0; index < 25; index++) {
      rowsz.push(
        this.createData(
          index,
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100)
        )
      );
    }
    return rowsz;
  };

  addData(val) {
    return () => {
      this.setState({
        checksList: this.state.checksList.concat(val),
      });
    };
  }

  updateChecks(val) {
    return () => {
      this.setState({
        checksList: this.state.checksList.concat(val),
      });
    };
  }

  createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        { date: "2020-01-05", customerId: "11091700", amount: 3 },
        { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
      ],
    };
  }
  render() {
    const { classes } = this.props;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <AppBar
          position='absolute'
          className={clsx(
            classes.appBar,
            this.setOpen(this.state.isOpen) && classes.appBarShift
          )}
        >
          <Toolbar className={classes.toolbar} style={defaultColors}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={this.handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                this.setOpen(this.state.isOpen) && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='fixed'
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !this.setOpen(this.state.isOpen) && classes.drawerPaperClose
            ),
          }}
          open={this.setOpen(this.state.isOpen)}
          style={defaultColors}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container fixed className={classes.container}>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}

export default compose(withStyles(styles))(Dashboard);
// export default Dashboard;
