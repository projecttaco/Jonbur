import React, { Component } from "react";
import { Typography, Button } from 'antd';

const { Title } = Typography;

export default class Home extends Component {
    state = {
        endTime: Date.now() + 90 * 60,
        withdraw: false,
    }

    renderTimeleft = endTime => {
        // TODO: 시간 포맷 정하고 그에 맞춰서 return 하기
        if (endTime < Date.now()) {
            return `Time Left: 00:00:00`
        } else {
            const result = endTime - Date.now()
            return `Time Left: ${(new Date(result)).toLocaleTimeString()}`
        }
    }
    render() {
        const Background = "vault.png"
        const endTime = this.state.endTime;
        return (
            <div>
                <div className="topBackground" />
                <div className="bottomHome">
                    <div className="card">
                        <Title level={2} style={{ textAlign: 'center', font: 'Bold 3em Avenir', color: 'white' }}>{this.renderTimeleft(endTime)}</Title>
                        <Button disabled={!this.state.withdraw}> Withdraw </Button>
                        <img src={Background} width={600} alt={'vault'}/>
                    </div>
                </div>
            </div>
        );
    }
}
