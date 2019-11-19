import React, { Component } from "react";

import 'antd/dist/antd.css';
import "./App.css";

import {  drizzleConnect } from 'drizzle-react';
import Home from './Components/Home';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
// const Caver = require('caver-js');
// const caver = new Caver('https://api.baobab.klaytn.net:8651/');
// drizzle.web3 = caver;
// console.log(caver);

class App extends Component {
  state = {
    current: '2'
  }
  chanceContent = e => {
    this.setState({
      current: e.key
    })
  }

  renderContent = current => {
    switch (current) {
      case '1':
        return <Home />
      case '2':
        return <Deposit visibleResult={false} />
      case '3':
        return <Withdraw />
      default:
        return <Home />
    }
  }

  renderFooter = current => {
    if (current === '2' || current === '4') return <Footer style={{ textAlign: 'center' }}>Team TACO ©2019 Created by TEAM TACO</Footer>
    else return <Footer style={{ textAlign: 'center', backgroundColor: '#003368', color: 'white' }}>Team TACO ©2019 Created by TEAM TACO</Footer>
  }
  render() {
    const {current} = this.props;
    return (
          <Layout className="layout">
            <Header>
              <div className="logo" style={{ lineHeight: '64px' }}>
                Jonbur.
          </div>
              <Menu
                theme={'dark'}
                mode="horizontal"
                selectedKeys={[current]}
                style={{ lineHeight: '64px' }}
                onSelect={e => this.props.goto(e.key)}
              >
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Deposit</Menu.Item>
                <Menu.Item key="3">Withdraw</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ height: '85vh' }}>
              {this.renderContent(current)}
            </Content>
            {this.renderFooter(current)}
          </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    current: state.menu.current,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goto: value => dispatch({ type: 'GOTO', value: value }),
  };
}

export default drizzleConnect(App, mapStateToProps, mapDispatchToProps);
