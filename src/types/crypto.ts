export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  color: string;
}

export const cryptocurrencies: Cryptocurrency[] = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 68659.83, color: 'text-orange-500' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', price: 3890.42, color: 'text-blue-500' },
  { id: 'bnb', symbol: 'BNB', name: 'Binance Coin', price: 567.23, color: 'text-yellow-500' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', price: 189.76, color: 'text-purple-500' },
  { id: 'ada', symbol: 'ADA', name: 'Cardano', price: 0.72, color: 'text-blue-400' },
  { id: 'xrp', symbol: 'XRP', name: 'Ripple', price: 0.74, color: 'text-gray-400' },
  { id: 'dot', symbol: 'DOT', name: 'Polkadot', price: 9.84, color: 'text-pink-500' },
  { id: 'doge', symbol: 'DOGE', name: 'Dogecoin', price: 0.156, color: 'text-yellow-400' },
  { id: 'avax', symbol: 'AVAX', name: 'Avalanche', price: 41.23, color: 'text-red-500' },
  { id: 'link', symbol: 'LINK', name: 'Chainlink', price: 18.92, color: 'text-blue-600' },
  { id: 'matic', symbol: 'MATIC', name: 'Polygon', price: 0.89, color: 'text-purple-600' },
  { id: 'uni', symbol: 'UNI', name: 'Uniswap', price: 7.45, color: 'text-pink-600' },
  { id: 'atom', symbol: 'ATOM', name: 'Cosmos', price: 8.92, color: 'text-purple-400' },
  { id: 'ltc', symbol: 'LTC', name: 'Litecoin', price: 68.34, color: 'text-gray-500' },
  { id: 'etc', symbol: 'ETC', name: 'Ethereum Classic', price: 24.56, color: 'text-green-500' },
  { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol', price: 5.67, color: 'text-black' },
  { id: 'algo', symbol: 'ALGO', name: 'Algorand', price: 0.21, color: 'text-gray-600' },
  { id: 'icp', symbol: 'ICP', name: 'Internet Computer', price: 12.34, color: 'text-indigo-500' },
  { id: 'fil', symbol: 'FIL', name: 'Filecoin', price: 6.78, color: 'text-green-400' },
  { id: 'vet', symbol: 'VET', name: 'VeChain', price: 0.034, color: 'text-blue-300' }
];