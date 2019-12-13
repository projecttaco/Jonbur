import Jonbur from "./contracts/Jonbur.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      // url: "ws://127.0.0.1:8545"
      url: "https://sip1.skalenodes.com:10051"
    }
  },
  contracts: [Jonbur],
  events: {
    Jonbur: [],
  },
  polls: {
    accounts: 1500
  }
};

export default options;
