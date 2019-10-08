import React, { Component } from 'react';
import { Row, Input, Slider } from 'antd';


export default class AmountInput extends Component {
    state = {
        inputValue: 0,
        maxAmount: 100,
    };

    onAmountChange = value => {
        this.setState({ inputValue: value })
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
                <Input step={0.01} min={0} max={this.state.maxAmount} value={inputValue} onChance={this.onAmountChange} style={{ font: '2em' }} prefix="Ξ" suffix="ETH" />
                <Slider marks={marks} step={0.01} min={0} max={this.state.maxAmount} onChange={this.onAmountChange} value={typeof inputValue === 'number' ? inputValue : 0} style={{ margin: 20 }} />
            </Row>
        );
    }
}