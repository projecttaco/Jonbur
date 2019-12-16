import React, { Component } from "react";
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';
import web3 from 'web3';
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import Summary from "./Summary";
import { Steps, Result, Button, message } from 'antd';
const { Step } = Steps;

class Deposit extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
    }
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
                style={{ padding: "48px 0" }}
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
                    <Button type="primary" key="console" onClick={() => this.props.gotoWithdraw()}>Withdraw</Button>,
                    <Button key="buy" onClick={() => this.props.reset()}>Jonbur Again</Button>,
                ]}
            />
        )
    }

    deposit = () => {
        const { inputValue, withdrawDate, usd } = this.props;
        // TODO: estimate gas fee
        // const gasFee = 0.002108;
        const gasFee = 0;
        const amount = web3.utils.toWei((inputValue - gasFee) + "", "ether");
        // initialize Deposit modal step to 0
        this.props.onChange(0);
        // message for creating a hodl
        message.destroy();
        message.loading('Creating a new HODL...', 0);
        // shows dummy skeleton 
        this.props.showDummy();
        this.contracts.Jonbur.methods.deposit(withdrawDate.unix(), usd, '').send({ value: amount })
            .once('transactionhash', hash => {
                console.log(hash);
                message.loading('Creating a new HODL...', 0);
            })
            .once('confirmation', (confirmationNumber, receipt) => {
                console.log(confirmationNumber, receipt);
            })
            .once('receipt', receipt => {
                console.log(receipt);
                message.destroy();
                message.success('Jonbur Successful!');
                // this.props.saveReceipt(receipt);
                this.props.hideDummy();
            })
            .once('error', error => {
                message.destroy();
                this.setState({ processing: false })
                if (error.code === 4001) { //metamask web reject transaction code
                    message.warning('Canceled Request');
                } else {
                    message.warning('Error occured');
                    console.log(error);
                }
                this.props.hideDummy();
            })

        this.props.hideModal();
    }

    render() {
        const { current } = this.props;
        return (
            <div>
                <Steps type="navigation" size="small" current={current} onChange={this.props.onChange}>
                    <Step title="Amount" />
                    <Step title="Date" />
                    <Step title="Summary" />
                </Steps>
                <div className="steps-content">{steps[current]}</div>
                <div className="steps-action" style={{ minHeight: '50px' }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" style={{ float: 'right', margin: '10px' }} onClick={() => this.props.onChange(current + 1)}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" style={{ float: 'right', margin: '10px' }} onClick={this.deposit}>
                            Confirm
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ float: 'right', margin: '10px' }} onClick={() => this.props.onChange(current - 1)}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

const steps = [<AmountInput />, <DateInput />, <Summary />]

const mapStateToProps = state => {
    return {
        state: state,
        showConfirmScreen: state.deposit.showConfirmScreen,
        current: state.deposit.current,
        receipt: state.deposit.receipt,
        inputValue: state.deposit.amount,
        withdrawDate: state.deposit.withdrawDate,
        usd: state.main.usd,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch({ type: 'RESET_DEPOSIT' }),
        onChange: (current) => dispatch({ type: 'UPDATE_STEP', value: current }),
        showModal: () => dispatch({ type: 'SHOW_MODAL' }),
        hideModal: () => dispatch({ type: 'HIDE_MODAL' }),
        showDummy: () => dispatch({ type: 'SHOW_DUMMY' }),
        hideDummy: () => dispatch({ type: 'HIDE_DUMMY' }),
    };
}

Deposit.contextTypes = {
    drizzle: PropTypes.object
}

export default drizzleConnect(Deposit, mapStateToProps, mapDispatchToProps);