require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    "ropsten-infura": {
      provider: () => new HDWalletProvider(process.env.TEST_MNEMONIC, "https://ropsten.infura.io/v3/"+process.env.INFURA_KEY, 0),
      network_id: 3,
      gas: 4700000,
      gasPrice: 1000000000000,
      // from: 0xc3bB7eA7FEAc2ca8Df5d8b85a0b3bf8ACC3cd438
    },
  }
};
