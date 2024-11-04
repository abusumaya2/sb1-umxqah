import React from 'react';
import { useGame } from '../context/GameContext';
import { TrendingUp, TrendingDown, Check } from 'lucide-react';

function formatTimeLeft(timestamp: number, timeframe: number) {
  const endTime = timestamp + timeframe * 60 * 1000;
  const timeLeft = Math.max(0, endTime - Date.now());
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

export default function OrderList() {
  const { orders, claimOrder } = useGame();
  const activeOrders = orders.filter(order => !order.completed);
  const completedUnclaimed = orders.filter(order => order.completed && !order.claimed);

  if (activeOrders.length === 0 && completedUnclaimed.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 text-center text-gray-400">
        <p>No active orders. Start trading to see your orders here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {completedUnclaimed.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Ready to Claim</h2>
            <div className="text-sm text-gray-400">{completedUnclaimed.length} orders</div>
          </div>

          {completedUnclaimed.map(order => (
            <div
              key={order.id}
              className="bg-gradient-to-r from-yellow-900/20 to-yellow-600/20 border-yellow-800/50 rounded-xl p-4 border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {order.type === 'buy' ? (
                    <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
                  )}
                  <span className="font-semibold">{order.crypto.symbol}/USDT</span>
                </div>
                <button
                  onClick={() => claimOrder(order.id)}
                  className="flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Claim
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Entry Price</div>
                  <div className="font-medium">
                    ${order.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Exit Price</div>
                  <div className="font-medium">
                    ${order.exitPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div
                  className={`${
                    order.profit && order.profit > 0
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  } px-3 py-1 rounded-lg`}
                >
                  {order.profit ? (order.profit > 0 ? '+' : '') + order.profit.toFixed(2) : '0'} DPS
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {activeOrders.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Active Orders</h2>
            <div className="text-sm text-gray-400">{activeOrders.length} orders</div>
          </div>

          {activeOrders.map(order => (
            <div
              key={order.id}
              className={`bg-gradient-to-r ${
                order.type === 'buy'
                  ? 'from-green-900/20 to-green-600/20 border-green-800/50'
                  : 'from-red-900/20 to-red-600/20 border-red-800/50'
              } rounded-xl p-4 border`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {order.type === 'buy' ? (
                    <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
                  )}
                  <span className="font-semibold">{order.crypto.symbol}/USDT</span>
                </div>
                <div className="text-sm text-gray-400">
                  {formatTimeLeft(order.timestamp, order.timeframe)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Entry Price</div>
                  <div className="font-medium">
                    ${order.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div
                  className={`${
                    order.type === 'buy'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  } px-3 py-1 rounded-lg`}
                >
                  {order.amount.toLocaleString()} DPS
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}