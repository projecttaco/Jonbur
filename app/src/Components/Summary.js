import React, { Component } from 'react';
import { Row, Col, Typography, Input, Button } from 'antd';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default class Summary extends Component {
    state = {
        endTime: (new Date(Date.now())).toLocaleString(),
        comment: null,
        commentLimit: false,
    };

    onCommentChange = ({ target: { value } }) => {
        // TODO: 140자 제한 두고, 제한 넘으면 commentLimit -> true
        this.setState({
            comment: value,
        })
    }

    render() {
        const { endTime, comment, commentLimit } = this.state;

        return (
            <Row gutter={8} style={{ width: '60%', minWidth: '320px', margin: 'auto', left: '-24px' }}>
                <Col>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>4000 ETH</Paragraph>
                </Col>
                <Col span={6}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>- Gas Fee</Paragraph>
                </Col>
                <Col span={18}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>2 ETH</Paragraph>
                </Col>
                <Col span={24} style={{ width: '110%' }}>
                    <hr />
                </Col>
                <Col span={6}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>Deposit</Paragraph>
                </Col>
                <Col span={18}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>3988 ETH</Paragraph>
                </Col>
                <Col>
                    <Title strong level={1} style={{ textAlign: 'center', marginBottom: '0.1em' }}>3,998 ETH</Title>
                    <Paragraph strong style={{ textAlign: 'center' }}>will be tied up until</Paragraph>
                    <Title strong level={3} style={{ textAlign: 'center', marginTop: '0' }}>{endTime}</Title>
                </Col>
                <Col>
                    <TextArea
                        value={comment}
                        onChange={this.onCommentChange}
                        placeholder={'Add a comment'}
                        autosize={{ minRows: 2, maxRows: 6 }}
                    />
                    {
                        commentLimit ?
                            <Typography
                                style={{ fontSize: '0.8em', color: 'red' }}>
                                Comment cannot exceed 140 characters
                                </Typography>
                            : null
                    }
                </Col>
                <Col span={12}>
                    <Button type="default" block style={{ marginTop: '1em' }}>
                        Go Back
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type="primary" block style={{ marginTop: '1em' }}>
                        Confirm
                    </Button>
                </Col>
            </Row>
        );
    }
}