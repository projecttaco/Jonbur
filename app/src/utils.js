const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const getPrice = () => {
  const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
  return url;
}

export { formatter, getPrice };