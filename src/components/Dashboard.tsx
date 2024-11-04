import React, { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { Coins } from 'lucide-react';

export default function Dashboard() {
  const { balance, orders } = useGame();

  const stats = useMemo(() => {
    const completedOrders = orders.filter(order => order.completed);
    const wins = completedOrders.filter(order => order.profit && order.profit > 0).length;
    const losses = completedOrders.filter(order => order.profit && order.profit < 0).length;
    const winRate = completedOrders.length > 0 
      ? ((wins / completedOrders.length) * 100).toFixed(2)
      : '0.00';

    return { wins, losses, winRate };
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800">
        <div className="flex items-center justify-center mb-4">
          <Coins className="w-8 h-8 text-blue-400 mr-3" />
          <h1 className="text-2xl font-bold">{balance.toLocaleString()} DPS</h1>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-green-400 text-xl">{stats.wins}</div>
            <div className="text-sm text-gray-400">Wins</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-red-400 text-xl">{stats.losses}</div>
            <div className="text-sm text-gray-400">Losses</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-blue-400 text-xl">{stats.winRate}%</div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}