import React, { Component } from 'react';
import { Row, Col, DatePicker, TimePicker } from 'antd';
import { drizzleConnect } from "drizzle-react";
// import moment from 'moment';


class DateInput extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            
        };
    }

    onChange(date, dateString) {
        console.log(date, dateString);
      }

    render() {
        const { inputDate, inputTime } = this.props;
        // const { year, month, day, hour, minute, second } = this.props;
        // console.log(withdrawDate);
        return (
            <Row justify={'space-between'}>
                <Col span={14}>
                    <DatePicker defaultValue={inputDate} onChange={e => this.props.dateChange(e)}/>
                </Col>
                <Col span={8}>
                    <TimePicker defaultValue={inputTime} onChange={e => this.props.timeChange(e)}/>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        account: state.accounts[0],
        balance: state.accountBalances[state.accounts[0]],
        inputDate: state.deposit.date,
        inputTime: state.deposit.time,
        // year : state.deposit.year,
        // month : state.deposit.month,
        // day : state.deposit.day,
        // hour : state.deposit.hour,
        // minute : state.deposit.minute,
        // second : state.deposit.second,
        // withdrawDate: state.deposit.withdrawDate,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dateChange: date => dispatch({type: 'UPDATE_DATE', date: date}),
        timeChange: time => dispatch({type: 'UPDATE_TIME', time: time}),
    };
}

export default drizzleConnect(DateInput, mapStateToProps, mapDispatchToProps);