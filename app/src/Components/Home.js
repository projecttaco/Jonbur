import React, { Component } from "react";
import { Row, Col, Card, Button } from 'antd';


export default class Home extends Component {
    state = {
        endTime: Date.now() + 90 * 60,
        withdraw: false,
    }
    render() {
        return (
            <div style={{ backgroundColor: '#003368', height: '100%' }}>
            </div>
        );
    }
}
