import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Timer, Coins, ChevronDown } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { cryptocurrencies } from '../types/crypto';

const TIMEFRAMES = [
  { label: '15m', value: 15, description: '15 minutes' },
  { label: '1h', value: 60, description: '1 hour' },
  { label: '4h', value: 240, description: '4 hours' },
  { label: '1d', value: 1440, description: '1 day' }
];

const AMOUNTS = [50, 100, 200, 500];

export default function Trading() {
  const { balance, placeOrder, hasActiveTimeframeOrder } = useGame();
  const [selectedTimeframe, setSelectedTimeframe] = useState(TIMEFRAMES[0]);
  const [selectedAmount, setSelectedAmount] = useState(AMOUNTS[0]);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0]);
  const [isCryptoListOpen, setIsCryptoListOpen] = useState(false);
  const [isAmountListOpen, setIsAmountListOpen] = useState(false);

  const timeframeInUse = hasActiveTimeframeOrder(selectedTimeframe.value);

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold flex items-center">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-500" />
          Trading
        </h2>
        <div className="flex items-center text-sm bg-gray-700 px-3 py-1 rounded-lg">
          <Coins className="w-4 h-4 mr-1 text-yellow-500" />
          <span>{balance.toLocaleString()} DPS</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Select Cryptocurrency</label>
            <Timer className="w-4 h-4 text-blue-400" />
          </div>
          <button
            onClick={() => setIsCryptoListOpen(!isCryptoListOpen)}
            className="w-full p-3 bg-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-600"
          >
            <div className="flex items-center">
              <span className={`font-bold ${selectedCrypto.color} text-lg`}>
                {selectedCrypto.symbol}
              </span>
              <span className="ml-2 text-sm opacity-75">${selectedCrypto.price.toLocaleString()}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isCryptoListOpen ? 'rotate-180' : ''}`} />
          </button>
          {isCryptoListOpen && (
            <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {cryptocurrencies.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => {
                    setSelectedCrypto(crypto);
                    setIsCryptoListOpen(false);
                  }}
                  className="w-full p-3 flex items-center justify-between hover:bg-gray-600 border-b border-gray-600 last:border-0"
                >
                  <div className="flex items-center">
                    <span className={`font-bold ${crypto.color} text-lg`}>{crypto.symbol}</span>
                    <span className="ml-2 text-xs opacity-75">{crypto.name}</span>
                  </div>
                  <span className="text-sm">${crypto.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Timeframe</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TIMEFRAMES.map((timeframe) => (
              <button
                key={timeframe.value}
                onClick={() => setSelectedTimeframe(timeframe)}
                disabled={hasActiveTimeframeOrder(timeframe.value)}
                className={`p-3 rounded-lg text-center ${
                  selectedTimeframe.value === timeframe.value
                    ? 'bg-blue-600 text-white'
                    : hasActiveTimeframeOrder(timeframe.value)
                    ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="text-lg font-bold">{timeframe.label}</div>
                <div className="text-xs opacity-75">{timeframe.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-2">Select Amount</label>
          <button
            onClick={() => setIsAmountListOpen(!isAmountListOpen)}
            className="w-full p-3 bg-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-600"
          >
            <span className="font-bold text-lg">{selectedAmount} DPS</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isAmountListOpen ? 'rotate-180' : ''}`} />
          </button>
          {isAmountListOpen && (
            <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded-lg shadow-lg">
              {AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setIsAmountListOpen(false);
                  }}
                  disabled={balance < amount}
                  className={`w-full p-3 text-left border-b border-gray-600 last:border-0 ${
                    balance < amount
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-600'
                  }`}
                >
                  <span className="font-bold">{amount}</span>
                  <span className="ml-1 text-sm opacity-75">DPS</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => placeOrder('buy', selectedAmount, selectedTimeframe.value, selectedCrypto)}
            disabled={timeframeInUse || balance < selectedAmount}
            className={`flex items-center justify-center p-3 sm:p-4 ${
              timeframeInUse || balance < selectedAmount
                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            } rounded-lg font-medium transition-all duration-200`}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Buy {selectedCrypto.symbol}
          </button>
          <button
            onClick={() => placeOrder('sell', selectedAmount, selectedTimeframe.value, selectedCrypto)}
            disabled={timeframeInUse || balance < selectedAmount}
            className={`flex items-center justify-center p-3 sm:p-4 ${
              timeframeInUse || balance < selectedAmount
                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
            } rounded-lg font-medium transition-all duration-200`}
          >
            <TrendingDown className="w-5 h-5 mr-2" />
            Sell {selectedCrypto.symbol}
          </button>
        </div>

        {timeframeInUse && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 sm:p-4 text-center">
            <p className="text-yellow-400">
              You already have an active {selectedTimeframe.description} order
            </p>
            <p className="text-sm text-yellow-400/60 mt-1">
              Wait for it to complete before placing a new order with this timeframe
            </p>
          </div>
        )}
      </div>
    </div>
  );
}