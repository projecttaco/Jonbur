import React, { Component } from "react";

import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import Summary from "./Summary";
import { Card, Typography, Steps, Result, Button } from 'antd';

const { Title } = Typography;
const { Step } = Steps;

const renderTitle = current => {
    switch (current) {
        case 0:
            return 'Keep your ethereum.'
        case 1:
            return 'Select the deate.'
        case 2:
            return 'Review your transaction.'
        case 3: // Waiting for transaction to be made
            return `You're all set.`
        case 4: // When it's done
            return `You're all set.`
        default:
            return 'Keep your ethereum'
    }
}

export default class Deposit extends Component {
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

    renderSuccess = e => {
        return (
            <Result
                status="success"
                title="Successfully jonbured your ether!"
                subTitle={
                    <span>
                        <p>
                            Transaction hash: 2017182818828182881<br/>
                            Check with Etherscan
                        </p>
                        <p>
                            confirmation takes 1-5 minutes, please wait.
                        </p>
                    </span>
                }
                extra={[
                    <Button type="primary" key="console">Go Home</Button>,
                    <Button key="buy">Buy Again</Button>,
                ]}
            />
        )
    }

    render() {
        // current는 redux로 처리하게 바꾸기
        const { current } = this.state;
        return (
            <div>
                <div className="topBackground" />
                <div className="bottom">
                    <div className="card">
                        <Title level={2} style={{ font: 'Bold 3em Avenir', color: 'white' }}>{renderTitle(current)}</Title>
                        <Card style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px' }}>
                            <Steps size={'small'} direction="vertical" current={this.state.current} onChange={this.onChange}>
                                <Step title="Amount" description={current < 2 ? <AmountInput /> : null} />
                                <Step title="Date" description={current < 2 ? <DateInput /> : null} />
                                <Step title="Summary" description={current === 2 ? <Summary /> : null} />
                                <Step title="Result" description={current === 3 ? this.renderSuccess() : null} />
                            </Steps>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
