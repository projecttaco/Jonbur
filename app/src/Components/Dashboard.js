import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';
import web3 from 'web3';
import { Card, Typography, Button, Icon, Statistic, Modal } from 'antd';
import Deposit2 from './Deposit2';
const { Title } = Typography;
const { Countdown } = Statistic;

// TODO: ETH-USD 가져오기
const usd = 5708;
class Dashboard extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
    }

    state = {
        visible: false,
        gasFee: 0.002108,
    }

    withdraw  = () => {
        console.log(this.contracts);
        this.contracts.Jonbur.methods.withdraw().send().then(reciept => console.log(reciept));
    }

    renderButton = (obj) => {
        if (obj.spent) {
            return <Button type="disabled"><Icon type="check" />Empty</Button>
        } else {
            if (new Date(obj.date) < new Date()) {
                return <Button type="primary" onClick={this.withdraw}><Icon type="unlock"/>Withdraw</Button>
            }
            return <Button type="disabled"><Icon type="lock" />Locked</Button>
        }
    }

    renderDescription = (obj) => {
        const date = new Date(obj.date);
        if (obj.spent) {
            return `Emptied on ${date.toDateString().substr(4)}`
        } else {
            if (new Date(obj.date) < new Date()) {
                return `It's time to withdraw`
            } else if (date - Date.now() < 1000 * 60 * 60 * 24) {
                return <Countdown value={obj.date} format="HH:mm:ss left" valueStyle={{ fontSize: '10px' }} />
            }
            return `Locked until ${date.toDateString().substr(4)}`
        }
    }

    renderProfit = (obj) => {
        var color = obj.value < usd ? 'green' : 'red';
        var icon = obj.value < usd ? 'caret-up' : 'caret-down'
        // TODO: profit 계산하기
        var profit = 23600;
        return <span style={{ color: color }}> (<Icon type={icon} />{(profit / 100).toFixed(2)} USD)</span>
    }

    renderCard = (obj) => {
        const date = new Date(obj.date);
        return (
            <Card key={obj.index} style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginBottom: '10px' }}>
                <div style={{ float: 'right', textAlign: 'right' }}>
                    <div style={{ color: 'ececec', fontSize: '10px', margin: '-6px 0 6px 0' }}>{this.renderDescription(obj)}</div>
                    {this.renderButton(obj)}
                </div>
                <div style={{ margin: -8, width: '60%' }}>
                    <div style={{ color: 'ececec', fontSize: '10px', margin: '-6px 0 6px 0' }}>{date.toDateString().substr(4)}</div>
                    <div style={{ fontSize: '20px', fontWeight: '500' }}>{obj.amount.toFixed(3)} ETH</div>
                    <div style={{ fontSize: '10px', color: '#c2c2c2' }}>{`≈${(usd * obj.amount / 100).toFixed(2)} USD`} {this.renderProfit(obj)}</div>
                </div>
            </Card>
        )
    }

    renderInfo = () => {
        const sum = 284.98
        return (
            <div style={{ textAlign: 'center' }}>
                <Title level={2} style={{ font: 'Bold 2.4em Avenir', color: 'white', marginBottom: '0px' }}>{sum} ETH</Title>
                <div style={{ color: '#cecece', marginBottom: '1em' }}>≈ 20948.87 USD</div>
            </div>
        )
    }

    showModal = () => {
        console.log('hello')
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        const { inputValue, withdrawDate } = this.props;
        const { gasFee } = this.state;
        const amount = web3.utils.toWei((inputValue - gasFee) + "", "ether");
        console.log(amount, gasFee);
        this.contracts.Jonbur.methods.deposit(withdrawDate.unix(), '').send({ value: amount }).then(receipt => {
            console.log(receipt);
            this.props.saveReceipt(receipt);
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <div className="topBackground" />
                <div className="bottom">
                    <div className="card">
                        {/* <Title level={2} style={{ font: 'Bold 1.5em Avenir', color: 'white' }}>Dashboard</Title> */}
                        {this.renderInfo()}
                        {[...data].reverse().map((v, index) => { return this.renderCard(v) })}
                    </div>
                    <a href="#" onClick={this.showModal} className="float">
                        <Icon type="plus" />
                    </a>
                </div>
                <Modal
                    title="Request Withdraw"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Deposit2/>
                </Modal>
            </div>
        )
    }
}

const data = [
    {
        index: 0,
        date: Date.now() - 30000,
        comment: 'Hello',
        amount: Math.random() * 10,
        spent: true,
        value: Math.random() * 10000,
    },
    {
        index: 1,
        date: Date.now() - 20000,
        comment: 'Hello',
        amount: Math.random() * 10,
        spent: false,
        value: Math.random() * 10000,
    },
    {
        index: 2,
        date: Date.now() + 10000,
        comment: 'Hello',
        amount: Math.random() * 10,
        spent: false,
        value: Math.random() * 10000,
    },
    {
        index: 3,
        date: Date.now() + 100000,
        comment: 'Hello',
        amount: Math.random() * 10,
        spent: false,
        value: Math.random() * 10000,
    },
    {
        index: 4,
        date: Date.now() + 1000 * 60 * 60 * 24 + 5000,
        comment: 'Hello',
        amount: Math.random() * 10,
        spent: false,
        value: Math.random() * 10000,
    },
]

const mapStateToProps = state => {
    return {
        state: state,
        account: state.accounts[0],
        inputValue: state.deposit.amount,
        withdrawDate: state.deposit.withdrawDate,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveReceipt: (receipt) => dispatch({ type: 'SAVE_RECEIPT', value: receipt }),
    };
}

Dashboard.contextTypes = {
    drizzle: PropTypes.object
}

export default drizzleConnect(Dashboard, mapStateToProps, mapDispatchToProps);