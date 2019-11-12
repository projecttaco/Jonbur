const path = require("path");
require("dotenv").config();

/**
 * This truffle script will deploy your smart contracts to your SKALE Chain.
 *
 * @param {string} privateKey - Provide your wallet private key.
 * @param {string} provider - Provide your SKALE endpoint address.
 */

let HDWalletProvider = require("truffle-hdwallet-provider");

// https://developers.skalelabs.com for SKALE documentation
// Provide your wallet private key
let privateKey = process.env.YOUR_PRIVATE_KEY;

// Provide your SKALE endpoint address
let skale = process.env.YOUR_SKALE_CHAIN_ENDPOINT_1;

/**
 * This truffle script will deploy your smart contracts to ropsten
 * ethereum testnet using infura service
 *
 * @param {string} testMnemonic - Provide your wallet mnemonic.
 * @param {string} infuraKey - Provide your infura key.
 */

let testMnemonic = process.env.TEST_MNEMONIC;
let infuraKey = process.env.INFURA_KEY;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    skale: {
      provider: () => new HDWalletProvider(privateKey, skale),
      gasPrice: 0,
      network_id: "*"
    },
    "ropsten-infura": {
      provider: () =>
        new HDWalletProvider(
          testMnemonic,
          "https://ropsten.infura.io/v3/" + infuraKey,
          0
        ),
      network_id: 3,
      gas: 4700000,
      gasPrice: 1000000000000
    }
  }
};
