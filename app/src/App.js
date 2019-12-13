import React, { Component } from "react";

import 'antd/dist/antd.css';
import "./App.css";

import { drizzleConnect } from 'drizzle-react';
import Home from './Components/Home';
import Deposit from './Components/DepositLegacy';
import Dashboard from './Components/Dashboard';
import Withdraw from './Components/Withdraw';
import { Layout, Menu, Icon } from 'antd';
import LoadingContainer from './Components/LoadingContainer';
import web3 from 'web3';
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
        // return <Deposit visibleResult={false} />
        return <Dashboard />
      // return <Withdraw />
      case '3':
        return <Withdraw />
      default:
        return <Home />
    }
  }

  renderFooter = current => {
    if (current === '2' || current === '4') return <Footer style={{ marginTop: '30px', textAlign: 'center' }}>Team TACO ©2019 Created by TEAM TACO</Footer>
    else return <Footer style={{ marginTop: '30px', textAlign: 'center', backgroundColor: '#003368', color: 'white' }}>Team TACO ©2019 Created by TEAM TACO</Footer>
  }
  render() {
    const { current, balance, account } = this.props;
    return (
      <Layout className="layout">
        <Header style={{ padding: '0 25px', position: 'fixed', width: '100%', backgroundColor: 'transparent' }}>
          <Icon type="menu" style={{ color: 'white', fontSize: '18px' }} />
          {/* <div className="logo">
            Jonbur.
          </div> */}

          <div style={{ float: "right", color: "#ececec", textAlign: "right", fontSize: '12px'}}>
            <div style={{ lineHeight:'48px', height: '32px', color: '#aeaeae' }}>
              <Icon type="sketch"/> Ropsten Testnet
            </div>
            <div style={{ lineHeight:'16px' }}>
              {account && `${account.substr(0, 6)}...${account.substr(account.length - 4, account.length)}`}
            </div>
            <div style={{ lineHeight:'16px' }}>
              {balance && `${Number(web3.utils.fromWei(balance, "ether")).toFixed(4)} ETH`}
            </div>
            {/* <div>
              {web3.utils.fromWei(balance, "ether")} ETH
            </div> */}
          </div>

        </Header>
        <Content style={{minHeight:'700px'}}>
          <LoadingContainer>
            {this.renderContent(current)}
          </LoadingContainer>
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
    account: state.accounts[0],
    balance: state.accountBalances[state.accounts[0]],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goto: value => dispatch({ type: 'GOTO', value: value }),
  };
}

export default drizzleConnect(App, mapStateToProps, mapDispatchToProps);
