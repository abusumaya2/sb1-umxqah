import React from 'react';
import { Users } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function Referral() {
  const { referralCode, referralCount } = useGame();

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Users className="w-6 h-6 mr-2 text-purple-500" />
        Referral Program
      </h2>

      <div className="space-y-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm mb-2">Your Referral Code:</p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-gray-800 p-2 rounded">{referralCode}</code>
            <button
              onClick={() => navigator.clipboard.writeText(referralCode)}
              className="p-2 bg-purple-600 hover:bg-purple-700 rounded"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Referrals</span>
            <span className="text-purple-400">{referralCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Mining Bonus</span>
            <span className="text-green-400">+{referralCount * 5}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Trading Bonus</span>
            <span className="text-blue-400">+{referralCount * 2}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}