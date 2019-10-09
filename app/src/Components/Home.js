import React, { Component } from "react";
import { Row, Col, Card, Button } from 'antd';


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
        return (
            <div style={{backgroundColor: '#003368', height: '100%'}}>
                <Row gutter={16} style={{padding: '50px'}}>
                    <Col span={12} style={{backgroundColor:'white'}}>
                        <h2 style={{font: 'Bold 3em Avenir'}}>Hang in there.</h2>
                        <img style={{width:'inherit'}} src="vault.png" alt="vault"/>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Button>Login with Metamask</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
