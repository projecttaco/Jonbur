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
let privateKey =
  "FB76D45DD58A3670131413072165012795192E4509CAD4902DE27D94AA3C8127";

// Provide your SKALE endpoint address
let skale = "https://sip1.skalenodes.com:10051";

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
    }
  }
};
