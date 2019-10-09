import React, { Component } from "react";

import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import Summary from "./Summary";
import { Card, Typography, Steps, Result, Button } from 'antd';

const { Title } = Typography;
const { Step } = Steps;

const renderTitle = (current, visibleResult) => {
    if (visibleResult) {
        return `You're all set.`
    }
    switch (current) {
        case 0:
            return 'Keep your ethereum.'
        case 1:
            return 'Select the deate.'
        case 2:
            return 'Review your transaction.'
        default:
            return 'Keep your ethereum'
    }
}

export default class Deposit extends Component {
    state = {
        current: 0,
        inputValue: 0,
        maxAmount: 100,
        visibleResult: true,
        txHash: '0x5a98a6994de757ecf030af30b8ac42e01579679c56689b4e7f3be1781fd586bf',
    };

    onChange = current => {
        console.log('onChange:', current);
        this.setState({ current });
    };

    onAmountChange = value => {
        this.setState({ inputValue: value })
    }

    renderResult = e => {
        const txHash = this.state.txHash
        return (
            <Result
                status="success"
                title="Successfully jonbured your ether!"
                style={{padding: "48px 0"}}
                subTitle={
                    <span>
                        <p>
                            Transaction hash: {txHash}<br />
                            Check with <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">Etherscan.io</a>
                        </p>
                        <p>
                            Confirmation takes 1-5 minutes, please wait.
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
        const { visibleResult } = this.props;
        return (
            <div>
                <div className="topBackground" />
                <div className="bottom">
                    <div className="card">
                        <Title level={2} style={{ font: 'Bold 3em Avenir', color: 'white' }}>{renderTitle(current, visibleResult)}</Title>
                        <Card style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px' }}>
                            {visibleResult ?
                                this.renderResult() :
                                <Steps size={'small'} direction="vertical" current={this.state.current} onChange={this.onChange}>
                                    <Step title="Amount" description={current < 2 ? <AmountInput /> : null} />
                                    <Step title="Date" description={current < 2 ? <DateInput /> : null} />
                                    <Step title="Summary" description={current === 2 ? <Summary /> : null} />
                                </Steps>
                            }
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
