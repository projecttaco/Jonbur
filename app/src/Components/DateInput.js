import React, { Component } from 'react';
import { DatePicker, TimePicker } from 'antd';
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
            <div style={{textAlign:'left'}}>
                <div style={{margin:'20px auto'}}>
                    <h3 style={{display:'inline'}}>Pick a date: </h3>
                    <DatePicker style={{float:'right'}} defaultValue={inputDate} onChange={e => this.props.dateChange(e)}/>
                </div>
                <div style={{margin:'20px auto'}}>
                    <h3 style={{display:'inline'}}>Set the time: </h3>
                    <TimePicker style={{float:'right'}} defaultValue={inputTime} onChange={e => this.props.timeChange(e)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        account: state.accounts[0],
        balance: state.accountBalances[state.accounts[0]],
        inputDate: state.deposit.date,
        inputTime: state.deposit.time,
        withdrawDate: state.deposit.withdrawDate,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dateChange: date => dispatch({type: 'UPDATE_DATE', date: date}),
        timeChange: time => dispatch({type: 'UPDATE_TIME', time: time}),
    };
}

export default drizzleConnect(DateInput, mapStateToProps, mapDispatchToProps);