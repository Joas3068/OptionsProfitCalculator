import { Accordion } from "@material-ui/core";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { Button } from "@material-ui/core";

const BuySell = [
  {
    value: "buy",
    label: "Buy",
  },
  {
    value: "sell",
    label: "Sell",
  },
];

const type = [
  {
    value: "call",
    label: "Call",
  },
  {
    value: "put",
    label: "Put",
  },
];

const useStyles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    // fullWidth: true,
    backgroundColor: "rgb(230, 230, 230)",
    //display: "flex",
    //wrap: "nowrap",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: 75,
  },
  formBack: {
    backgroundColor: "rgb(230, 230, 230)",
  },
  formControlButton: {
    // fullWidth: true,
    backgroundColor: "rgb(179, 179, 179)",
    //display: "flex",
    //wrap: "nowrap",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: 75,
    color: "black",
  },
});

class OptionsForm extends React.Component {
  constructor(props) {
    super(props);
    var result = this.props.checksList.find((obj) => {
      return obj.GUID === this.props.currentEditGuid;
    });
    this.state = {
      optionsData: result,
    };
    this.prepareData = this.prepareData.bind(this);
    this.prepareDataNew = this.prepareDataNew.bind(this);
  }

  componentDidMount() {
    this.prepareData();
    this.handleChange();
    this.handleType();
  }

  prepareData() {
    //populate model
    var model = this.createData(false);
    //send to parent
    this.props.getFormData(model);
  }

  prepareDataNew() {
    //populate model
    var model = this.createData(true);
    //send to parent
    this.props.getFormData(model);
  }

  handleStockPriceChange = (event) => {
    this.setState({
      optionsData: {
        type: this.state.optionsData.type,
        buySell: this.state.optionsData.buySell,
        stockPrice: event.target.value > -1 ? event.target.value : 0,
        strikePrice: this.state.optionsData.strikePrice,
        expiration: this.state.optionsData.expiration,
        interestFree: Number.parseFloat(this.state.optionsData.interestFree),
        volatility: this.state.optionsData.volatility,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        breakEvens: this.state.optionsData.breakEvens,
        numberOfContracts: this.state.optionsData.numberOfContracts,
      },
    });
  };

  handleStrikePriceChange = (event) => {
    this.setState({
      optionsData: {
        type: this.state.optionsData.type,
        buySell: this.state.optionsData.buySell,
        stockPrice: this.state.optionsData.stockPrice,
        strikePrice: event.target.value > -1 ? event.target.value : 0,
        expiration: this.state.optionsData.expiration,
        interestFree: this.state.optionsData.interestFree,
        volatility: this.state.optionsData.volatility,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        numberOfContracts: this.state.optionsData.numberOfContracts,
      },
    });
  };

  handleExpChange = (event) => {
    this.setState({
      optionsData: {
        type: this.state.optionsData.type,
        buySell: this.state.optionsData.buySell,
        stockPrice: this.state.optionsData.stockPrice,
        strikePrice: this.state.optionsData.strikePrice,
        expiration: event.target.value > -1 ? event.target.value : 0,
        interestFree: Number.parseFloat(this.state.optionsData.interestFree),
        volatility: this.state.optionsData.volatility,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        breakEvens: this.state.optionsData.breakEvens,
        numberOfContracts: this.state.optionsData.numberOfContracts,
      },
    });
  };

  handleChange = (event) => {
    this.setState({
      optionsData: {
        type: this.state.optionsData.type,
        buySell: !event ? this.state.optionsData.buySell : event.target.value,
        stockPrice: this.state.optionsData.stockPrice,
        strikePrice: this.state.optionsData.strikePrice,
        expiration: this.state.optionsData.expiration,
        interestFree: this.state.optionsData.interestFree,
        volatility: this.state.optionsData.volatility,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        numberOfContracts: this.state.optionsData.numberOfContracts,
      },
    });
  };

  handleType = (event) => {
    this.setState({
      optionsData: {
        type: !event ? this.state.optionsData.type : event.target.value,
        buySell: this.state.optionsData.buySell,
        stockPrice: this.state.optionsData.stockPrice,
        strikePrice: this.state.optionsData.strikePrice,
        expiration: this.state.optionsData.expiration,
        interestFree: this.state.optionsData.interestFree,
        volatility: this.state.optionsData.volatility,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        numberOfContracts: this.state.optionsData.numberOfContracts,
      },
    });
  };

  handleVolChange = (event) => {
    this.setState({
      optionsData: {
        type: this.state.optionsData.type,
        buySell: this.state.optionsData.buySell,
        stockPrice: this.state.optionsData.stockPrice,
        strikePrice: this.state.optionsData.strikePrice,
        expiration: this.state.optionsData.expiration,
        interestFree: Number.parseFloat(this.state.optionsData.interestFree),
        volatility: event.target.value > -1 ? event.target.value : 0,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        breakEvens: this.state.optionsData.breakEvens,
        numberOfContracts: this.state.optionsData.numberOfContracts,
      },
    });
  };

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  createData(newItem) {
    return {
      type: this.state.optionsData.type,
      buySell: this.state.optionsData.buySell,
      stockPrice: this.state.optionsData.stockPrice,
      strikePrice: this.state.optionsData.strikePrice,
      expiration: this.state.optionsData.expiration,
      interestFree: Number.parseFloat(this.state.optionsData.interestFree),
      volatility: this.state.optionsData.volatility,
      greeks: [
        { volatility: "55%", delta: ".5", amount: 3 },
        { volatility: "59%", delta: ".2", amount: 1 },
      ],
      GUID: newItem ? this.uuidv4() : this.state.optionsData.GUID, //new guid
      priceArray: newItem ? [] : this.state.optionsData.priceArray,
      breakEvens: this.state.optionsData.breakEvens,
      numberOfContracts: this.state.optionsData.numberOfContracts,
    };
  }

  handleInterestChange = (event) => {
    this.setState({
      optionsData: {
        type: this.state.optionsData.type,
        buySell: this.state.optionsData.buySell,
        stockPrice: this.state.optionsData.stockPrice,
        strikePrice: this.state.optionsData.strikePrice,
        expiration: this.state.optionsData.expiration,
        interestFree:
          event.target.value > -1 ? Number.parseFloat(event.target.value) : 0,
        volatility: this.state.optionsData.volatility,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        breakEvens: this.state.optionsData.breakEvens,
        numberOfContracts: this.state.optionsData.numberOfContracts,
      },
    });
  };

  handleContractNumberChange = (event) => {
    this.setState({
      optionsData: {
        type: this.state.optionsData.type,
        buySell: this.state.optionsData.buySell,
        stockPrice: this.state.optionsData.stockPrice,
        strikePrice: this.state.optionsData.strikePrice,
        expiration: this.state.optionsData.expiration,
        interestFree: Number.parseFloat(this.state.optionsData.interestFree),
        volatility: this.state.optionsData.volatility,
        greeks: [
          { volatility: "55%", delta: ".5", amount: 3 },
          { volatility: "59%", delta: ".2", amount: 1 },
        ],
        GUID: this.state.optionsData.GUID,
        priceArray: this.state.optionsData.priceArray,
        breakEvens: this.state.optionsData.breakEvens,
        numberOfContracts:
          Number.parseFloat(event.target.value) > "0"
            ? Number.parseFloat(event.target.value)
            : 1,
      },
    });
  };

  getSelected() {
    var result = this.props.checksList.find((obj) => {
      return obj.GUID === this.props.currentEditGuid;
    });
    if (this.props.currentEditGuid !== this.state.optionsData.GUID) {
      this.setState({
        optionsData: result,
      });
    }
  }

  render() {
    const { classes } = this.props;
    this.getSelected(); //check to see if changes have been made since state needs to be kept seperately.
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formBack}>
          <Accordion className={classes.formBack} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
              //className={classes.heading}
              >
                Add/Edit Options
              </Typography>
            </AccordionSummary>

            <TextField
              className={classes.formControl}
              id="standard-select-CallPut"
              select
              //autoWidth={true}
              value={this.state.optionsData.type}
              onChange={this.handleType}
              helperText="Call/Put"
              width={20}
            >
              {type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.formControl}
              id="standard-select-buySell"
              select
              value={this.state.optionsData.buySell}
              onChange={this.handleChange}
              helperText="Buy or Sell"
              width={20}
            >
              {BuySell.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Stock Price</InputLabel>
              <Input
                value={this.state.optionsData.stockPrice}
                onChange={this.handleStockPriceChange}
                type="number"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Strike Price</InputLabel>
              <Input
                value={this.state.optionsData.strikePrice}
                onChange={this.handleStrikePriceChange}
                type="number"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">
                Expiration (Days)
              </InputLabel>
              <Input
                value={this.state.optionsData.expiration}
                onChange={this.handleExpChange}
                type="number"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Volatility (%)</InputLabel>
              <Input
                value={this.state.optionsData.volatility}
                onChange={this.handleVolChange}
                type="number"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Interest Free</InputLabel>
              <Input
                value={this.state.optionsData.interestFree}
                onChange={this.handleInterestChange}
                type="number"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">
                Number Of Contracts
              </InputLabel>
              <Input
                value={Number.parseFloat(
                  this.state.optionsData.numberOfContracts
                )}
                onChange={this.handleContractNumberChange}
                type="number"
              />
            </FormControl>
            <Button
              className={classes.formControlButton}
              variant="outlined"
              color="primary"
              onClick={this.prepareData}
            >
              Update
            </Button>
            <Button
              className={classes.formControlButton}
              variant="outlined"
              color="primary"
              onClick={this.prepareDataNew}
            >
              Add
            </Button>
          </Accordion>
        </div>
      </form>
    );
  }
}

export default withStyles(useStyles)(OptionsForm);
