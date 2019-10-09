import React, { Component } from 'react';
import { Row, Input, Slider } from 'antd'; 
import {
    AccountData,
    ContractData,
    ContractForm,
} from "@drizzle/react-components";
import { drizzleConnect } from "@drizzle/react-plugin";


class AmountInput extends Component {
    state = {
        inputValue: 0,
        maxAmount: 100,
    };

    onAmountChange = value => {
        this.setState({ inputValue: value })
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { inputValue, maxAmount } = this.state;
        var marks = {
            0: '0 ETH',
            // 100: maxAmount,
        }
        marks[maxAmount] = 'MAX';
        return (
            <Row>
                <AccountData accountIndex={0} units="ether" precision={3}/>
                <Input step={0.01} min={0} max={this.state.maxAmount} value={inputValue} onChange={this.onAmountChange} style={{ font: '2em' }} prefix="Ξ" suffix="ETH" />
                <Slider marks={marks} step={0.01} min={0} max={this.state.maxAmount} onChange={this.onAmountChange} value={typeof inputValue === 'number' ? inputValue : 0} style={{ margin: 20 }} />
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
      accounts: state.accounts,
      SimpleStorage: state.contracts.SimpleStorage,
      TutorialToken: state.contracts.TutorialToken,
      drizzleStatus: state.drizzleStatus,
    };
  };

export default drizzleConnect(AmountInput, mapStateToProps);