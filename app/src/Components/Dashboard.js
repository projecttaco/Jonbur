import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';
import web3 from 'web3';
import { Card, Spin, Typography, Button, Icon, Statistic, Modal, Empty } from 'antd';
import Deposit from './Deposit';
import JonburCard from './JonburCard';
import { formatter } from '../utils';
const { Title } = Typography;
const { Countdown } = Statistic;

// TODO: ETH-USD 가져오기
const usd = 5708;

class Dashboard extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.dataKey = this.contracts.Jonbur.methods.getHodlIndex.cacheCall();
        this.sumKey = this.contracts.Jonbur.methods.getSum.cacheCall();
    }

    state = {
        visible: false,
        gasFee: 0.002108,
    }

    renderInfo = (sum) => {
        sum = Number(web3.utils.fromWei(sum, 'ether')).toFixed(4)
        return (
            <div style={{ textAlign: 'center' }}>
                <Title level={2} style={{ font: 'Bold 2.4em Avenir', color: 'white', marginBottom: '0px' }}>{sum} ETH</Title>
                <div style={{ color: '#cecece', marginBottom: '1em' }}>≈ {formatter.format(sum * usd / 100)} USD</div>
            </div>
        )
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        const { inputValue, withdrawDate } = this.props;
        const { gasFee } = this.state;
        const amount = web3.utils.toWei((inputValue - gasFee) + "", "ether");
        console.log(amount, gasFee);
        const usdeth = 14700
        this.contracts.Jonbur.methods.deposit(withdrawDate.unix(), usdeth, '').send({ value: amount }).then(receipt => {
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
        if (!(this.dataKey in this.props.Jonbur.getHodlIndex || this.sumKey in this.props.Jonbur.getSum)) {
            return (
                <div>
                    <div className="topBackground" />
                    <div className="bottom">
                        <main className="center">
                            <Spin size={'large'} tip="Loading Accounts..." />
                        </main>
                    </div>
                </div>
            )
        }

        var indexes = this.props.Jonbur.getHodlIndex[this.dataKey];
        var sum = this.props.Jonbur.getSum[this.sumKey];
        // console.log(indexes);
        return (
            <div>
                <div className="topBackground" />
                <div className="bottom">
                    <div className="card">
                        {/* <Title level={2} style={{ font: 'Bold 1.5em Avenir', color: 'white' }}>Dashboard</Title> */}
                        {sum && this.renderInfo(sum.value)}
                        {/* {[...data].reverse().map((v) => { return this.renderCard(v) })} */}
                        {indexes && [...indexes.value].reverse().map((index => { return (<JonburCard key={index} index={index} />) }))}
                        {indexes && indexes.value.length < 1 && <Empty><Button type="primary" onClick={this.showModal}>Create Jonbur Now</Button></Empty>}
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
                    <Deposit />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        Jonbur: state.contracts.Jonbur,
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