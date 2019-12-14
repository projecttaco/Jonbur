import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';
import web3 from 'web3';
import { formatter } from '../utils';
import { Card, Button, Icon, Statistic, Skeleton, message } from 'antd';
const { Countdown } = Statistic;
const usd = 14800;

class JonburCard extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.dataKey = this.contracts.Jonbur.methods.getHodl.cacheCall(parseInt(this.props.index));
    }

    withdraw  = () => {
        message.loading('Withdrawing funds...', 0);
        this.contracts.Jonbur.methods.withdraw(this.props.index).send()
        .on('transactionhash', hash => {
        })
        .on('confirmation', (confirmationNumber, receipt) => {
        })
        .on('receipt', receipt => {
            message.destroy();
            message.success('Withdrawal Successful!', 3);
            console.log(receipt)
        })
        .on('error', error => {
            message.destroy();
            message.warning('Error occured', 3);
            console.error(error);
        })
    }

    renderDescription = (obj) => {
        const { dueDate, withdrawDate, spent } = obj;
        if (spent) {
            return `Emptied on ${withdrawDate.toDateString().substr(4)}`
        } else {
            if (dueDate < new Date()) {
                return `It's time to withdraw`
            } else if (dueDate - Date.now() < 1000 * 60 * 60 * 24) {
                return <Countdown value={dueDate} format="HH:mm:ss left" valueStyle={{ fontSize: '10px' }} />
            }
            return `Locked until ${dueDate.toDateString().substr(4)}`
        }
    }

    renderButton = (obj) => {
        const { dueDate, spent } = obj;
        if (spent) {
            return <Button type="dashed" disabled><Icon type="check" />Empty</Button>
        } else {
            if (dueDate < new Date()) {
                return <Button type="primary" onClick={this.withdraw}><Icon type="unlock"/>Withdraw</Button>
            }
            return <Button type="disabled"><Icon type="lock" />Locked</Button>
        }
    }

    renderProfit = (obj) => {
        const { ethusd, depositAmount } = obj;
        var color = ethusd < usd ? 'green' : 'red';
        var icon = ethusd < usd ? 'caret-up' : 'caret-down'
        // TODO: profit 계산하기
        var profit = Math.abs(ethusd - usd) * depositAmount;
        return <span style={{ color: color }}> (<Icon type={icon} />{formatter.format(profit)})</span>
    }

    render() {
        const { index } = this.props;
        if (!(this.dataKey in this.props.Jonbur.getHodl)) {
            return (
                <Card key={index} style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginBottom: '10px' }}>
                    {/* <Spin tip="Loading..."/> */}
                    <Skeleton active paragraph={{ rows: 1 }}/>
                </Card>
            )
        }
        var data = this.props.Jonbur.getHodl[this.dataKey].value;
        const obj = {
            index: index,
            depositDate: new Date(Number(data[0])*1000),
            dueDate: new Date(Number(data[1])*1000),
            withdrawDate: new Date(Number(data[2])*1000),
            depositAmount: Number(web3.utils.fromWei(data[3], 'ether')), // in wei
            ethusd: data[4],
            spent: data[5]
        }
        return (
            <Card key={index} style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginBottom: '10px' }}>
                <div style={{ float: 'right', textAlign: 'right' }}>
                    <div style={{ color: 'ececec', fontSize: '10px', margin: '-6px 0 6px 0' }}>{this.renderDescription(obj)}</div>
                    {this.renderButton(obj)}
                </div>
                <div style={{ margin: -8, width: '60%' }}>
                    {/* <div sytle={{ color: 'ececec', fontSize: '10px', margin: '-6px 0 6px 0' }}>{`#${Number(obj.index)+1}`}</div> */}
                    <div style={{ color: 'ececec', fontSize: '10px', margin: '-6px 0 6px 0' }}>{`${obj.depositDate.toDateString().substr(4)}`}</div>
                    <div style={{ fontSize: '20px', fontWeight: '500' }}>{obj.depositAmount.toFixed(3)} ETH</div>
                    <div style={{ fontSize: '10px', color: '#c2c2c2' }}>{`≈${formatter.format(usd * obj.depositAmount / 100)} USD`} {this.renderProfit(obj)}</div>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        index: ownProps.index,
        state: state,
        Jonbur: state.contracts.Jonbur,
        account: state.accounts[0],
        ethusd: state.ethusd,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveReceipt: (receipt) => dispatch({ type: 'SAVE_RECEIPT', value: receipt }),
    };
}

JonburCard.contextTypes = {
    drizzle: PropTypes.object
}

export default drizzleConnect(JonburCard, mapStateToProps, mapDispatchToProps);