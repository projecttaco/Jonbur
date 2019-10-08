import React, { Component } from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default class Summary extends Component {
    state = {
        
    };

    render() {
        return (
            <Row style={{width: '60%', minWidth: '320px', marginLeft: '2vw'}}>
                <Col>
                    <Paragraph strong style={{textAlign:'right', fontSize:'0.8em'}}>4000 ETH</Paragraph>
                </Col>
                <Col span={6}>
                    <Paragraph strong style={{textAlign:'right', fontSize:'0.8em'}}>- Gas Fee</Paragraph>
                </Col>
                <Col span={18}>
                    <Paragraph strong style={{textAlign:'right', fontSize:'0.8em'}}>2 ETH</Paragraph>
                </Col>
                <Col span={24} style={{width: '110%'}}>
                    <hr/>
                </Col>
                <Col span={6}>
                    <Paragraph strong style={{textAlign:'right', fontSize:'0.8em'}}>Deposit</Paragraph>
                </Col>
                <Col span={18}>
                    <Paragraph strong style={{textAlign:'right', fontSize:'0.8em'}}>3988 ETH</Paragraph>
                </Col>
                <Col>
                    <Title strong level={1} style={{textAlign: 'center', marginBottom: '0.1em'}}>3,998 ETH</Title>
                    <Paragraph strong style={{textAlign: 'center'}}>will be tied up until</Paragraph>
                    <Title strong level={3} style={{textAlign: 'center', marginTop: '0'}}>{(new Date(Date.now())).toLocaleString()}</Title>
                </Col>
            </Row>
        );
    }
}