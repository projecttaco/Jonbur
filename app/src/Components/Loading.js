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
                <main>
                    <Result
                        status="403"
                        title="No Wallet Detected ⚠️"
                        subTitle="This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity."
                        extra={<Button type="primary">Back Home</Button>}
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