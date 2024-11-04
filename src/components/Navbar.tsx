import React from 'react';
import { useGame } from '../context/GameContext';
import { Coins } from 'lucide-react';

export default function Navbar() {
  const { balance } = useGame();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Coins className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-bold">CryptoQuest</span>
          </div>
          <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg">
            <span className="text-yellow-500 font-bold">{balance.toLocaleString()}</span>
            <span className="ml-2">tokens</span>
          </div>
        </div>
      </div>
    </nav>
  );
}