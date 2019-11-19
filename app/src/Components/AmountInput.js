import React, { Component } from 'react';
import { Row, Input, Slider } from 'antd';
import { drizzleConnect } from "drizzle-react";
import web3 from 'web3';


class AmountInput extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            inputValue: 0,
            maxAmount: Number(web3.utils.fromWei(props.balance, "ether")),
        };
    }

    componentDidMount() {
        this.props.amountChange(Number(web3.utils.fromWei(this.props.balance, "ether")));
    }

    render() {
        const { maxAmount } = this.state;
        const { inputValue } = this.props;
        var marks = {
            0: '0 ETH',
            // 100: maxAmount,
        }
        marks[maxAmount] = 'MAX';
        return (
            <Row>
                <p style={{ float: 'right' }}>{this.props.account}</p><br/>
                <h3 style={{ float: 'right' }}>Balance: {this.state.maxAmount}ETH</h3>
                <Input step={0.01} min={0} max={this.state.maxAmount} value={inputValue} onChange={e => this.props.amountChange(e.target.value)} style={{ font: '2em' }} prefix="Ξ" suffix="ETH" />
                <Slider step={0.01} min={0} max={this.state.maxAmount} value={inputValue} onChange={e => this.props.amountChange(e)} style={{ margin: 20 }} marks={marks} />
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        account: state.accounts[0],
        balance: state.accountBalances[state.accounts[0]],
        inputValue: state.deposit.amount,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        amountChange: amount => dispatch({type: 'UPDATE_AMOUNT', value: amount}),
    };
}

export default drizzleConnect(AmountInput, mapStateToProps, mapDispatchToProps);