import React, { Component } from "react";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";

import 'antd/dist/antd.css';
import "./App.css";

import drizzleOptions from "./drizzleOptions";
import Home from './Components/Home';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

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
        return <Home/>
      case '2':
        return <Deposit visibleResult={false}/>
      case '3':
        return <Withdraw/>
      case '4':
          return <Deposit visibleResult={true}/>
      default:
        return <Home/>
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
          <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
              {this.renderContent(current)}
            </LoadingContainer>
          </DrizzleProvider>
        </Content>
        {this.renderFooter(current)}
      </Layout>
    );
  }
}

export default App;
