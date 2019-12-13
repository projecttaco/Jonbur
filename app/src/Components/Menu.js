import React, { Component } from "react";
import { drizzleConnect } from 'drizzle-react';
const { Drawer, Button, Radio } = antd;

const RadioGroup = Radio.Group;

class Menu extends React.Component {
  state = { visible: false, placement: 'left' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <RadioGroup
          style={{ marginRight: 8 }}
          defaultValue={this.state.placement}
          onChange={this.onChange}
        >
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </RadioGroup>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      state: state,
      current: state.menu.current,
      account: state.accounts[0],
      balance: state.accountBalances[state.accounts[0]],
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      goto: value => dispatch({ type: 'GOTO', value: value }),
    };
  }
  
  export default drizzleConnect(Menu, mapStateToProps, mapDispatchToProps);
  