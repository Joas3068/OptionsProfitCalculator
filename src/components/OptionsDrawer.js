import React, { useState } from "react";

import {
  FormControlLabel,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";

import { Menu, Layout, Button, Switch } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RiseOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
  BoxPlotOutlined,
  StockOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {
  CallDebitSpread,
  PutCreditSpread,
  LongCall,
  ShortPut,
  IronCondor,
} from "../utils/StrategyData";

//import DataKeyDialog from "../Elements/DataKeyDialog";

const { Header, Sider, Content } = Layout;

export default function OptionsDrawer(props) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);
  const [value, setValue] = useState(props.tdKey);
  const toggleDrawer = () => setOpen(!open);

  //const { prop } = props;
  const handleInputChange = (event) => {
    setValue(event.target.value);
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
    <Layout>
      <Sider trigger={null} collapsible collapsed={open}>
        <div className="logo" style={{ color: "#fff" }}>
          Bullish Strategies
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={open}
        >
          <Menu.Item key="1" icon={<RiseOutlined />} onClick={sendCallDebit}>
            Call Debit Spread
          </Menu.Item>
          <Menu.Item key="2" icon={<StockOutlined />} onClick={sendPutCredit}>
            Put Credit Spread
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ArrowsAltOutlined />}
            onClick={sendLongCall}
          >
            Long Call
          </Menu.Item>
          <Menu.Item key="4" icon={<ShrinkOutlined />} onClick={sendShortPut}>
            Short Put
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<BoxPlotOutlined />}
            onClick={sendIronCondor}
          >
            Iron Condor
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(open ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: toggleDrawer,
          })}

          <h2 style={{ color: "#fff", margin: "1em auto" }}>
            Options Strategies
          </h2>

          <FormControlLabel
            control={
              <Switch
                onChange={handleChange}
                // defaultChecked={props.dataModeState}
                checked={props.dataModeState}
                aria-label="toggle-mode"
              />
            }
            style={{ margin: "1em auto" }}
            label={"Toggle Data Mode"}
          />

          <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
            <DialogContent>
              <DialogContentText>
                Enter TD Ameritrade developers key for options data.
                <Link href="https://developer.tdameritrade.com/">
                  Sign Up Here
                </Link>
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
        </Header>
      </Layout>
    </Layout>
  );
}
