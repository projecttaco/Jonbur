import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';
import web3 from 'web3';
import { Spin, Typography, Button, Icon, Modal, Empty } from 'antd';
import Deposit from './Deposit';
import JonburCard from './JonburCard';
import { formatter } from '../utils';
const { Title } = Typography;

// TODO: ETH-USD 가져오기
const usd = 5708;

class Dashboard extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.dataKey = this.contracts.Jonbur.methods.getHodlIndex.cacheCall();
        this.sumKey = this.contracts.Jonbur.methods.getSum.cacheCall();
    }

    renderInfo = (sum) => {
        sum = Number(web3.utils.fromWei(sum, 'ether'));
        sum = sum > 1000 ? sum.toFixed(2) : sum.toFixed(4);
        return (
            <div className={'center summary'}>
                <Title level={2} style={{ font: 'Bold 2.4em Avenir', color: 'white', marginBottom: '0px' }}>{sum} ETH</Title>
                <div style={{ color: '#cecece', marginBottom: '1em' }}>≈ {formatter.format(sum * usd / 100)} USD</div>
            </div>
        )
    }

    renderModalTitle = () => {
        const { current } = this.props;
        switch (current) {
            case 0:
                return 'Set the amount.'
            case 1:
                return 'Select the date.'
            case 2:
                return 'Review your transaction.'
            default:
                return 'Keep your ethereum'
        }
    }

    render() {
        const { showModal, hideModal } = this.props;
        if (!(this.dataKey in this.props.Jonbur.getHodlIndex || this.sumKey in this.props.Jonbur.getSum)) {
            return (
                <div>
                    <div className="topBackground" />
                    <div className="bottom">
                        <main className="center">
                            <Spin size={'large'} tip="Loading Accounts..." />
                        </main>
                    </div>
                </div>
            )
        }

        var indexes = this.props.Jonbur.getHodlIndex[this.dataKey];
        var sum = this.props.Jonbur.getSum[this.sumKey];
        // console.log(indexes);
        return (
            <div>
                <div className="topBackground">
                    {sum && this.renderInfo(sum.value)}
                </div>
                <div className="bottom">
                    <div className="card">
                        {indexes && [...indexes.value].reverse().map((index => { return (<JonburCard key={index} index={index} />) }))}
                        {indexes && indexes.value.length < 1 && <Empty><Button type="primary" onClick={showModal}>Create Jonbur Now</Button></Empty>}
                    </div>
                    <button onClick={showModal} className="float">
                        <Icon type="plus" />
                    </button>
                </div>
                <Modal
                    title={this.renderModalTitle()}
                    visible={this.props.modal}
                    onCancel={hideModal}
                    footer={null}
                >
                    <Deposit />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        Jonbur: state.contracts.Jonbur,
        account: state.accounts[0],
        inputValue: state.deposit.amount,
        withdrawDate: state.deposit.withdrawDate,
        current: state.deposit.current,
        modal: state.deposit.modal, 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveReceipt: (receipt) => dispatch({ type: 'SAVE_RECEIPT', value: receipt }),
        showModal: () => dispatch({ type: 'SHOW_MODAL' }),
        hideModal: () => dispatch({ type: 'HIDE_MODAL' }),
    };
}

Dashboard.contextTypes = {
    drizzle: PropTypes.object
}

export default drizzleConnect(Dashboard, mapStateToProps, mapDispatchToProps);