import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
}));

export default function OptionsDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //const { prop } = props;

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
          <Typography variant="h6" noWrap>
            Options Strategies
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        // variant="persistent"
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
    </div>
  );
}

const CallDebitSpread = [
  {
    type: "call",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 455,
    expiration: 6,
    interestFree: 0.02,
    volatility: 25,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

const PutCreditSpread = [
  {
    type: "put",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 455,
    expiration: 6,
    interestFree: 0.02,
    volatility: 56,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "put",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 52,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

const LongCall = [
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

const ShortPut = [
  {
    type: "put",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 445,
    expiration: 6,
    interestFree: 0.02,
    volatility: 22,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];

const IronCondor = [
  {
    type: "call",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 455,
    expiration: 6,
    interestFree: 0.02,
    volatility: 44,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "call",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 460,
    expiration: 6,
    interestFree: 0.02,
    volatility: 43,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "put",
    buySell: "sell",
    stockPrice: 450,
    strikePrice: 435,
    expiration: 6,
    interestFree: 0.02,
    volatility: 56,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
  {
    type: "put",
    buySell: "buy",
    stockPrice: 450,
    strikePrice: 430,
    expiration: 6,
    interestFree: 0.02,
    volatility: 52,
    greeks: [
      { volatility: "55%", delta: ".5", amount: 3 },
      { volatility: "59%", delta: ".2", amount: 1 },
    ],
    GUID: "",
    isEditing: false,
    priceArray: [[]],
    breakEvens: [],
    numberOfContracts: 1,
  },
];
