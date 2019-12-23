require("dotenv").config();
const path = require("path");

/**
 * This truffle script will deploy your smart contracts to your SKALE Chain.
 *
 * @param {string} privateKey - Provide your wallet private key.
 * @param {string} provider - Provide your SKALE endpoint address.
 */

const HDWalletProvider = require("truffle-hdwallet-provider");

// https://developers.skalelabs.com for SKALE documentation
// Provide your wallet private key
const privateKey = process.env.YOUR_PRIVATE_KEY;

// Provide your SKALE endpoint address
const skale = process.env.YOUR_SKALE_CHAIN_ENDPOINT_1;

// Provider your wallet mnemonic to use infura service
const testMnemonic =
  "explain soul power employ mixture essay hurdle swarm guitar ladder bicycle napkin";

const HDWalletProviderKlaytn = require("truffle-hdwallet-provider-klaytn");

/**
 * truffle network variables
 * for deploying contract to klaytn network.
 */
const BAOBAB_NETWORK_ID = "1001";

/**
 * URL: URL for the remote node you will be using
 * PRIVATE_KEY: Private key of the account that pays for the transaction (Change it to your own private key)
 */
const BAOBAB_URL = "https://api.baobab.klaytn.net:8651";

// Paste your `Private key` that has enough KLAY to truffle.js
const KLAYTN_PRIVATE_KEY =
  "0x3de0c90ce7e440f19eff6439390c29389f611725422b79c95f9f48c856b58277";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
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
          //  디버깅이 완료되면 추후에 수정 예정
          "https://ropsten.infura.io/v3/" + "d060c760797b4ab3bc3ed99f9e82d626"
        ),
      network_id: 3,
      gas: 4700000,
      gasPrice: 10000000000
    },
    "rinkeby-infura": {
      provider: () =>
        new HDWalletProvider(
          testMnemonic,
          //  디버깅이 완료되면 추후에 수정 예정
          "https://rinkeby.infura.io/v3/" + "d060c760797b4ab3bc3ed99f9e82d626"
        ),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    },
    baobab: {
      provider: () =>
        new HDWalletProviderKlaytn(KLAYTN_PRIVATE_KEY, BAOBAB_URL),
      network_id: BAOBAB_NETWORK_ID,
      gas: "8500000",
      gasPrice: null
    }
  }
};
