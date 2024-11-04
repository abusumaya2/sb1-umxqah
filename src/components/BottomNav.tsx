import React from 'react';
import { Coins, Pickaxe, Users } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-4">
          <button 
            onClick={() => setActiveTab('earn')}
            className={`flex flex-col items-center ${activeTab === 'earn' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Coins className="w-6 h-6 mb-1" />
            <span className="text-xs">Trading</span>
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center ${activeTab === 'tasks' ? 'text-yellow-400' : 'text-gray-400'}`}
          >
            <Pickaxe className="w-6 h-6 mb-1" />
            <span className="text-xs">Mining</span>
          </button>
          <button 
            onClick={() => setActiveTab('friends')}
            className={`flex flex-col items-center ${activeTab === 'friends' ? 'text-purple-400' : 'text-gray-400'}`}
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-xs">Referrals</span>
          </button>
        </div>
      </div>
    </div>
  );
}