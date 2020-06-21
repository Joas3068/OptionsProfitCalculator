import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Colors from "../utils/Colors";
import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {
  CallDebitSpread,
  PutCreditSpread,
  LongCall,
  ShortPut,
  IronCondor,
} from "../utils/StrategyData";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DataKeyDialog from "../Elements/DataKeyDialog";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(4),
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: Colors.Secondary,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: Colors.Tables,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: Colors.Tables,
    "&$checked": {
      color: Colors.Tables,
    },
    "&$checked + $track": {
      backgroundColor: Colors.Tables,
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function OptionsDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [toggleMode, setToggleMode] = React.useState(false);
  const [value, setValue] = React.useState(" ");
  //const { prop } = props;
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function sendCallDebit() {
    props.updateStrategy(CallDebitSpread);
  }

  function sendPutCredit() {
    props.updateStrategy(PutCreditSpread);
  }

  function sendLongCall() {
    props.updateStrategy(LongCall);
  }

  function sendShortPut() {
    props.updateStrategy(ShortPut);
  }

  function sendIronCondor() {
    props.updateStrategy(IronCondor);
  }

  function handleChange(e) {
    var a = e.target.checked;
    if (!toggleMode && a) {
      setOpenDialog(true);
      setToggleMode(a);
    } else if (!toggleMode && !a) {
      setOpenDialog(false);
      setToggleMode(a);
      changeMode();
    }
  }

  function changeMode() {
    props.toggleDataMode(toggleMode, value);
  }

  function handleClose() {
    setToggleMode(false);
    setOpenDialog(false);
    props.toggleDataMode(!toggleMode, value);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        // variant={"persistent"}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            Options Strategies
          </Typography>

          <FormControlLabel
            control={
              <PurpleSwitch
                onChange={handleChange}
                // defaultChecked={props.dataModeState}
                checked={props.dataModeState}
                aria-label="toggle-mode"
              />
            }
            label={"Toggle Data Mode"}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <ShowChartIcon>Bullish Strategies</ShowChartIcon>
        <Divider />
        <Button onClick={sendCallDebit}>Call Debit Spread</Button>
        <Button onClick={sendPutCredit}>Put Credit Spread</Button>
        <Button onClick={sendLongCall}>Long Call</Button>
        <Button onClick={sendShortPut}>Short Put</Button>
        <Divider />
        <Button onClick={sendIronCondor}>Iron Condor</Button>
        <Button onClick={sendPutCredit}>Put Credit Spread</Button>
        <Button onClick={sendLongCall}>Long Call</Button>
        <Button onClick={sendShortPut}>Short Put</Button>
        <Divider />
      </Drawer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            Enter TD Ameritrade developers key for options data.
          </DialogContentText>
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="TD Key"
            type="string"
            fullWidth
            onChange={handleInputChange}
            value={value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={changeMode} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
