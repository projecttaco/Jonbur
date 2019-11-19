import React, { Component } from "react";
import { Typography, Button, Statistic, Card } from 'antd';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types'
const { Countdown } = Statistic;
const { Title } = Typography;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 4; // Moment is also OK

class Withdraw extends Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.state = {
            withdraw: false,
        }
    }

    componentDidMount = () => {
        // Get deadline
        // Set deadline in reducer
    }

    onClick = () => {
        console.log(this.contracts);
        this.contracts.Jonbur.methods.withdraw().send().then(reciept => console.log(reciept));
    }

    render() {
        // const Background = "vault.png"
        const { showConfirmScreen } = this.props;
        return (
            <div>
                <div className="topBackground" />
                <div className="bottom">
                    <div className="card">
                        <Card style={{ boxShadow: '0px 3px 6px #00000029', borderRadius: '10px' }}>
                            {showConfirmScreen ?
                                this.renderResult() :
                                <div>
                                    <Title level={2} style={{ textAlign: 'center', font: 'Bold 3em Avenir' }}>Time Left: </Title>
                                    <Countdown className="titleFont" value={deadline} format="DD:HH:mm:ss" valueStyle={{ textAlign: 'center', font: 'Bold 1em Avenir' }} />
                                    <div style={{textAlign: 'center', margin: '40px'}}>
                                        <p style={{backgroundColor:'#ececec', margin:'30px', padding:'20px', borderRadius: '10px', height: '150px', fontSize: '1.2em', fontWeight: '500'}}>
                                            존버는 승리한다 아자아자
                                        </p>
                                        <Button type="primary" disabled={this.state.withdraw} onClick={() => this.onClick()}> Withdraw </Button>
                                    </div>
                                </div>
                            }
                        </Card>
                    </div>
                </div>
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