import React, { Component } from 'react';
import { Row, Col, Typography, Input, Button, Modal, Progress } from 'antd';
import web3 from 'web3';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types'

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class Summary extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;

        this.state = {
            endTime: (new Date(Date.now())).toLocaleString(),
            comment: null,
            commentLimit: false,
            visible: false,
            gasFee: 0.002108,
            // inputDate: 1,
        };
    }

    onCommentChange = ({ target: { value } }) => {
        // TODO: 140자 제한 두고, 제한 넘으면 commentLimit -> true
        this.setState({
            comment: value,
        })
    }

    onConfirm = e => {
        const { inputValue, withdrawDate } = this.props;
        // const { gasFee } = this.state;
        const gasFee = 0;
        const amount = web3.utils.toWei((inputValue - gasFee) + "", "ether");
        console.log(amount, gasFee);
        this.props.showModal();
        this.contracts.Jonbur.methods.deposit(withdrawDate.unix(), '').send({ value: amount }).then(receipt => {
            console.log(receipt);
            this.props.hideModal();
            this.props.showConfirmScreen();
            this.props.saveReceipt(receipt);
        });
    }

    render() {
        const { comment, commentLimit, gasFee } = this.state;
        const { inputValue, modal, withdrawDate } = this.props;
        const balance = inputValue * 1 - gasFee;

        return (
            <Row gutter={8} style={{ margin:'auto' }}>
                <Col>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>{inputValue.toFixed(4)} ETH</Paragraph>
                </Col>
                <Col span={6}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>- Gas Fee</Paragraph>
                </Col>
                <Col span={18}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>{gasFee} ETH</Paragraph>
                </Col>
                <Col span={24}>
                    <hr />
                </Col>
                <Col span={6}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>Deposit</Paragraph>
                </Col>
                <Col span={18}>
                    <Paragraph strong style={{ textAlign: 'right', fontSize: '0.8em' }}>{balance.toFixed(4)} ETH</Paragraph>
                </Col>
                <Col>
                    <Title strong level={1} style={{ textAlign: 'center', marginBottom: '0.1em' }}>{balance.toFixed(4)} ETH</Title>
                    <Paragraph strong style={{ textAlign: 'center' }}>will be tied up until</Paragraph>
                    <Title strong level={3} style={{ textAlign: 'center', marginTop: '0' }}>{withdrawDate.format('YYYY-MM-DD, HH:mm:ss')}</Title>
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
            </Row>
        );
    }
}
const mapStateToProps = state => {
    return {
        state: state,
        inputValue: state.deposit.amount,
        modal: state.deposit.modal,
        withdrawDate: state.deposit.withdrawDate,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showConfirmScreen: () => dispatch({ type: 'SHOW_CONFIRM_SCREEN' }),
        saveReceipt: (receipt) => dispatch({ type: 'SAVE_RECEIPT', value: receipt }),
        showModal: () => dispatch({ type: 'SHOW_MODAL' }),
        hideModal: () => dispatch({ type: 'HIDE_MODAL' }),
    };
}

Summary.contextTypes = {
    drizzle: PropTypes.object
}

export default drizzleConnect(Summary, mapStateToProps, mapDispatchToProps);