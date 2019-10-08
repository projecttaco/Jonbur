import React, { Component } from "react";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";

import "./App.css";
import 'antd/dist/antd.css';

import drizzleOptions from "./drizzleOptions";
import AmountInput from "./Components/AmountInput";
import DateInput from "./Components/DateInput";
import Summary from "./Components/Summary";
import { Card, Typography, Steps } from 'antd';

const { Title } = Typography;
const { Step } = Steps;

class App extends Component {
  state = {
    current: 0,
    inputValue: 0,
    maxAmount: 100,
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  onAmountChange = value => {
    this.setState({ inputValue: value })
  }

  render() {
    const { current } = this.state;
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <div>
            <div className="topBackground"/>
            <div className="bottom">
              <div className="card">
                <Title level={2} style={{ font: 'Bold 3em Avenir', color: 'white' }}>Keep your ethereum.</Title>
                <Card style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px' }}>
                  <Steps size={'small'} direction="vertical" current={this.state.current} onChange={this.onChange}>
                    <Step title="Amount" description={current!==2?<AmountInput/>:null}/>
                    <Step title="Date" description={current!==2?<DateInput/>:null} />
                    <Step title="Summary" description={current===2?<Summary/>:null} />
                  </Steps>
                </Card>
              </div>
            </div>
          </div>
          {/* <MyContainer /> */}
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
