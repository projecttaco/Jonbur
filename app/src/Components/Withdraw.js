import React, { Component } from "react";
import { Typography, Button, Statistic } from 'antd';
const { Countdown } = Statistic;
const { Title } = Typography;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

export default class Withdraw extends Component {
    state = {
        withdraw: false,
    }
    render() {
        const Background = "vault.png"
        return (
            <div className="withdraw">
                <Title level={2} style={{ textAlign: 'center', font: 'Bold 3em Avenir', color: 'white' }}>Time Left: </Title>
                <Countdown className="titleFont" value={deadline} format="DD:HH:MM:ss" valueStyle={{ textAlign: 'center', font: 'Bold 1em Avenir', color: 'white' }} />
                <Button disabled={!this.state.withdraw}> Withdraw </Button>
                <img src={Background} width={600} alt={'vault'} />
            </div>
        );
    }
}
