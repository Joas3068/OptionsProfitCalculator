import React from "react";

import { Button, Col, Form, Input, Row, Select, Typography } from "antd";

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
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
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
    this.getSelected(); //check to see if changes have been made since state needs to be kept seperately.

    return (
      <>
        <Form size='large'>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label='Call/Put' required tooltip='This is a required'>
                <Select
                  id='standard-select-CallPut'
                  value={this.state.optionsData.type}
                  onChange={this.handleType}
                >
                  {type.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={7}>
              <Form.Item label='Strike Price'>
                <Input
                  value={this.state.optionsData.strikePrice}
                  onChange={this.handleStrikePriceChange}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label='Stock Price'>
                <Input
                  value={this.state.optionsData.stockPrice}
                  onChange={this.handleStockPriceChange}
                />
              </Form.Item>
            </Col>

            <Col span={4} style={{ textAlign: "right" }}>
              <Form.Item>
                <Button type='primary' onClick={this.prepareData} block>
                  Update
                </Button>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='Sell/Buy' required tooltip='This is a required'>
                <Select
                  id='standard-select-buySell'
                  value={this.state.optionsData.buySell}
                  onChange={this.handleChange}
                  helperText='Buy or Sell'
                >
                  {BuySell.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label='Volatility (%)'>
                <Input
                  value={this.state.optionsData.volatility}
                  onChange={this.handleVolChange}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label='Interest Free'>
                <Input
                  value={this.state.optionsData.interestFree}
                  onChange={this.handleInterestChange}
                  type='number'
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label='Contracts #'>
                <Input
                  value={this.state.optionsData.numberOfContracts}
                  onChange={this.handleContractNumberChange}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label='Expiration (Days)'>
                <Input
                  value={this.state.optionsData.expiration}
                  onChange={this.handleExpChange}
                />
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              <Form.Item>
                <Button onClick={this.prepareDataNew} block>
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default OptionsForm;
