import React, { Component } from "react";

import 'antd/dist/antd.css';
import "./App.css";

import options from "./drizzleOptions";
import { DrizzleProvider } from 'drizzle-react';
import { Drizzle } from 'drizzle';
import Home from './Components/Home';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

const drizzle = new Drizzle(options);

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
    switch(current) {
      case '1':
        return <Home drizzle={drizzle}/>
      case '2':
        return <Deposit drizzle={drizzle} visibleResult={false}/>
      case '3':
        return <Withdraw drizzle={drizzle}/>
      case '4':
          return <Deposit drizzle={drizzle} visibleResult={true}/>
      default:
        return <Home drizzle={drizzle}/>
    }
  }

  renderFooter = current => {
    if (current === '2' || current === '4') return <Footer style={{ textAlign: 'center' }}>Team TACO ©2019 Created by TEAM TACO</Footer>
    else return <Footer style={{ textAlign: 'center', backgroundColor: '#003368', color: 'white' }}>Team TACO ©2019 Created by TEAM TACO</Footer>
  }
  render() {
    const { current } = this.state;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" style={{ lineHeight: '64px'}}>
            Jonbur.
          </div>
          <Menu
            theme={'dark'}
            mode="horizontal"
            selectedKeys={[current]}
            style={{ lineHeight: '64px' }}
            onSelect={this.chanceContent}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Deposit</Menu.Item>
            <Menu.Item key="3">Withdraw</Menu.Item>
            <Menu.Item key="4">Deposit-Success</Menu.Item>
          </Menu>
        </Header>
        <Content style={{height:'85vh'}}>
          <DrizzleProvider options={options}>
              {this.renderContent(current)}
          </DrizzleProvider>
        </Content>
        {this.renderFooter(current)}
      </Layout>
    );
  }
}

export default App;
