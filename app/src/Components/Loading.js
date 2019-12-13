import React, { Component, Children } from 'react'
import { Spin, Result, Button } from 'antd';

class Loading extends Component {
    constructor(props, context) {
        super(props)
    }

    render() {
        if (this.props.web3.status === 'failed') {
            return (
                // Display a web3 warning.
                <main style={{marginBottom: '-30px'}}>
                    <Result
                        status="403"
                        title="No Wallet Detected ⚠️"
                        subTitle="This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity."
                        extra={
                            <div >
                                <div className={'browserButton'} style={{
                                    background: "linear-gradient(90deg, #e53935 0%,#e35d5b 100% )",
                                    color: "white",
                                }}>
                                    <img style={{ height: '24px', marginRight: '10px' }} src={require('../images/opera.png')} /> Open with Opera
                                </div>
                                <div className={'browserButton'}>
                                    <img style={{ height: '24px', marginRight: '10px' }} src={require('../images/metamask.png')} /> Open with Metamask
                                </div>
                                <Button type="primary">Back Home</Button>
                            </div>}
                    />
                </main>
            )
        }

        if (this.props.drizzleStatus.initialized) {
            // Load the dapp.
            return Children.only(this.props.children)
        }

        return (
            // Display a loading indicator.
            <main className="center">
                <Spin size={'large'} tip="Loading Accounts..." />
            </main>
        )
    }
}

export default Loading