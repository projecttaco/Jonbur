import React, { Component } from "react";

import { drizzleConnect } from "drizzle-react";
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
            return 'Select the date.'
        case 2:
            return 'Review your transaction.'
        default:
            return 'Keep your ethereum'
    }
}

class Deposit extends Component {
    onChange = current => {
        console.log('onChange:', current);
        this.setState({ current });
    };

    onAmountChange = value => {
        this.setState({ inputValue: value })
    }

    renderResult = () => {
        const txHash = this.props.receipt.transactionHash;
        return (
            <Result
                status="success"
                title="Successfully jonbured your ether!"
                style={{padding: "48px 0"}}
                subTitle={
                    <span>
                        <p>
                            Transaction hash: {txHash}<br />
                            Check with <a href={`https://ropsten.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">Etherscan.io</a>
                        </p>
                        <p>
                            Confirmation takes 1-5 minutes, please wait.
                        </p>
                    </span>
                }
                extra={[
                    <Button type="primary" key="console" onClick={() => this.props.reset()}>Withdraw</Button>,
                    <Button key="buy" onClick={() => this.props.reset()}>Jonbur Again</Button>,
                ]}
            />
        )
    }

    render() {
        const { showConfirmScreen, current } = this.props;
        return (
            <div>
                <div className="topBackground" />
                <div className="bottom">
                    <div className="card">
                        <Title level={2} style={{ font: 'Bold 3em Avenir', color: 'white' }}>{renderTitle(current, showConfirmScreen)}</Title>
                        <Card style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px' }}>
                            {showConfirmScreen ?
                                this.renderResult() :
                                <Steps size={'small'} direction="vertical" current={current} onChange={this.props.onChange}>
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

const mapStateToProps = state => {
    return {
        state: state,
        showConfirmScreen: state.deposit.showConfirmScreen,
        current: state.deposit.current,
        receipt: state.deposit.receipt,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch({type: 'RESET_DEPOSIT'}),
        onChange: (current) => dispatch({type: 'UPDATE_STEP', value: current }),
    };
}

export default drizzleConnect(Deposit, mapStateToProps, mapDispatchToProps);