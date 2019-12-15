import axios from "axios";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const getUSD = () => {
  try {
    return axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
  } catch (err) {
    console.error(err);
  }
};

const getPrice = () => {
  // getUSD()
  //   .then(res => {
  //     let usd = res.data.USD;
  //     if (usd) {
  //       console.log(`eth_usd: ${usd}`);
  //       return usd;
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

export { formatter, getPrice };
