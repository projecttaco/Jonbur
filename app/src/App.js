import React, { Component } from "react";

import 'antd/dist/antd.css';
import "./App.css";

import { drizzleConnect } from 'drizzle-react';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import { Layout, Icon, Drawer } from 'antd';
import LoadingContainer from './Components/LoadingContainer';
import web3 from 'web3';
const { Header, Content, Footer } = Layout;
// const Caver = require('caver-js');
// const caver = new Caver('https://api.baobab.klaytn.net:8651/');
// drizzle.web3 = caver;
// console.log(caver);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount = () => {
    this.props.getUSD();
    this.intervalID = setInterval(() => this.props.getUSD(), 20000);
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  }

  componentDidUpdate = (prevProps) => {
    console.log(this.props);
    console.log(prevProps);
  }

  chanceContent = e => {
    this.setState({
      current: e.key
    })
  }

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

  renderContent = current => {
    const { account } = this.props;
    switch (current) {
      case '1':
        return <Home />
      case '2':
        return <Dashboard account={account} />
      default:
        return <Home />
    }
  }

  renderNetwork = networkId => {
    if (networkId === 1) {
      return 'Ethereum Mainnet'
    } else if (networkId === 3) {
      return 'Ropsten Testnet'
    } else if (networkId === 5777) {
      return 'Ganache Testnet'
    } else {
      return 'No Network Detected'
    }
  }

  renderFooter = () => {
    return <Footer style={{ marginTop: '30px', textAlign: 'center' }}>Copyright ©2019 Team Taco</Footer>
  }

  render() {
    const { current, balance, account, networkId } = this.props;
    return (
      <LoadingContainer>
        <Layout className="layout">
          <Header style={{ padding: '0 25px', position: 'fixed', width: '100%', backgroundColor: 'transparent' }}>
            <Icon type="menu" style={{ color: 'white', fontSize: '18px' }} onClick={this.showDrawer} />
            {/* <div className="logo">
              Jonbur.
            </div> */}

            <div style={{ float: "right", color: "#ececec", textAlign: "right", fontSize: '12px' }}>
              <div style={{ lineHeight: '48px', height: '32px', color: '#aeaeae' }}>
                <Icon type="sketch" /> {networkId && this.renderNetwork(networkId)}
              </div>
              <div style={{ lineHeight: '16px' }}>
                {account && `${account.substr(0, 6)}...${account.substr(account.length - 4, account.length)}`}
              </div>
              <div style={{ lineHeight: '16px' }}>
                {balance && `${Number(web3.utils.fromWei(balance, "ether")).toFixed(4)} ETH`}
              </div>
            </div>

          </Header>
          <Content style={{ minHeight: '700px' }}>
            {this.renderContent(current)}
          </Content>
          {this.renderFooter(current)}

          <Drawer
            title="Menu"
            placement={"left"}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            witdh={320}
          >
            <div className={'menuButton'} onClick={() => { this.props.goto('1'); this.onClose(); }}>Home</div>
            <div className={'menuButton'} onClick={() => { this.props.goto('2'); this.onClose(); }}>Dashboard</div>
            <div className={'menuButton'}>Blog</div>
          </Drawer>
        </Layout>
      </LoadingContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    // state: state,
    networkId: state.web3.networkId,
    current: state.menu.current,
    account: state.accounts[0],
    balance: state.accountBalances[state.accounts[0]],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goto: value => dispatch({ type: 'GOTO', value: value }),
    getUSD: () => dispatch({ type: 'GET_USD' }),
  };
}

export default drizzleConnect(App, mapStateToProps, mapDispatchToProps);
