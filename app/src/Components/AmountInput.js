import React, { Component } from 'react';
import { Row, Input, Slider, Avatar } from 'antd';
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
        const { account, inputValue } = this.props;
        const balance = Number(web3.utils.fromWei(this.props.balance, "ether"));
        var marks = {
            0: '0 ETH',
            // 100: maxAmount,
        }
        marks[balance] = 'MAX';
        var sliderInput = inputValue === ''? 0:inputValue
        const gasFee = 0.01
        var max = balance - gasFee;
        return (
            <Row>
                {/* 나중에는 이 부분을 Account info로 따로 빼기 */}
                <Avatar style={{ float: 'left', margin:'0px 10px' }} size="large" icon="user"/>
                <p style={{ float: 'right', marginBottom: '0px' }}>{`${account.substr(0, 6)}...${account.substr(account.length - 4, account.length)}`}</p><br/>
                <h3 style={{ float: 'right' }}>Balance: {balance.toFixed(4)}ETH</h3>
                <Input 
                    step={0.01} 
                    min={0} 
                    max={max} 
                    value={inputValue} 
                    onChange={e => this.props.amountChange(e.target.value)} 
                    style={{ font: '2em' }} 
                    prefix="Ξ" suffix="ETH" />
                <Slider step={0.01} min={0} max={max} value={sliderInput} onChange={e => this.props.amountChange(e)} style={{ margin: 20 }} marks={marks} />
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