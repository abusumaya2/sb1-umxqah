import React from 'react';
import { Pickaxe } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function Mining() {
  const { startMining, miningTimeLeft, canClaim, claimMining } = useGame();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Pickaxe className="w-6 h-6 mr-2 text-yellow-500" />
        Mining
      </h2>

      <div className="space-y-6">
        {miningTimeLeft > 0 ? (
          <div>
            <div className="mb-4">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-1000"
                  style={{
                    width: `${((10800 - miningTimeLeft) / 10800) * 100}%`,
                  }}
                />
              </div>
            </div>
            <p className="text-center text-sm">{formatTime(miningTimeLeft)} remaining</p>
          </div>
        ) : canClaim ? (
          <button
            onClick={claimMining}
            className="w-full p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium"
          >
            Claim 200 Tokens
          </button>
        ) : (
          <button
            onClick={startMining}
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
          >
            Start Mining
          </button>
        )}

        <div className="text-center text-sm text-gray-400">
          Mining rewards: 200 tokens every 3 hours
        </div>
      </div>
    </div>
  );
}