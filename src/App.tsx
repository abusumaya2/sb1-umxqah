import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import Dashboard from './components/Dashboard';
import Trading from './components/Trading';
import OrderList from './components/OrderList';
import BottomNav from './components/BottomNav';
import Mining from './components/Mining';
import Referral from './components/Referral';

function App() {
  const [activeTab, setActiveTab] = useState('earn');

  return (
    <GameProvider>
      <div className="min-h-screen bg-[#0D1117] text-white flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-6 space-y-6 mb-20">
          {activeTab === 'earn' && (
            <>
              <Dashboard />
              <Trading />
              <OrderList />
            </>
          )}
          {activeTab === 'tasks' && <Mining />}
          {activeTab === 'friends' && <Referral />}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </GameProvider>
  );
}

export default App;