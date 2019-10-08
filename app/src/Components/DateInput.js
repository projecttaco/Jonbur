import React, { Component } from 'react';
import { Row, Col, DatePicker, TimePicker } from 'antd';

export default class DateInput extends Component {
    state = {
        
    };

    render() {
        return (
            <Row justify={'space-between'}>
                <Col span={14}>
                    <DatePicker style={{ width: 280 }} />
                </Col>
                <Col span={8}>
                    <TimePicker style={{ width: 168 }} />
                </Col>
            </Row>
        );
    }
}