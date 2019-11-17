import React, { Component } from "react";
import { Typography, Button, Statistic } from 'antd';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types'
const { Countdown } = Statistic;
const { Title } = Typography;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

class Withdraw extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.state = {
            withdraw: false,
        }
    }

    onClick = () => {
        console.log(this.contracts);
        this.contracts.Jonbur.methods.withdraw().send().then(reciept => console.log(reciept));
    }

    render() {
        const Background = "vault.png"
        return (
            <div className="withdraw">
                <Title level={2} style={{ textAlign: 'center', font: 'Bold 3em Avenir', color: 'white' }}>Time Left: </Title>
                <Countdown className="titleFont" value={deadline} format="DD:HH:MM:ss" valueStyle={{ textAlign: 'center', font: 'Bold 1em Avenir', color: 'white' }} />
                <Button disabled={this.state.withdraw} onClick={()=>this.onClick()}> Withdraw </Button>
                <img src={Background} width={600} alt={'vault'} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    };
}

Withdraw.contextTypes = {
    drizzle: PropTypes.object
}

export default drizzleConnect(Withdraw, mapStateToProps, mapDispatchToProps);