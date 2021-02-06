import React, { useState } from "react";

import { Menu, Layout, Switch } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RiseOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
  BoxPlotOutlined,
  StockOutlined,
} from "@ant-design/icons";
import {
  CallDebitSpread,
  PutCreditSpread,
  LongCall,
  ShortPut,
  IronCondor,
} from "../utils/StrategyData";

//import DataKeyDialog from "../Elements/DataKeyDialog";

export default function OptionsDrawer(props) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);
  const [value, setValue] = useState(props.tdKey);
  const { Sider } = Layout;
  const toggleDrawer = () => setOpen(!open);

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

  return (
    <>
      <Sider trigger={null} collapsible collapsed={open}>
        <div
          className='logo'
          style={{
            textAlign: open ? "left" : "center",
            paddingLeft: open ? ".7rem" : "1rem",
          }}
        >
          {open ? "B/S" : "Bullish Strategies"}
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode='inline'
          theme='dark'
          inlineCollapsed={open}
        >
          <Menu.Item key='1' icon={<RiseOutlined />} onClick={sendCallDebit}>
            Call Debit Spread
          </Menu.Item>
          <Menu.Item key='2' icon={<StockOutlined />} onClick={sendPutCredit}>
            Put Credit Spread
          </Menu.Item>
          <Menu.Item
            key='3'
            icon={<ArrowsAltOutlined />}
            onClick={sendLongCall}
          >
            Long Call
          </Menu.Item>
          <Menu.Item key='4' icon={<ShrinkOutlined />} onClick={sendShortPut}>
            Short Put
          </Menu.Item>
          <Menu.Item
            key='5'
            icon={<BoxPlotOutlined />}
            onClick={sendIronCondor}
          >
            Iron Condor
          </Menu.Item>

          {open ? null : (
            <h5
              style={{
                color: "#fff",
                margin: "1em auto",
                fontSize: "1rem",
                paddingLeft: "1rem",
              }}
            >
              Options Strategies
            </h5>
          )}

          <Switch
            onChange={(e) => handleChange(e)}
            style={{ margin: open ? "0 auto" : "unset", paddingLeft: "1rem" }}
            checked={props.dataModeState}
            aria-label='toggle-mode'
            disabled
          />

          {open ? null : <label>Toggle Data Mode</label>}
        </Menu>
      </Sider>
      {React.createElement(open ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        style: {
          backgroundColor: "#fff",
          margin: "0 auto",
          padding: "1rem auto .5rem",
          maxHeight: "64px",
        },
        onClick: toggleDrawer,
      })}
    </>
  );
}
// <Dialog
//   open={openDialog}
//   onClose={handleClose}
//   aria-labelledby='form-dialog-title'
// >
//   <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//   <DialogContent>
//     <DialogContentText>
//       Enter TD Ameritrade developers key for options data.
//       <Link href='https://developer.tdameritrade.com/'>
//         Sign Up Here
//       </Link>
//     </DialogContentText>
//     <TextField
//       // autoFocus
//       margin='dense'
//       id='name'
//       label='TD Key'
//       type='string'
//       fullWidth
//       onChange={handleInputChange}
//       value={value}
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleClose} color='primary'>
//       Cancel
//     </Button>
//     <Button onClick={changeMode} color='primary'>
//       Submit
//     </Button>
//   </DialogActions>
// </Dialog>
