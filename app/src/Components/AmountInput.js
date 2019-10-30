import React, { Component } from 'react';
import { Row, Input, Slider } from 'antd';
import { drizzleConnect } from "drizzle-react";
import web3 from 'web3';


class AmountInput extends Component {
    constructor(props, context) {
        super(props);
        console.log(props);

        this.state = {
            inputValue: 0,
            maxAmount: Number(web3.utils.fromWei(props.balance, "ether")),
        };
    }

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
                {/* <AccountData accountIndex={0} units="ether" precision={3}/> */}
                <p style={{float:'right'}}>{this.props.account}</p>
                <h3 style={{float:'right'}}>Balance: {this.state.maxAmount}ETH</h3>
                <Input step={0.01} min={0} max={this.state.maxAmount} value={inputValue} onChange={this.onAmountChange} style={{ font: '2em' }} prefix="Ξ" suffix="ETH" />
                <Slider marks={marks} step={0.01} min={0} max={this.state.maxAmount} onChange={this.onAmountChange} value={typeof inputValue === 'number' ? inputValue : 0} style={{ margin: 20 }} />
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        account: state.accounts[0],
        balance: state.accountBalances[state.accounts[0]],
    };
};

export default drizzleConnect(AmountInput, mapStateToProps);