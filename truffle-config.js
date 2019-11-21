require("dotenv").config();
const path = require("path");

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
let skale = process.env.YOUR_SKALE_CHAIN_ENDPOINT_2;

// Provider your wallet mnemonic to use infura service
let testMnemonic =
  "explain soul power employ mixture essay hurdle swarm guitar ladder bicycle napkin";

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
    }
  }
};
