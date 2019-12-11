import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import { Card, Typography, Button, Icon, Statistic } from 'antd';
const { Title } = Typography;
const { Countdown } = Statistic;

// TODO: ETH-USD 가져오기
const usd = 5708;
class Dashboard extends Component {
    constructor(props, context) {
        super(props);
    }

    renderButton = (obj) => {
        if (obj.spent) {
            return <Button type="disabled"><Icon type="check" />Empty</Button>
        } else {
            if (new Date(obj.date) < new Date()) {
                return <Button type="primary"><Icon type="unlock" />Withdraw</Button>
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
                    <div style={{ fontSize: '10px', color: '#c2c2c2' }}>{`~${(usd * obj.amount / 100).toFixed(2)} USD`} {this.renderProfit(obj)}</div>
                </div>
            </Card>
        )
    }

    render() {
        return (
            <div>
                <div className="topBackground" />
                <div className="bottom">
                    <div className="card">
                        <Title level={2} style={{ font: 'Bold 3em Avenir', color: 'white' }}>Dashboard</Title>
                        {[...data].reverse().map((v, index) => { return this.renderCard(v) })}
                    </div>
                    <a href="#" className="float">
                        <Icon type="plus"/>
                    </a>
                </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dateChange: date => dispatch({ type: 'UPDATE_DATE', date: date }),
        timeChange: time => dispatch({ type: 'UPDATE_TIME', time: time }),
    };
}

export default drizzleConnect(Dashboard, mapStateToProps, mapDispatchToProps);